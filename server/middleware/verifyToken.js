// middleware/verifyToken.js
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

export default verifyToken;
