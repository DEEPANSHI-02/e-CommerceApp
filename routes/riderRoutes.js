const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { riderAuth } = require('../middleware/auth');

// Get rider orders
router.get('/orders', riderAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { rider: req.user._id };
    
    if (status) {
      query.status = status;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(query)
      .populate('user', 'name')
      .populate({
        path: 'items.product',
        select: 'name featuredImage'
      })
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
    console.error('Error fetching rider orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get rider statistics
router.get('/stats', riderAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ rider: req.user._id });
    const completedOrders = await Order.countDocuments({ 
      rider: req.user._id, 
      status: 'delivered' 
    });
    const pendingOrders = await Order.countDocuments({ 
      rider: req.user._id, 
      status: 'shipped' 
    });
    
    // Get daily delivery count for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const dailyDeliveries = await Order.aggregate([
      { 
        $match: { 
          rider: req.user._id,
          status: 'delivered',
          updatedAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } 
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    
    res.json({
      totalOrders,
      completedOrders,
      pendingOrders,
      dailyDeliveries
    });
  } catch (error) {
    console.error('Error fetching rider stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;