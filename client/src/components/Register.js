import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Register.css";

const Register = ({ handleLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true } // Send cookies and credentials
      );

      console.log("Response:", response); // Log response for debugging

      if (response.status === 201) {
        toast.success("Registered successfully");
        handleLogin(); // Redirect or set login state
      } else {
        toast.error(response.data.message || "Failed to register");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Failed to register");
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h3 className="text-3xl">Create an account</h3>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-yellow-500 text-sm mt-3">
          Already have an account?{" "}
          <button className="text-orange-500 underline" onClick={handleLogin}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
