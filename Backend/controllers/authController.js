const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApprovedEmail = require('../models/ApprovedEmail');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ message: 'Missing Google token' });

  try {
    // 1. Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // 2. Check if the email is approved
    const approved = await ApprovedEmail.findOne({ email });
    if (!approved) {
      return res.status(403).json({ message: 'Email not approved' });
    }

    // 3. Check or create the user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        googleId,
        role: approved.role || 'customer',
      });
      await user.save();
    }

    // 4. Issue JWT
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error("Google login failed:", err);
    res.status(500).json({ message: 'Google login failed', error: err.message });
  }
};

module.exports = { googleLogin };
