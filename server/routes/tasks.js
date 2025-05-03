// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { taskValidation, validate } = require('../utils/validation');

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user
// @access  Private
router.get('/', auth, taskController.getAllTasks);

// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', auth, taskController.getTask);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, taskValidation, validate, taskController.createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, taskValidation, validate, taskController.updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;