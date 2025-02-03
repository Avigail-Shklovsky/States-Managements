import express from 'express';
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController';

const userRoutes = express.Router();


userRoutes.get('',getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id',deleteUser);

export default userRoutes;
