const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('email')
    .isEmail()
    .withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please include a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
];

const taskValidation = [
  body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Status must be one of: pending, in_progress, completed')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  taskValidation,
  validate
};