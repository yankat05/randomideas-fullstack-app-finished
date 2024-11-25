// that's here we're gonna use mongoose to connect to our database.

// mongoose.connect() returns a promise.
const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  // we can get the host like this 
}

mongoose.set('strictQuery', true);

module.exports = connectDB;