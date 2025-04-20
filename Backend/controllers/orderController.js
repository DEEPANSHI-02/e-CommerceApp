const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, total } = req.body;

    const order = await Order.create({
      customerId: req.user._id,
      productId: items[0]._id,
      totalPrice: total,
      shippingAddress: customerInfo.address,
      status: 'pending',
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: 'Error placing order' });
  }
};

// Get orders for the currently logged-in customer
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user._id })
      .populate('productId', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Fetch user orders error:", err);
    res.status(500).json({ message: 'Error fetching your orders' });
  }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('customerId', 'email')
      .populate('productId', 'name');

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    if (order.status === 'shipped' && req.body.riderId) {
      order.riderId = req.body.riderId;
    }

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'email')
      .populate('productId', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error("Fetch order by ID error:", err);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
  getOrderById, 
};
