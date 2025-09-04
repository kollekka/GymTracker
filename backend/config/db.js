const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, {
      autoIndex: true
    });
    console.log('[DB] Connected');
  } catch (err) {
    console.error('[DB] Connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
