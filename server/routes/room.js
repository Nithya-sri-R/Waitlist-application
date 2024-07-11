import express from 'express';
import { getScores, joinRoom } from '../controller/roomController.js'; // Adjusted path to roomController.js
import { protectedMiddleware } from '../middleware/protected.js'; // Assuming you renamed 'protected' to 'protectedMiddleware'

const router = express.Router();

// Protected route to allow only verified users to register for the iPhone
router.post('/join', protectedMiddleware, joinRoom);

// Real-time score updating route using socket.io, accessible only to verified users
router.get('/get', protectedMiddleware, getScores);

export default router;
