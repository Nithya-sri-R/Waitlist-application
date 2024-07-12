// Import necessary module
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Email configuration object for Nodemailer
 */
const emailConfig = {
  service: "gmail", // Email service to be used
  secure: true, // Use secure connection
  auth: {
    user: process.env.EMAIL, // Email address from environment variables
    pass: process.env.PASSWORD, // Email password from environment variables
  },
};

export { emailConfig };

