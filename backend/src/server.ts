import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import fetchStatesData from "./services/fetchStatesData";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    await fetchStatesData();
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
