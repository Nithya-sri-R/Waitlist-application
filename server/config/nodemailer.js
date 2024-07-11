import dotenv from 'dotenv';

dotenv.config();

const emailConfig = {
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

export { emailConfig };

