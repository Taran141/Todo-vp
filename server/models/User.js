const db = require('../config/db');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

class User {
  // static async create(username, email, password) {
  //   // Hash the password
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);

  //   const result = await db.pool.query(
  //     'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
  //     [username, email, hashedPassword]
  //   );

  //   return result.rows[0];
  // }
  static async create(username, email, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [username, email, hashedPassword, role];
    const result = await db.pool.query(query, values);
    return result.rows[0];
  }
  

  static async findByEmail(email) {
    const result = await db.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.pool.query(
      'SELECT id, username, email, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async validatePassword(providedPassword, storedPassword) {
    return await bcrypt.compare(providedPassword, storedPassword);
  }
}

module.exports = User;
