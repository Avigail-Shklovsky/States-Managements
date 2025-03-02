import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user";
import validator from "validator";
import { sanitizeString, sanitizePassword, sanitizeAuth, } from "../utils/sanitizeInput";

// Create a new user
export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const sanitizedBody = {
            firstName: sanitizeString(req.body.firstName),
            lastName: sanitizeString(req.body.lastName),
            userName: sanitizeString(req.body.userName),
            email: sanitizeString(req.body.email),
            phone: sanitizeString(req.body.phone),
            profileImage: sanitizeString(req.body.profileImage),
            password: sanitizePassword(req.body.password),
            changedDate: validator.isDate(req.body.changedDate) ? req.body.date : null,
            auth: sanitizeAuth(req.body.auth),
        };

        const newUser: IUser = new UserModel(sanitizedBody);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error in createUser:", error);
        res.status(500).json({ error: error });
    }
};

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

// Update a user
export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const sanitizedBody = {
            firstName: sanitizeString(req.body.firstName),
            lastName: sanitizeString(req.body.lastName),
            userName: sanitizeString(req.body.userName),
            email: sanitizeString(req.body.email),
            phone: sanitizeString(req.body.phone),
            profileImage: sanitizeString(req.body.profileImage),
            password: sanitizePassword(req.body.password),
            changedDate: validator.isDate(req.body.changedDate) ? req.body.date : null,
            auth: sanitizeAuth(req.body.auth),
        };

        const updatedUser = await UserModel.findByIdAndUpdate(
            id.toString(),
            sanitizedBody as unknown as IUser,
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error });
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
