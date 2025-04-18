const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const ApprovedEmail = require('../models/ApprovedEmail');
const { protect, requireRole } = require('../middleware/auth');


// Get all riders
router.get('/riders', [protect, requireRole('admin')]
, async (req, res) => {
  try {
    const riders = await User.find({ role: 'rider' }).select('-password');
    res.json(riders);
  } catch (error) {
    console.error('Error fetching riders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get rider statistics
router.get('/riders/stats', adminAuth, async (req, res) => {
  try {
    const riders = await User.find({ role: 'rider' }).select('_id name');
    
    const riderStats = await Promise.all(
      riders.map(async (rider) => {
        const totalOrders = await Order.countDocuments({ rider: rider._id });
        const completedOrders = await Order.countDocuments({ 
          rider: rider._id, 
          status: 'delivered' 
        });
        const pendingOrders = await Order.countDocuments({ 
          rider: rider._id, 
          status: 'shipped' 
        });
        
        return {
          _id: rider._id,
          name: rider.name,
          totalOrders,
          completedOrders,
          pendingOrders
        };
      })
    );
    
    res.json(riderStats);
  } catch (error) {
    console.error('Error fetching rider stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add approved email
router.post('/approved-emails', adminAuth, async (req, res) => {
  try {
    const { email, role } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Check if email already exists
    const existingEmail = await ApprovedEmail.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already approved' });
    }
    
    const approvedEmail = new ApprovedEmail({
      email,
      role: role || 'customer',
      addedBy: req.user._id
    });
    
    await approvedEmail.save();
    res.status(201).json(approvedEmail);
  } catch (error) {
    console.error('Error adding approved email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get approved emails
router.get('/approved-emails', adminAuth, async (req, res) => {
  try {
    const approvedEmails = await ApprovedEmail.find().populate('addedBy', 'name email');
    res.json(approvedEmails);
  } catch (error) {
    console.error('Error fetching approved emails:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete approved email
router.delete('/approved-emails/:id', adminAuth, async (req, res) => {
  try {
    const approvedEmail = await ApprovedEmail.findById(req.params.id);
    
    if (!approvedEmail) {
      return res.status(404).json({ message: 'Approved email not found' });
    }
    
    await approvedEmail.remove();
    res.json({ message: 'Approved email removed' });
  } catch (error) {
    console.error('Error deleting approved email:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Approved email not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sales statistics
router.get('/stats/sales', adminAuth, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    let dateFilter = {};
    const currentDate = new Date();
    
    if (period === 'day') {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      dateFilter = { createdAt: { $gte: startOfDay } };
    } else if (period === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { createdAt: { $gte: startOfWeek } };
    } else if (period === 'month') {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      dateFilter = { createdAt: { $gte: startOfMonth } };
    } else if (period === 'month') {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        dateFilter = { createdAt: { $gte: startOfMonth } };
      } else if (period === 'year') {
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        dateFilter = { createdAt: { $gte: startOfYear } };
      }
      
      // Get total orders and sales
      const totalOrders = await Order.countDocuments({ 
        ...dateFilter, 
        status: { $in: ['paid', 'shipped', 'delivered'] } 
      });
      
      const salesData = await Order.aggregate([
        { $match: { 
          ...dateFilter, 
          status: { $in: ['paid', 'shipped', 'delivered'] } 
        }},
        { $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          avgOrderValue: { $avg: '$total' }
        }}
      ]);
      
      // Get orders by status
      const ordersByStatus = await Order.aggregate([
        { $match: dateFilter },
        { $group: {
          _id: '$status',
          count: { $sum: 1 }
        }}
      ]);
      
      // Get sales by category
      const salesByCategory = await Order.aggregate([
        { $match: { 
          ...dateFilter, 
          status: { $in: ['paid', 'shipped', 'delivered'] } 
        }},
        { $unwind: '$items' },
        { $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productInfo'
        }},
        { $unwind: '$productInfo' },
        { $group: {
          _id: '$productInfo.category',
          total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }}
      ]);
      
      res.json({
        totalOrders,
        totalSales: salesData.length > 0 ? salesData[0].totalSales : 0,
        avgOrderValue: salesData.length > 0 ? salesData[0].avgOrderValue : 0,
        ordersByStatus: ordersByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        salesByCategory: salesByCategory.reduce((acc, curr) => {
          acc[curr._id] = curr.total;
          return acc;
        }, {})
      });
    } catch (error) {
      console.error('Error fetching sales stats:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;