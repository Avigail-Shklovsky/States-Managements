import axios from "axios";
import { Message } from "../types/message";

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await axios.get("http://localhost:5000/message");
  return response.data;
};

export const deleteMessage = async (id: string): Promise<Message[]> => {
  const response = await axios.delete(`http://localhost:5000/message/${id}`);
  return response.data;
};

export const addMessage = async (newMessage: Message): Promise<Message> => {
  const response = await axios.post("http://localhost:5000/message", newMessage);
  return response.data;
};

export const updateMessage = async (updatedMessage: Message): Promise<Message> => {
  const response = await axios.put(
    `http://localhost:5000/message/${updatedMessage._id}`,
    updatedMessage
  );
  return response.data;
};
