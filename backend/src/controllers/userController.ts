import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user";
import { sanitizeString } from "../utils/sanitizeInput";
import multer from "multer";


const upload = multer({ dest: 'uploads/' }); // Temporary file storage location

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Get user by id
export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id.toString());
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a user with image
export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Handle the multipart form-data
        const { id } = req.params;
        const profileImage = req.file ? req.file.path : req.body.profileImage;
        const sanitizedBody = {
            firstName: sanitizeString(req.body.firstName),
            lastName: sanitizeString(req.body.lastName),
            userName: sanitizeString(req.body.userName),
            email: sanitizeString(req.body.email),
            phone: sanitizeString(req.body.phone),
            password: req.body.password,
            changedDate: req.body.changedDate,
            auth: req.body.auth,
            profileImage,
            messages: req.body.messages || [], 
        };
        
        // Update the user in the database
        const updatedUser = await UserModel.findByIdAndUpdate(
            id.toString(),
            sanitizedBody as unknown as IUser,
            { new: true }
        );

        // Return the updated user
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: error || "Internal server error" });
    }
};

// update user without image
export const updateUserWithoutImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const existingUser = await UserModel.findById(id);
        if (!existingUser) {
             res.status(404).json({ error: "User not found" });
             return;
        }
        
        const sanitizedBody = {
            firstName: req.body.firstName !== undefined ? sanitizeString(req.body.firstName) : existingUser.firstName,
            lastName: req.body.lastName !== undefined ? sanitizeString(req.body.lastName) : existingUser.lastName,
            userName: req.body.userName !== undefined ? sanitizeString(req.body.userName) : existingUser.userName,
            email: req.body.email !== undefined ? sanitizeString(req.body.email) : existingUser.email,
            phone: req.body.phone !== undefined ? sanitizeString(req.body.phone) : existingUser.phone,
            password: existingUser.password, // Keep existing password
            changedDate: existingUser.changedDate, // Keep existing date
            auth: req.body.auth !== undefined ? req.body.auth : existingUser.auth, // Preserve auth
            messages: req.body.messages !== undefined ? req.body.messages : existingUser.messages, // Preserve messages
        };
        
        const updatedUser = await UserModel.findByIdAndUpdate(id, sanitizedBody, { new: true });
        

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user without image:", error);
        res.status(500).json({ error: error || "Internal server error" });
    }
};

// Delete a user
export const deleteUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const userToDelete = await UserModel.findByIdAndDelete(id);

        if (!userToDelete) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
