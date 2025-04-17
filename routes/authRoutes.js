const express = require('express');
const passport = require('passport');
const router = express.Router();

const { requireRole } = require('../middleware/protectedRoutes');

const { googleLogin } = require('../controllers/authController');

// Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard', // or wherever you want
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/admin/dashboard', requireRole('admin'), (req, res) => {
  res.send('Welcome Admin');
});


router.post('/google', googleLogin); 

module.exports = router;
