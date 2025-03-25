const express = require('express');
const cors = require('cors');
const path = require('path');

// Force immediate console output
const log = (msg) => {
  process.stdout.write(msg + '\n');
};

log('Starting server...');
log('Current directory: ' + __dirname);

// Configure dotenv to look in the correct location
const envPath = path.join(__dirname, '../.env');
log('Loading .env from: ' + envPath);

try {
  require('dotenv').config({ path: envPath });
  
  // Verify environment variables are loaded
  log('\nEnvironment Check:');
  log('------------------');
  log('PORT: ' + process.env.PORT);
  log('MONGO_URI exists: ' + !!process.env.MONGO_URI);
  log('JWT_SECRET exists: ' + !!process.env.JWT_SECRET);

  const connectDB = require('./config/db');
  const authRoutes = require('./routes/auth');

  const app = express();

  // Basic middleware
  app.use(cors());
  app.use(express.json());

  // Debug middleware
  app.use((req, res, next) => {
    log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Simple test route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Password Manager API' });
  });

  // Routes
  app.use('/api/auth', authRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    log('Error: ' + err.message);
    res.status(500).send('Something broke!');
  });

  // Connect to Database and Start Server
  const PORT = process.env.PORT || 3001;

  const startServer = async () => {
    try {
      log('\nAttempting to connect to MongoDB...');
      await connectDB();
      log('MongoDB connection successful');

      app.listen(PORT, () => {
        log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      log('Failed to start server: ' + error.message);
      process.exit(1);
    }
  };

  // Error Handlers
  process.on('uncaughtException', (err) => {
    log('Uncaught Exception: ' + err.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    log('Unhandled Rejection: ' + err.message);
    process.exit(1);
  });

  startServer();

} catch (error) {
  log('Startup error: ' + error.message);
  process.exit(1);
} 