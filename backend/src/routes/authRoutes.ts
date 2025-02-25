import express, { Router , Request, Response} from 'express';
import rateLimit from 'express-rate-limit';
import { signUp, signOut, sendResetEmail, resetPassword, signIn } from '../controllers/authController'
import { upload } from '../config/multerConfig';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { error: 'Too many login attempts. Please try again later.' },
    statusCode: 429,
  });

const authRoutes: Router = Router(); 
authRoutes.post('/signup', upload.single('profileImage'), signUp);
authRoutes.post('/signin',loginLimiter, signIn);
authRoutes.get('/signout',signOut)
authRoutes.post('/forgot-password', sendResetEmail);
authRoutes.post('/reset-password', resetPassword);


export default authRoutes;
