import express, { Router , Request, Response} from 'express';
import rateLimit from 'express-rate-limit';
import { signUp, signIn, signOut, sendResetEmail, resetPassword } from '../controllers/authController'
import { upload } from '../config/multerConfig';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: { error: 'Too many login attempts. Please try again later.' },
    statusCode: 429, // HTTP 429 Too Many Requests
    standardHeaders: true, // Return rate limit info in the headers
    legacyHeaders: false, // Disable X-RateLimit headers
  });

const authRoutes: Router = Router(); 
authRoutes.post('/signup', upload.single('profileImage'), signUp);
authRoutes.post('/signin',loginLimiter, signIn);
authRoutes.get('/signout',signOut)
authRoutes.post('/forgot-password', sendResetEmail);
authRoutes.post('/reset-password', resetPassword);


export default authRoutes;
