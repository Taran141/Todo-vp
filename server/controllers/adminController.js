// // controllers/adminController.js

// const Task = require('../models/Task');

// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate('user', 'email _id');
//     res.json(tasks);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
