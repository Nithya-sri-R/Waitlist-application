// middleware/protected.js

import jwt from 'jsonwebtoken';
import User from '../model/User.js'; // Adjust path to your User model

// Middleware to protect routes that require authentication
const protectedMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const jwtSecretKey = process.env.JWT_SECRET;

      // Verify token
      const decoded = jwt.verify(token, jwtSecretKey);
      console.log('Decoded Token:', decoded);
      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Fetch user from database
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach user object to req.user for further processing
      req.user = user;
      console.log('User:', req.user);
      next();
    } else {
      return res.status(401).json({ message: 'Authorization token required' });
    }
  } catch (error) {
    console.error('Error in protectedMiddleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { protectedMiddleware };

