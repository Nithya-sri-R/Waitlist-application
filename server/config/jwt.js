import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

const signJswtToken = (data) => {
  let jwtSecret = process.env.JWT_SECRET;
  let token = jwt.sign(data, jwtSecret);
  return token;
};

export default signJswtToken;
