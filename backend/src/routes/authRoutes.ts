import express, { Router , Request, Response} from 'express';
import { signUp, signIn, signOut, sendResetEmail, resetPassword } from '../controllers/authController'
import { upload } from '../config/multerConfig';

const authRoutes: Router = Router(); 
authRoutes.post('/signup', upload.single('profileImage'), signUp);
authRoutes.post('/signin', signIn);
authRoutes.get('/signout',signOut)
authRoutes.post('/forgot-password', sendResetEmail);
authRoutes.post('/reset-password', resetPassword);


export default authRoutes;
