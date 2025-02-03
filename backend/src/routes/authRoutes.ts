import express from 'express';
import { signUp, signIn, signOut } from '../controllers/authController'
import { upload } from '../config/multerConfig';

const authRoutes = express.Router();

authRoutes.post('/signup', upload.single('profileImage'), signUp);
authRoutes.post('/signin', signIn);
authRoutes.get('/signout',signOut)

export default authRoutes;
