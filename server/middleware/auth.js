const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get token from either 'Authorization: Bearer <token>' or 'x-auth-token'
    let token = req.header('x-auth-token');

    if (!token) {
      const authHeader = req.header('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    // No token found
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
