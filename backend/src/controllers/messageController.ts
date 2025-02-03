import { Request, Response } from "express";
import MessageModel, { IMessage } from "../models/message";
import validator from "validator";
import { sanitizeAuth, sanitizeString } from "../utils/sanitizeInput";

// Create a new message
export const createMessage = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const sanitizedBody = {
            userId: validator.isMongoId(req.body.userId) ? req.body.userId : null,
            actionType: sanitizeAuth(req.body.actionType),
            read: typeof req.body.read === 'boolean' ? req.body.read : false,
            approved: typeof req.body.approved === 'boolean' ? req.body.approved : false,
            dateOpen: validator.isDate(req.body.dateOpen) ? req.body.dateOpen : new Date(),
            dateClose: validator.isDate(req.body.dateClose) ? req.body.dateClose : new Date(),
        };

        const newMessage: IMessage = new MessageModel(sanitizedBody);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error("Error in createMessage:", error);
        res.status(500).json({ error: error });
    }
};

// Get all messages
export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await MessageModel.find()

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
        const sanitizedBody = {
            userId: validator.isMongoId(req.body.userId) ? req.body.userId : null,
            actionType: sanitizeAuth(req.body.actionType),
            read: typeof req.body.read === 'boolean' ? req.body.read : false,
            approved: typeof req.body.approved === 'boolean' ? req.body.approved : false,
            dateOpen: validator.isDate(req.body.dateOpen) ? req.body.dateOpen : new Date(),
            dateClose: validator.isDate(req.body.dateClose) ? req.body.dateClose : new Date(),
        };

        const updatedMessage = await MessageModel.findByIdAndUpdate(
            id.toString(),
            sanitizedBody as unknown as IMessage,
            { new: true }
        );

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Delete a message
export const deleteMessage = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const messageToDelete = await MessageModel.findByIdAndDelete(id);

        if (!messageToDelete) {
            res.status(404).json({ message: "Message not found" });
            return;
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
