import axios from "axios";
import { IMessage } from "../types/message";

export const fetchMessages = async (): Promise<IMessage[]> => {
  const response = await axios.get("http://localhost:5000/message");
  return response.data;
};

export const deleteMessage = async (id: string): Promise<IMessage[]> => {
  const response = await axios.delete(`http://localhost:5000/message/${id}`);
  return response.data;
};

export const addMessage = async (newMessage: IMessage): Promise<IMessage> => {
  console.log(newMessage);
  
  const response = await axios.post("http://localhost:5000/message", newMessage);
  return response.data;
};

export const updateMessage = async (updatedMessage: IMessage): Promise<IMessage> => {
  console.log(updatedMessage);
  
  const response = await axios.put(
    `http://localhost:5000/message/${updatedMessage._id}`,
    updatedMessage
  );
  return response.data;
};
