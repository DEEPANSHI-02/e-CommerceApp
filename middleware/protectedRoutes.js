exports.protect = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: 'Not authenticated' });
  };
  
  exports.requireRole = (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      }
      return res.status(403).json({ message: 'Access denied' });
    };
  };
  