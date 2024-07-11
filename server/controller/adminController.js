// controller/adminController.js

import User from '../model/User.js';

// Promote a user to admin
const promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.body; // Get the user ID from the request body

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = true; // Set the isAdmin field to true
    await user.save();

    return res.status(200).json({ message: 'User promoted to admin', user });
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update users to set isAdmin field
const updateUsers = async (req, res) => {
  try {
    const result = await User.updateMany(
      { isAdmin: { $exists: false } }, // Select users where isAdmin field doesn't exist
      { $set: { isAdmin: false } },    // Set isAdmin field to false
      { multi: true }
    );

    res.json({ message: `Updated ${result.nModified} users.` });
  } catch (err) {
    console.error('Error updating users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get customers who signed up (example)
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ joinedRoom: true }); // Example criteria, adjust based on your actual data model
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
    createUser, deleteUser,
    getCustomers, getUserById, getUsers, promoteToAdmin, updateUser, updateUsers
};

