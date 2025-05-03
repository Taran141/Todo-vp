// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'todo_app_db',
//   password: 'Wraich@1411',
//   port: 5432, 
// });

// module.exports = pool;
// module.exports = {
//     PORT: process.env.PORT || 5000,  // default to 5000 if no PORT is set
//     // other configurations
//   };

//.kjhfgvgh
// config.js
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 5000,  // Default to 5000 if not specified
    DB_USER: 'postgres',            // Your database username
    DB_HOST: 'localhost',           // Database host
    DB_NAME: 'todo_gndec',         // Database name
    DB_PASSWORD: 'Wraich@1411',     // Database password
    DB_PORT: 5432,       
    JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: '1h',          
   // Database port (default PostgreSQL port)
  };
 

