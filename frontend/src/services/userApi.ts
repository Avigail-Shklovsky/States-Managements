import axios from "axios";
import { IUser } from "../types/user";

export const updateProfile = async (userId: string, formData: FormData): Promise<IUser> => {
    const response = await axios.put(`http://localhost:5000/user/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
};


export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:5000/user/${userId}`);
    
    if (response.status === 200) {
      return;
    }
    
    throw new Error('Failed to delete user');
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; 
  }
}