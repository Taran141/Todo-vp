const Task = require('../models/Task');

// Get all tasks for a user
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAll(req.user.id);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get a single task
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.getById(req.params.id, req.user.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.update(req.params.id, req.body, req.user.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.delete(req.params.id, req.user.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    
    res.json({ message: 'Task removed', task });
  } catch (err) {
    next(err);
  }
};