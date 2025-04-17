const Order = require('../models/Order');

const getAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ rider: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rider orders' });
  }
};

const updateOrderByRider = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, rider: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order' });
  }
};

module.exports = { getAssignedOrders, updateOrderByRider };
