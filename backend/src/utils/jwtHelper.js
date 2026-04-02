const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role, eventId: user.assignedEventId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
