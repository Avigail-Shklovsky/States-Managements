import express from "express";
import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  getMessageById,
} from "../controllers/messageController";

const messageRoutes = express.Router();

messageRoutes.post("/", createMessage);
messageRoutes.get("/", getMessages);
messageRoutes.get("/:id", getMessageById);
messageRoutes.put("/:id", updateMessage);
messageRoutes.delete("/:id", deleteMessage);


export default messageRoutes;
