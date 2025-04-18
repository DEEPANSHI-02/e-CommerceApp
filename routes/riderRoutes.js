const express = require('express');
const router = express.Router();
const { getAssignedOrders, updateOrderByRider } = require('../controllers/riderController');
const { protect, isRider } = require('../middleware/auth');

router.get('/orders', protect, isRider, getAssignedOrders);           
router.patch('/orders/:id', protect, isRider, updateOrderByRider);       

module.exports = router;
