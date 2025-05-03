const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Add user from payload
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