import express from 'express';
import { signUp, signIn, signOut } from '../controllers/authController'

const authRoutes = express.Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/signin', signIn);
authRoutes.get('/signout',signOut)

export default authRoutes;
