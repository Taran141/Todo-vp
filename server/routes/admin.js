
// Assuming you have a router like this
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const db = require('../config/db');  // Assuming you're using a database like PostgreSQL

// Route to get all tasks (this part already exists)
router.get('/tasks', auth, admin, async (req, res) => {
  try {
    console.log('Fetching admin tasks...');
    const result = await db.pool.query(`
      SELECT tasks.*, users.id AS user_id, users.email
      FROM tasks
      JOIN users ON tasks.user_id = users.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);  // add this
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});


// Route to update a task
router.put('/tasks/:taskId', auth, admin, async (req, res) => {
  const { taskId } = req.params;
  const { title, status } = req.body;  // You can adjust the fields as needed

  try {
    const result = await db.pool.query(
      'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
      [title, status, taskId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Route to delete a task
router.delete('/tasks/:taskId', auth, admin, async (req, res) => {
  const { taskId } = req.params;

  try {
    const result = await db.pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
