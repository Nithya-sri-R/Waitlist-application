// routes/admin.js

import express from 'express';
import {
    createUser,
    deleteUser,
    getCustomers // Import getCustomers function
    ,
    getUserById,
    getUsers,
    promoteToAdmin,
    updateUser,
    updateUsers
} from '../controller/adminController.js';
import { protectedMiddleware } from '../middleware/protected.js'; // Assuming this middleware is for authentication

const router = express.Router();

// Route to promote user to admin
router.put('/promote', protectedMiddleware, promoteToAdmin);

// Route to update users to set isAdmin field
router.put('/update-users', protectedMiddleware, updateUsers);

// Route to get all users
router.get('/users', protectedMiddleware, getUsers);

// Route to get a user by ID
router.get('/users/:userId', protectedMiddleware, getUserById);

// Route to create a user
router.post('/users', protectedMiddleware, createUser);

// Route to update a user by ID
router.put('/users/:userId', protectedMiddleware, updateUser);

// Route to delete a user by ID
router.delete('/users/:userId', protectedMiddleware, deleteUser);

// Route to get customers who signed up
router.get('/customers', protectedMiddleware, getCustomers);

export default router;
