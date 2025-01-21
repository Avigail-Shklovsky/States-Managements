import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB';
import fetchStatesData from './services/fetchStatesData';
import stateRoutes from './routes/stateRoute';
import { SERVER } from './config/config';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Connect to MongoDB and fetch initial data
const startServer = async () => {
  try {
    await connectDB();
    await fetchStatesData();

    // Routes
    app.use('/states', stateRoutes);

    // Start server
    const PORT = SERVER.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await mongoose.connection.close();
  process.exit(0);
});
