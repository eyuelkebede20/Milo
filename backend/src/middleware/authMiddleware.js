const jwt = require('jsonwebtoken');

// Verify Token and attach User
exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains id, role, and agencyId
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token failed' });
  }
};

// Enforce Minimum Role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permission denied for this role' });
    }
    next();
  };
};