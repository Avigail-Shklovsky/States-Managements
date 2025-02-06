import express from 'express';
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController';
import { upload } from '../config/multerConfig';

const userRoutes = express.Router();


userRoutes.get('',getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put('/:id',upload.single('profileImage'), updateUser);
userRoutes.delete('/:id',deleteUser);

export default userRoutes;
