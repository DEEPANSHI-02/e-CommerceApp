const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, total } = req.body;

    const order = await Order.create({
      customerId: req.user._id,
      productId: items[0]._id, // assuming one item for now (or refactor for multiple)
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

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders, 
  getOrderById,
};
