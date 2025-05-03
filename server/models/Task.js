const db = require('../config/db');
const { Pool } = require('pg');

class Task {
  static async getAll(userId) {
    const result = await db.pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async getById(taskId, userId) {
    const result = await db.pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [taskId, userId]
    );
    return result.rows[0];
  }

  static async create(taskData, userId) {
    const { title, description, status = 'pending' } = taskData;
    
    const result = await db.pool.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, status, userId]
    );
    
    return result.rows[0];
  }

  static async update(taskId, taskData, userId) {
    const { title, description, status } = taskData;
    
    const result = await db.pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 AND user_id = $5 
       RETURNING *`,
      [title, description, status, taskId, userId]
    );
    
    return result.rows[0];
  }

  static async delete(taskId, userId) {
    const result = await db.pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [taskId, userId]
    );
    
    return result.rows[0];
  }
}

module.exports = Task;