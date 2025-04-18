const User = require('../models/User');
const ApprovedEmail = require('../models/ApprovedEmail');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
  const { email, name, googleId } = req.body;

  try {
    const isApproved = await ApprovedEmail.findOne({ email });
    if (!isApproved) return res.status(403).json({ message: 'Email not approved' });

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name, googleId, role: isApproved.role });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { googleLogin };
