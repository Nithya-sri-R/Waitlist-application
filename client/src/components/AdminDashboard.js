import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from backend on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('signedJWT'));
        // Fetch users data from the backend API
        const response = await axios.get('http://localhost:8000/api/admin/users', {
          headers: { Authorization: 'Bearer ' + token },
          withCredentials: true
        });
        // Set the users state with the fetched data
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user by ID
  const deleteUser = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem('signedJWT'));
      // Send a DELETE request to delete the user by ID
      await axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
        headers: { Authorization: 'Bearer ' + token },
        withCredentials: true
      });
      // Update users state after deletion
      setUsers(users.filter(user => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* User List Section */}
      <div className="user-list">
        <h3>Users</h3>
        {users.length > 0 ? (
          // Map through users and display user cards with delete button
          users.map((user) => (
            <div key={user._id} className="user-card">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.isAdmin ? "Admin" : "User"}</p>
              <button onClick={() => deleteUser(user._id)}>Delete User</button>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
