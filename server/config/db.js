// // db.js
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'todo_app_db',
//   password: 'Wraich@1411',
//   port: 5432,
// });

// async function initializeDatabase() {
//   try {
//     await pool.query('SELECT NOW()'); // or some basic query to test connection
//     console.log('Database connected successfully');
//   } catch (err) {
//     console.error('Error initializing database:', err);
//     throw err;
//   }
// }


// module.exports = {
//   pool,
//   initializeDatabase,
// };


// lopijugetfdyuii;lkefjbhgvrhuijdowkvhsghjk
// db.js
const { Pool } = require('pg');
const config = require('./config');


const pool = new Pool({
  user: config.DB_USER, // Use values from config.js
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

async function initializeDatabase() {
  try {
    await pool.query('SELECT NOW()'); // or some basic query to test connection
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
}

module.exports = {
  pool,
  initializeDatabase,
};

