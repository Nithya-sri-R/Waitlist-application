import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('signedJWT'));
        const response = await axios.get('http://localhost:8000/api/admin/users', {
          headers: { Authorization: 'Bearer ' + token },
          withCredentials: true
        });
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem('signedJWT'));
      await axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
        headers: { Authorization: 'Bearer ' + token },
        withCredentials: true
      });
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
