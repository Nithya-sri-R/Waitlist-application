// routes/auth.js
import express from 'express';
import { login, register } from '../controller/authController.js';
// Adjusted path to authController.js


const router = express.Router();

// Route for user login
router.post('/login', login);

// Route for user signup
router.post('/register', register);



export default router;
