import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user";
import validator from "validator";
import { sanitizeString, sanitizePassword, sanitizeAuth, } from "../utils/sanitizeInput";
import multer from "multer";
import { log } from "console";
import { Login } from "@mui/icons-material";

const upload = multer({ dest: 'uploads/' }); // Temporary file storage location

// Create a new user
// export const createUser = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const sanitizedBody = {
//             firstName: sanitizeString(req.body.firstName),
//             lastName: sanitizeString(req.body.lastName),
//             userName: sanitizeString(req.body.userName),
//             email: sanitizeString(req.body.email),
//             phone: sanitizeString(req.body.phone),
//             profileImage: sanitizeString(req.body.profileImage),
//             password: sanitizePassword(req.body.password),
//             changedDate: validator.isDate(req.body.changedDate) ? req.body.date : null,
//             auth: sanitizeAuth(req.body.auth),
//         };

//         const newUser: IUser = new UserModel(sanitizedBody);
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         console.error("Error in createUser:", error);
//         res.status(500).json({ error: error });
//     }
// };


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
// Update a user with file handling
export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Handle the multipart form-data
        const { id } = req.params;
        console.log("id: ", id);
        console.log("body: ", req.body);
        
        
        const profileImage = req.file ? req.file.path : null;
console.log("profileImage: ", profileImage);

        const sanitizedBody = {
            firstName: sanitizeString(req.body.firstName),
            lastName: sanitizeString(req.body.lastName),
            userName: sanitizeString(req.body.userName),
            email: sanitizeString(req.body.email),
            phone: sanitizeString(req.body.phone),
            password: req.body.password,
            changedDate: req.body.changedDate,
            auth: req.body.auth,
            profileImage
        };
        console.log("sanitize body",sanitizedBody);
        

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

// export const updateUser = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const sanitizedBody = {
//             firstName: sanitizeString(req.body.firstName),
//             lastName: sanitizeString(req.body.lastName),
//             userName: sanitizeString(req.body.userName),
//             email: sanitizeString(req.body.email),
//             phone: sanitizeString(req.body.phone),
//             profileImage: sanitizeString(req.body.profileImage),
//             password: sanitizePassword(req.body.password),
//             changedDate: validator.isDate(req.body.changedDate) ? req.body.date : null,
//             auth: sanitizeAuth(req.body.auth),
//         };

//         const updatedUser = await UserModel.findByIdAndUpdate(
//             id.toString(),
//             sanitizedBody as unknown as IUser,
//             { new: true }
//         );

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// };

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
