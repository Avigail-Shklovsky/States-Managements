import { Request, Response } from "express";
import MessageModel, { IMessage } from "../models/message";
import validator from "validator";
import {
  isValidDate,
  sanitizeAuth,
  sanitizeString,
} from "../utils/sanitizeInput";
import UserModel from "../models/user";

// Create a new message
export const createMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sanitizedBody = {
      userId: validator.isMongoId(req.body.userId) ? req.body.userId : null,
      actionType: sanitizeString(req.body.actionType),
      read: typeof req.body.read === "boolean" ? req.body.read : false,
      approved:
        typeof req.body.approved === "boolean" ? req.body.approved : false,
      dateOpen: validator.isDate(req.body.dateOpen)
        ? req.body.dateOpen
        : new Date(),
      dateClose: validator.isDate(req.body.dateClose)
        ? req.body.dateClose
        : null,
    };
    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newMessage: IMessage = new MessageModel(sanitizedBody);
    const savedMessage = await newMessage.save();

    if (user.messages && Array.isArray(user.messages)) {
      user.messages.push(String(savedMessage._id));
    } else {
      user.messages = [String(savedMessage._id)]; // Initialize if undefined
    }
    await user.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error in createMessage:", error);
    res.status(500).json({ error: error });
  }
};

// Get all messages
export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const messages = await MessageModel.find();

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get message by id
export const getMessageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const message = await MessageModel.findById(id.toString());
    if (!message) {
      res.status(404).json({ message: "Message not found" });
      return;
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Update a message
export const updateMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Sanitize the incoming request body
    const sanitizedBody = {
      userId: validator.isMongoId(req.body.userId) ? req.body.userId : null,
      actionType: sanitizeString(req.body.actionType),
      read: typeof req.body.read === "boolean" ? req.body.read : false,
      approved:
        typeof req.body.approved === "boolean" ? req.body.approved : false,
      dateOpen: isValidDate(req.body.dateOpen)
        ? new Date(req.body.dateOpen)
        : new Date(),
      dateClose: isValidDate(req.body.dateClose)
        ? new Date(req.body.dateClose)
        : null,
    };

    // Find the message by ID
    const updatedMessage = await MessageModel.findByIdAndUpdate(
      id.toString(),
      sanitizedBody,
      { new: true } // Return the updated message
    );

    if (!updatedMessage) {
      res.status(404).json({ message: "Message not found" });
      return;
    }
    // Return the updated message
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Error in updateMessage:", error);
    res.status(500).json({ error: error || "Internal server error" });
  }
};

// Delete a message
export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find and delete the message
    const messageToDelete = await MessageModel.findByIdAndDelete(id);

    if (!messageToDelete) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    // Find the user associated with the message
    const user = await UserModel.findOne({ messages: id });

    if (user) {
      // Remove the message ID from the user's messages array
      user.messages = user.messages.filter(
        (messageId) => String(messageId) !== id
      );
      await user.save();
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMessage:", error);
    res.status(500).json({ error: error || "Internal server error" });
  }
};
