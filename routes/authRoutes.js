const express = require('express');
const router = express.Router();
const { googleLogin } = require('../controllers/authController');
const { protect, requireRole } = require('../middleware/auth');

// Token-based Google login
router.post('/google', googleLogin);

// Logout route (optional for session-based systems)
router.get('/logout', (req, res) => {
  if (req.logout) {
    req.logout(() => res.status(200).json({ message: 'Logged out' }));
  } else {
    res.status(200).json({ message: 'Logged out (no session)' });
  }
});

// Example protected route (for testing role-based access)
router.get('/admin/dashboard', protect, requireRole('admin'), (req, res) => {
  res.send('Welcome Admin');
});

module.exports = router;
