import express from 'express';
import { createOtp, sendEMail, verifyOtp } from '../controller/otpController.js'; // Adjusted path to otpController.js
import { userInfo } from '../controller/userController.js'; // Adjusted path to userController.js
import { protectedMiddleware } from '../middleware/protected.js'; // Adjusted path to protected.js
import roomRouter from './room.js'; // Adjusted path to room.js

const router = express.Router();
router.get('/userinfo', protectedMiddleware, userInfo);
// Routes to room file
router.use('/room', roomRouter);

// Sends the user info after verification
router.get('/get-info', protectedMiddleware, userInfo);

// Generates OTP and sends OTP via email
router.get('/get-otp', protectedMiddleware, createOtp, sendEMail);

// Verifies the user-entered OTP
router.post('/verify-otp', protectedMiddleware, verifyOtp);

export default router;
