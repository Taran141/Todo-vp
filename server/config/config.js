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
    JWT_SECRET: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImV4YW1wbGVVc2VyIn0sImlhdCI6MTc0NjI2ODMyMywiZXhwIjoxNzQ2MjcxOTIzfQ.n9IdOFupobTZypW7Fg56-BQRJoBWeOyoTraMMQrJ1Bo',
    JWT_EXPIRE: '1h',          
   // Database port (default PostgreSQL port)
  };
 

