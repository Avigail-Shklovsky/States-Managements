import { Request, Response } from "express";
import dotenv from "dotenv";
import { resetPasswordService, sendResetEmailService, signInService, signUpUser } from "../services/authService";
import { sendEmail } from "../utils/emailService";

dotenv.config();

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await signUpUser(req.body, req.file);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  
  try {
    if (req.cookies.token) {
      return res.status(200).json({ message: "User already logged in" });
    }

    const { user, token } = await signInService(userName, password);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const signOut = (req: Request, res: Response) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "User signed out successfully" });
};

export const sendResetEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const resetToken = await sendResetEmailService(email);
    if (!resetToken) {
      return res.status(200).json({ message: "If an account exists, a reset link has been sent." });
    }

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    await sendEmail(email, "Reset Password", `Reset your password here: ${resetURL}`);

    res.status(200).json({ message: "Password reset link sent." });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reset email." });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    await resetPasswordService(token, newPassword);
    res.status(200).json({ message: "Password has been reset." });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};