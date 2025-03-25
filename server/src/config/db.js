const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    process.stdout.write('Connecting to MongoDB...\n');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    process.stdout.write(`MongoDB Connected: ${conn.connection.host}\n`);
    return conn;
  } catch (err) {
    process.stdout.write('MongoDB connection error: ' + err.message + '\n');
    process.exit(1);
  }
};

module.exports = connectDB; 