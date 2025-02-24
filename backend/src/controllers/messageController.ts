import { Request, Response } from "express";
import {
  createMessageService,
  getMessagesService,
  getMessageByIdService,
  updateMessageService,
  deleteMessageService,
} from "../services/messageService";

// Create a new message
export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const savedMessage = await createMessageService(req.body);
    res.status(201).json(savedMessage);
  } catch (error: any) {
    console.error("Error in createMessage:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all messages
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await getMessagesService();
    res.status(200).json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get message by id
export const getMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await getMessageByIdService(req.params.id);
    res.status(200).json(message);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Update a message
export const updateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedMessage = await updateMessageService(req.params.id, req.body);
    res.status(200).json(updatedMessage);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await deleteMessageService(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
