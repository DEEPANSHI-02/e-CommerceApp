const express = require('express');
const router = express.Router();
const { getMyProfile, getAllUsers } = require('../controllers/userController');

const { protect , requireRole } = require('../middleware/auth');


router.get('/profile', protect, getMyProfile);       
router.get('/', protect, requireRole('admin'), getAllUsers); 

module.exports = router;
