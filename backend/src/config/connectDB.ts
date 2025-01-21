import { log } from "console";
import mongoose from "mongoose";
import { SERVER } from "./config";
// require('dotenv').config();
// import 'dotenv/config';

const connectDB = async (): Promise<void> => {
  const mongoUri = SERVER.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
