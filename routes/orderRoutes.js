const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
} = require('../controllers/orderController');

const { protect, requireRole } = require('../middleware/auth');
const { getOrderById } = require('../controllers/orderController');

// Customer route
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);

// Admin routes
router.get('/', protect, requireRole('admin'), getAllOrders);
router.patch('/:id/status', protect, requireRole('admin'), updateOrderStatus);


router.get('/:id', protect, getOrderById);

module.exports = router;
