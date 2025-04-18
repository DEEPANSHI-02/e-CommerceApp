const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, address } = req.body;
    const order = await Order.create({
      user: req.user._id,
      products,
      address,
      status: 'Paid',
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error placing order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'email');
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
    if (order.status === 'Shipped' && req.body.riderId) {
      order.rider = req.body.riderId;
    }

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };
