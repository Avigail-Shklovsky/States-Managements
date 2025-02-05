import axios from "axios";
import { IUser } from "../types/user";

export const signUp = async (formData: FormData): Promise<IUser> => {
  const response = await axios.post("http://localhost:5000/auth/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const signIn = async (userName: string, password: string): Promise<IUser> => {
  const response = await axios.post("http://localhost:5000/auth/signin", {
    userName, password
  });
  return response.data;
};

export const signout = async (): Promise<void> => {
  const response = await axios.get("http://localhost:5000/auth/signout");
  return response.data;
};

export const sendResetEmail = async (data: { email: string }) => {
  const response = await axios.post('http://localhost:5000/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async ({ token, password }: { token: string; password: string }) => {
  const response = await axios.post(`http://localhost:5000/auth/reset-password`, { token, newPassword: password });
  return response.data;
};