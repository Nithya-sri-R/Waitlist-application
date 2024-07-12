// Import necessary modules
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

// Load environment variables from .env file
dotenv.config();

/**
 * Function to sign a JWT token
 * @param {Object} data - The data to be signed into the JWT token
 * @returns {String} - The signed JWT token
 */
const signJwtToken = (data) => {
  // Get the JWT secret from environment variables
  const jwtSecret = process.env.JWT_SECRET;
  // Sign the token with the provided data and secret
  const token = jwt.sign(data, jwtSecret);
  return token;
};

export default signJwtToken;
