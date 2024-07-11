import React from "react";
import AdminDashboard from "../components/AdminDashboard";

const AdminDashboardPage = () => {
  return (
    <div className="bg-yellow-100 min-h-screen flex items-center justify-center">
      <div className="p-5 sm:p-6 md:p-10 shadow-lg bg-white rounded-lg">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
