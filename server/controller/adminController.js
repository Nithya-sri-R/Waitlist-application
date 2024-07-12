// Importing required dependencies and User model
import User from '../model/User.js';

// Promote a user to admin
const promoteToAdmin = async (req, res) => {
  try {
    // Extract userId from request body
    const { userId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      // Return error if user not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Set isAdmin field to true
    user.isAdmin = true;
    await user.save();

    // Return success response
    return res.status(200).json({ message: 'User promoted to admin', user });
  } catch (error) {
    // Log and return server error
    console.error('Error promoting user to admin:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update users to set isAdmin field to false if not exists
const updateUsers = async (req, res) => {
  try {
    // Update users where isAdmin field doesn't exist
    const result = await User.updateMany(
      { isAdmin: { $exists: false } },
      { $set: { isAdmin: false } },
      { multi: true }
    );

    // Return the number of users updated
    res.json({ message: `Updated ${result.nModified} users.` });
  } catch (err) {
    // Log and return server error
    console.error('Error updating users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();
    // Return users
    res.json(users);
  } catch (error) {
    // Log and return server error
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    // Extract userId from request params
    const { userId } = req.params;
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      // Return error if user not found
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user
    res.json(user);
  } catch (error) {
    // Log and return server error
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    // Extract user details from request body
    const { name, email, password } = req.body;
    // Create new user instance
    const newUser = new User({ name, email, password });
    await newUser.save();
    // Return success response
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    // Log and return server error
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    // Extract userId from request params and user details from request body
    const { userId } = req.params;
    const { name, email } = req.body;
    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    if (!updatedUser) {
      // Return error if user not found
      return res.status(404).json({ message: 'User not found' });
    }
    // Return success response
    res.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    // Log and return server error
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    // Extract userId from request params
    const { userId } = req.params;
    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      // Return error if user not found
      return res.status(404).json({ message: 'User not found' });
    }
    // Return success response
    res.json({ message: 'User deleted', user: deletedUser });
  } catch (error) {
    // Log and return server error
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get customers who signed up (example)
const getCustomers = async (req, res) => {
  try {
    // Fetch users who joined the room (example criteria)
    const customers = await User.find({ joinedRoom: true });
    // Return customers
    res.json(customers);
  } catch (error) {
    // Log and return server error
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  createUser,
  deleteUser,
  getCustomers,
  getUserById,
  getUsers,
  promoteToAdmin,
  updateUser,
  updateUsers
};
