import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/connectDB';
import fetchDataFromAPI from './services/fetchStatesData';
import fetchStatesData from './services/fetchStatesData';

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

fetchStatesData();

// Set the server to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
