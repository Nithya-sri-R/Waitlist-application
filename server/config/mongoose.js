// Import necessary modules
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

/**
 * Function to connect to MongoDB database
 */
const db = async () => {
  try {
    // Establish connection to MongoDB using connection string from environment variables
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Log success message with MongoDB host
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    // Log error message and exit process with failure
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

export default db;
