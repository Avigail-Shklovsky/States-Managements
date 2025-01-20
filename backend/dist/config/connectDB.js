var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
// require('dotenv').config();
// import 'dotenv/config'; 
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // const mongoUri = process.env.MONGODB_URI;  
    const mongoUri = "mongodb+srv://9013825:SCH8pjjWUsRQV6ZL@cluster0.ge8bv.mongodb.net/";
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in .env");
    }
    try {
        yield mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process if connection fails
    }
});
// connectDB()
export default connectDB;
