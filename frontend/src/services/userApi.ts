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
