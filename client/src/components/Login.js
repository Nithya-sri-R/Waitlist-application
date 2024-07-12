import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserState } from "../context/UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = UserState(); // Assuming you have UserProvider context

  // Handle form submission for user login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Send POST request to authenticate user
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user); // Set the user state
        setToken(token); // Set the token state
        localStorage.setItem("signedJWT", JSON.stringify(token));
        toast.success("Logged in successfully");
        navigate("/home");
      } else {
        toast.error(response.data.message || "Failed to log in");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Failed to log in");
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="text" onSubmit={handleSubmit}>
      {/* Input fields for email and password */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      {/* Button for submitting login form */}
      <button
        type="submit"
        className="block w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-md shadow-md hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring focus:ring-purple-200"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
