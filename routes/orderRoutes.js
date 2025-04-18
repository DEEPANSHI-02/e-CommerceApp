const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { isAdmin } = require('../middleware/auth');
const { protect , requireRole } = require('../middleware/auth');

console.log('protect:', typeof protect);
console.log('requireRole:', typeof requireRole);
console.log('requireRole("admin"):', typeof requireRole("admin"));


router.post('/', protect, createOrder);                          
router.get('/', protect, requireRole('admin'), getAllOrders);              
router.patch('/:id/status', protect, requireRole('admin'), updateOrderStatus); 

module.exports = router;
