// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { registerValidation, loginValidation, validate } = require('../utils/validation');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', registerValidation, validate, authController.register);

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', loginValidation, validate, authController.login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;

