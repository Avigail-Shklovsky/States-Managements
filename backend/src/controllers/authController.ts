import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { SERVER } from "../config/config";

dotenv.config();

// sign up
export const signUp = async (req: Request, res: Response) => {
    const { firstName, lastName, userName, email, phone, password, auth } = req.body;
    const profileImage = req.file ? req.file.path : null;

    try {
        if (!password) {
            res.status(400).json({ message: "Password is required" });
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingEmailUser = await UserModel.findOne({ email });
        if (existingEmailUser) {
            res.status(400).json({ message: 'Email already in use' })
            return;
        }

        const existingUserName = await UserModel.findOne({ userName });
        if (existingUserName) {
            res.status(400).json({ message: 'Username already in use' });
            return;
        }

        const user = new UserModel({
            firstName,
            lastName,
            userName,
            email,
            phone,
            profileImage,
            password: hashedPassword,
            changedDate: new Date(),
            auth
        });
        await user.save();
        const token = jwt.sign({ email, userId: user._id }, SERVER.JWT_SECRET!, {
            expiresIn: "1h",
        });

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(201).json({ message: 'User created successfully', user, token });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


// sign in
export const signIn = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    try {
        const token = req.cookies.token;

        // If a token exists, verify it
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET!);
                res.status(200).json({ message: "User already logged in", decoded });
                return;
            } catch (error) {
                res.status(401).json({ message: "Invalid token - ready to sign in" });
                return;
            }
        }

        // If no token, proceed with login
        const user = await UserModel.findOne({ userName });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const newToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.cookie("token", newToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.status(200).json({ message: "Login successful", token: newToken , user});
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
// sign out
export const signOut = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
