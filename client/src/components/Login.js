import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "./Login.css"; // Import CSS file for Login

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true } // Use withCredentials if handling cookies or sessions
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("signedJWT", JSON.stringify(token));
        toast.success("Logged in successfully");
        console.log("Stored token:", token);
        console.log("Navigating to /home");
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

  useEffect(() => {
    const token = localStorage.getItem("signedJWT");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h3 className="text-4xl">Hello Makkaley</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-orange-500 text-sm mt-3">
          Don't have an account?{" "}
          <button className="text-yellow-500 underline" onClick={handleLogin}>
            Create an account
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
