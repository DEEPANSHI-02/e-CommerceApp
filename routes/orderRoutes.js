const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);                          
router.get('/', protect, isAdmin, getAllOrders);              
router.patch('/:id/status', protect, isAdmin, updateOrderStatus); 

module.exports = router;
