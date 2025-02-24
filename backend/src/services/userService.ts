import UserModel, { IUser } from "../models/user";
import { sanitizeString } from "../utils/sanitizeInput";

// Get all users
export const getUsersService = async (): Promise<IUser[]> => {
    return await UserModel.find();
};

// Get user by ID
export const getUserByIdService = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
};

// Update a user with image
export const updateUserService = async (id: string, userData: any, profileImage?: string): Promise<IUser | null> => {
    const sanitizedBody = {
        firstName: sanitizeString(userData.firstName),
        lastName: sanitizeString(userData.lastName),
        userName: sanitizeString(userData.userName),
        email: sanitizeString(userData.email),
        phone: sanitizeString(userData.phone),
        password: userData.password,
        changedDate: new Date(),
        auth: userData.auth,
        profileImage: profileImage || userData.profileImage,
        messages: userData.messages || [],
    };

    return await UserModel.findByIdAndUpdate(id, sanitizedBody, { new: true });
};

// Update a user without image
export const updateUserWithoutImageService = async (id: string, userData: any): Promise<IUser | null> => {
    const existingUser = await UserModel.findById(id);
    if (!existingUser) return null;

    const sanitizedBody = {
        firstName: userData.firstName !== undefined ? sanitizeString(userData.firstName) : existingUser.firstName,
        lastName: userData.lastName !== undefined ? sanitizeString(userData.lastName) : existingUser.lastName,
        userName: userData.userName !== undefined ? sanitizeString(userData.userName) : existingUser.userName,
        email: userData.email !== undefined ? sanitizeString(userData.email) : existingUser.email,
        phone: userData.phone !== undefined ? sanitizeString(userData.phone) : existingUser.phone,
        password: existingUser.password,
        changedDate: new Date(),
        auth: userData.auth !== undefined ? userData.auth : existingUser.auth,
        messages: userData.messages !== undefined ? userData.messages : existingUser.messages,
    };

    return await UserModel.findByIdAndUpdate(id, sanitizedBody, { new: true });
};

// Delete a user
export const deleteUserService = async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id);
};
