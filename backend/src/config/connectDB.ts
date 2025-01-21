import { log } from "console";
import mongoose from "mongoose";
// require('dotenv').config();
// import 'dotenv/config'; 


const connectDB = async (): Promise<void> => {  
    
  // const mongoUri = process.env.MONGODB_URI;  
  const mongoUri ="mongodb+srv://9013825:SCH8pjjWUsRQV6ZL@cluster0.ge8bv.mongodb.net/"
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