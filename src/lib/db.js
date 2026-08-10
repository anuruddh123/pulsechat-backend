import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI);  // Log the Mongo URI to check if it's loaded correctly

    if (!process.env.MONGO_URI) {
      throw new Error('Mongo URI is undefined. Please check your .env file.');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};
