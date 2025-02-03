import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import fetchStatesData from "./services/fetchStatesData";
import stateRoutes from "./routes/stateRoutes";
import { SERVER } from "./config/config";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import citiesRoutes from "./routes/citiesRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// Middleware for JSON parsing
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 

// Use helmet to secure Express headers
app.use(helmet());

// Add Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  })
);


const startServer = async () => {
  try {
    await connectDB();
    await fetchStatesData();

    app.use("/states", stateRoutes);
    app.use("/users",userRoutes);
    app.use("/cities",citiesRoutes);
    app.use("/auth",authRoutes);

    const PORT = SERVER.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection");
  await mongoose.connection.close();
  process.exit(0);
});
