import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CouponsPage from "./pages/CouponsPage";
import HomePage from "./pages/HomePage";
import JoinRoom from "./pages/JoinRoom";
import LeaderBoard from "./pages/LeaderBoard";
import LoginPage from "./pages/LoginPage";

const socket = io.connect(process.env.REACT_APP_BASE_URL);

function App() {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden w-screen box-border">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/leader-board" element={<LeaderBoard socket={socket} />} />
        <Route path="/early-register" element={<JoinRoom socket={socket} />} />
        <Route path="/redeem-coupons" element={<CouponsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
