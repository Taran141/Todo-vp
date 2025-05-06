// const express = require('express');
// const cors = require('cors');
// const db = require('./config/db');
// const config = require('./config/config');
// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');
// const errorHandler = require('./middleware/errorHandler');

// // Initialize app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// // Error handling middleware
// app.use(errorHandler);

// // Initialize database and start server
// const startServer = async () => {
//   try {
//     await db.initializeDatabase();
//     app.listen(config.PORT, () => {
//       console.log(`Server running on port ${config.PORT}`);
//     });
//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// };

// startServer();


// // kljhgfcghjkljbhv bhjkjhbcvghjko

// // const express = require('express');
// // const db = require('./config/db'); // adjust the path if needed

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // async function startServer() {
// //   try {
// //     await db.initializeDatabase();
// //     app.listen(PORT, () => {
// //       console.log(`Server running on http://localhost:${PORT}`);
// //     });
// //   } catch (error) {
// //     console.error('Failed to start server:', error);
// //   }
// // }

// // startServer();



// lkjhgcfxdcghjkjohigufyhjkljhgfhjkljhgfdghjkljhgfhjkjhgjdfstiu78o6trdfhyi87yugfhyui7oyutghf



const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const config = require('./config/config');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const adminRoutes = require('./routes/admin');



// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    await db.initializeDatabase(); // Ensure DB connection is successful before starting server
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // Exit the process if unable to start the server
  }
};

startServer();
