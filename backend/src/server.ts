import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import fetchStatesData from "./services/fetchStatesData";
import stateRoutes from "./routes/stateRoutes";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import citiesRoutes from "./routes/citiesRoutes";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend port
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser()); 

//  xss protection
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "http://localhost:5000"],
    },
  })
);


const startServer = async () => {
  try {
    await connectDB();
    await fetchStatesData();

    app.use("/states", stateRoutes);
    app.use("/user",userRoutes);
    app.use("/cities",citiesRoutes);
    app.use("/auth",authRoutes);
    app.use("/message",messageRoutes);
    app.use("/uploads", express.static("uploads", {
      setHeaders: (res) => {
        res.set("Cross-Origin-Resource-Policy", "cross-origin");
      },
    }));
    

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection");
  await mongoose.connection.close();
  process.exit(0);
});
