const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

// Register user
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role = 'user' } = req.body;

    // Check if user already exists
    let user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    user = await User.create(username, email, password, role);

    // Create token payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Generate token
    jwt.sign(
      payload, // Payload should be the second argument
      config.JWT_SECRET, // The secret key from config
      { expiresIn: config.JWT_EXPIRE }, // Options such as expiration time
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    next(err);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Generate token
    jwt.sign(
      payload, // Payload should be the second argument
      config.JWT_SECRET, // The secret key from config
      { expiresIn: config.JWT_EXPIRE }, // Options such as expiration time
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    next(err);
  }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
