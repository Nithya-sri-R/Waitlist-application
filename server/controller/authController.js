import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js'; // Ensure the path to User model is correct

// Function to sign JWT token
const signJwtToken = (user) => {
  const payload = { id: user._id, email: user.email };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Ensure JWT_SECRET is set in .env
  const options = { expiresIn: '365d' };

  return jwt.sign(payload, secret, options);
};

// Registration function
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please login.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({ name, email, password: hashedPassword });
    console.log('User created');
    return res.status(201).json({ user: createdUser });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login function
const login = async (req, res) => {
  console.log('Login function hit');
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found. Please register.' });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Generate JWT token
    const token = signJwtToken(existingUser); // Pass the existing user directly
    return res.status(200).json({ message: 'Logged in successfully', token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { login, register };

