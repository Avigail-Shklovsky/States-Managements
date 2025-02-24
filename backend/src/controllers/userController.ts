import { Request, Response } from "express";
import multer from "multer";
import {
    getUsersService,
    getUserByIdService,
    updateUserService,
    updateUserWithoutImageService,
    deleteUserService
} from "../services/userService";

const upload = multer({ dest: 'uploads/' });

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Update a user with image
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const profileImage = req.file ? req.file.path : req.body.profileImage;
        const updatedUser = await updateUserService(req.params.id, req.body, profileImage);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Update a user without image
export const updateUserWithoutImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await updateUserWithoutImageService(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userToDelete = await deleteUserService(req.params.id);
        if (!userToDelete) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
};
