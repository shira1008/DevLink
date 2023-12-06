const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('mongoDB connected');
  } catch (err) {
    console.log(err.message);

    // Exit procces
    process.exit(1);
  }
};

module.exports = connectDB;
