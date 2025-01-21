"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// import connectDB from './config/connectDB';
// import fetchStatesData from './services/fetchStatesData';
// Load environment variables from .env file
dotenv_1.default.config();
// Create an instance of an Express application
const app = (0, express_1.default)();
// Middleware for parsing JSON request bodies
app.use(body_parser_1.default.json());
// Connect to MongoDB
// connectDB();
// fetchStatesData();
// Set the server to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
