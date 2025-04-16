const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminAuth, riderAuth } = require('../middleware/auth');

// Get all orders (for authenticated user)
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    // Regular users can only see their own orders
    if (req.user.role === 'customer') {
      query.user = req.user._id;
    }
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate({
        path: 'items.product',
        select: 'name featuredImage'
      })
      .populate('rider', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const totalOrders = await Order.countDocuments(query);
    
    res.json({
      orders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalOrders / parseInt(limit)),
      totalOrders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate({
        path: 'items.product',
        select: 'name featuredImage'
      })
      .populate('rider', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the user is authorized to view this order
    if (
      req.user.role === 'customer' && 
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod
    } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    
    // Validate and calculate prices
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product}` });
      }
      
      // Find the specific variant
      const variant = product.variants.find(
        v => v.size === item.size && v.color === item.color
      );
      
      if (!variant) {
        return res.status(400).json({ message: `Variant not found for product: ${product.name}` });
      }
      
      if (variant.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      
      const itemPrice = variant.price * item.quantity;
      subtotal += itemPrice;
      
      orderItems.push({
        product: item.product,
        size: item.size,
        color: item.color,
        price: variant.price,
        quantity: item.quantity
      });
      
      // Update stock
      variant.stock -= item.quantity;
    }
    
    // Calculate tax and shipping
    const tax = subtotal * 0.10; // 10% tax
    const shippingCost = subtotal > 1000 ? 0 : 100; // Free shipping over $1000
    const total = subtotal + tax + shippingCost;
    
    // Create the order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      tax,
      shippingCost,
      total,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    await order.save();
    
    // Update product inventory
    for (const item of items) {
      const product = await Product.findById(item.product);
      await product.save();
    }
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (Admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, riderId } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Validate status change
    const validStatusTransitions = {
      pending: ['paid', 'cancelled'],
      paid: ['shipped', 'cancelled'],
      shipped: ['delivered', 'cancelled'],
      delivered: [],
      cancelled: []
    };
    
    if (!validStatusTransitions[order.status].includes(status)) {
      return res.status(400).json({ 
        message: `Invalid status transition from ${order.status} to ${status}` 
      });
    }
    
    order.status = status;
    
    // Assign rider if status is changed to shipped
    if (status === 'shipped' && riderId) {
      order.rider = riderId;
    }
    
    // Update timestamp
    order.updatedAt = Date.now();
    
    await order.save();
    
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order delivery status (Rider only)
router.patch('/:id/delivery', riderAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Only assigned rider can update delivery status
    if (
      req.user.role === 'rider' && 
      (!order.rider || order.rider.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }
    
    // Only allow transition from shipped to delivered
    if (order.status !== 'shipped' || status !== 'delivered') {
      return res.status(400).json({ message: 'Invalid status transition' });
    }
    
    order.status = status;
    order.updatedAt = Date.now();
    
    await order.save();
    
    res.json(order);
  } catch (error) {
    console.error('Error updating delivery status:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;