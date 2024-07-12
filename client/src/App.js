import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import CSS for ToastContainer styling
import io from "socket.io-client"; // Import socket.io-client for socket connection
import AdminDashboardPage from "./pages/AdminDashboardPage"; // Import AdminDashboardPage component
import CouponsPage from "./pages/CouponsPage"; // Import CouponsPage component
import HomePage from "./pages/HomePage"; // Import HomePage component
import JoinRoom from "./pages/JoinRoom"; // Import JoinRoom component
import LeaderBoard from "./pages/LeaderBoard"; // Import LeaderBoard component
import LoginPage from "./pages/LoginPage"; // Import LoginPage component

const socket = io.connect(process.env.REACT_APP_BASE_URL); // Connect socket.io client to server URL

function App() {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden w-screen box-border"> {/* Render main app container */}
      <Routes> {/* Setup routing for different pages */}
        <Route path="/" element={<LoginPage />} /> {/* Route to LoginPage */}
        <Route path="/home" element={<HomePage />} /> {/* Route to HomePage */}
        <Route path="/leader-board" element={<LeaderBoard socket={socket} />} /> {/* Route to LeaderBoard */}
        <Route path="/join-room" element={<JoinRoom socket={socket} />} /> {/* Route to JoinRoom */}
        <Route path="/redeem-coupons" element={<CouponsPage />} /> {/* Route to CouponsPage */}
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} /> {/* Route to AdminDashboardPage */}
      </Routes>
      <ToastContainer /> {/* Render ToastContainer for notifications */}
    </div>
  );
}

export default App; // Export App component as default
