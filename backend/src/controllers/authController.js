const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Payload dictates access level across the app
  const payload = {
    id: user._id,
    role: user.role,
    agencyId: user.agencyId // Null for SuperAdmin
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

  res.json({ token, role: user.role });
};