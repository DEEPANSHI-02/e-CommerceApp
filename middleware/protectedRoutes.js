exports.requireRole = (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      }
      return res.status(403).json({ message: 'Access denied' });
    };
  };
  