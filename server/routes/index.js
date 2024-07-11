import express from 'express';
import { sendEMail } from '../controller/otpController.js';
import { protectedMiddleware } from '../middleware/protected.js';
import authRouter from './auth.js'; // Import authRouter directly
import userRouter from './user.js'; // Import userRouter directly

const router = express.Router();

// Testing API running status
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API running' });
});

// Example of a protected route
router.get('/home', protectedMiddleware, (req, res) => {
  return res.status(200).json({ message: 'You are an authenticated user' });
});

// Handling user authentication (login and signup)
router.use('/auth', authRouter);

// Handling user details
router.use('/user', userRouter);

// Example route using sendEMail controller function
router.post('/send-email',sendEMail);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
