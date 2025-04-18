const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: "Access denied" });
  };
};

exports.isRider = (req, res, next) => {
  if (req.user && req.user.role === 'rider') {
    return next();
  }
  return res.status(403).json({ message: "Access denied: rider only" });
};
