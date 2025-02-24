import MessageModel, { IMessage } from "../models/message";
import UserModel from "../models/user";
import validator from "validator";
import { isValidDate, sanitizeString } from "../utils/sanitizeInput";

// Create a new message
export const createMessageService = async (data: any) => {
  const sanitizedBody = {
    userId: validator.isMongoId(data.userId) ? data.userId : null,
    actionType: sanitizeString(data.actionType),
    read: typeof data.read === "boolean" ? data.read : false,
    approved: typeof data.approved === "boolean" ? data.approved : false,
    dateOpen: validator.isDate(data.dateOpen) ? data.dateOpen : new Date(),
    dateClose: validator.isDate(data.dateClose) ? data.dateClose : null,
  };

  const user = await UserModel.findById(data.userId);
  if (!user) throw new Error("User not found");

  const newMessage: IMessage = new MessageModel(sanitizedBody);
  const savedMessage = await newMessage.save();

  if (user.messages && Array.isArray(user.messages)) {
    user.messages.push(String(savedMessage._id));
  } else {
    user.messages = [String(savedMessage._id)];
  }
  await user.save();

  return savedMessage;
};

// Get all messages
export const getMessagesService = async () => {
  return await MessageModel.find();
};

// Get message by id
export const getMessageByIdService = async (id: string) => {
  const message = await MessageModel.findById(id);
  if (!message) throw new Error("Message not found");
  return message;
};

// Update a message
export const updateMessageService = async (id: string, data: any) => {
  const sanitizedBody = {
    userId: validator.isMongoId(data.userId) ? data.userId : null,
    actionType: sanitizeString(data.actionType),
    read: typeof data.read === "boolean" ? data.read : false,
    approved: typeof data.approved === "boolean" ? data.approved : false,
    dateOpen: isValidDate(data.dateOpen) ? new Date(data.dateOpen) : new Date(),
    dateClose: isValidDate(data.dateClose) ? new Date(data.dateClose) : null,
  };

  const updatedMessage = await MessageModel.findByIdAndUpdate(id, sanitizedBody, {
    new: true,
  });

  if (!updatedMessage) throw new Error("Message not found");

  return updatedMessage;
};

// Delete a message
export const deleteMessageService = async (id: string) => {
  const messageToDelete = await MessageModel.findByIdAndDelete(id);
  if (!messageToDelete) throw new Error("Message not found");

  const user = await UserModel.findOne({ messages: id });
  if (user) {
    user.messages = user.messages.filter((messageId) => String(messageId) !== id);
    await user.save();
  }

  return { message: "Message deleted successfully" };
};
