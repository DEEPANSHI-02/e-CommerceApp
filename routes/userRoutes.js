const express = require('express');
const router = express.Router();
const { getMyProfile, getAllUsers } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/me', protect, getMyProfile);       // GET /api/users/me
router.get('/', protect, isAdmin, getAllUsers); // GET /api/users

module.exports = router;
