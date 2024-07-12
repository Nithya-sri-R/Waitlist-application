import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

   // Handle form submission for user registration

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
      // Send POST request to register new user
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Registered successfully");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
