import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard"; // Import AdminDashboard component
import { UserState } from "../context/UserProvider"; // Import UserState context for user information

const AdminDashboardPage = () => {
  const { user } = UserState(); // Destructure user object from UserState context
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    // Effect to check user role and redirect if not admin
    if (!user || !user.isAdmin) {
      navigate("/"); // Redirect to login page if user is not logged in or not admin
    }
  }, [user, navigate]); // Dependency array ensures effect runs when user or navigate changes

  return (
    <div className="bg-gradient-to-r from-purple-200 to-pink-300 min-h-screen min-w-full flex items-center justify-center">
      <div className="p-5 sm:p-6 md:p-10 shadow-lg bg-white rounded-lg w-full max-w-screen-md">
        <AdminDashboard /> {/* Render AdminDashboard component */}
      </div>
    </div>
  );
};

export default AdminDashboardPage; // Export AdminDashboardPage component as default
