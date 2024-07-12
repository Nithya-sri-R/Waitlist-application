import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider"; // Import UserState context for user information
import iphone from "../utils/iphone.png"; // Import image for iPhone

const HomePage = () => {
  const { token, setUser, user } = UserState(); // Destructure token, setUser, and user from UserState context
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [slide, setSlide] = useState(false); // State to manage slide animation

  // Function to fetch user info from backend
  const getInfo = async (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token, // Set authorization header with JWT token
      },
      withCredentials: true, // Ensure credentials are sent with the request
    };

    try {
      // Fetch user info from backend API
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-info`, config);
      const { user } = response.data; // Destructure user object from response data
      setUser(user); // Update user context with fetched user data

      // Redirect to join-room page if user hasn't joined a room
      if (!user.joinedRoom) {
        setSlide(true); // Trigger slide animation
        setTimeout(() => navigate("/join-room"), 1000); // Navigate to join-room page after 1 second
      }
    } catch (err) {
      // Handle errors related to invalid JWT or authentication
      localStorage.removeItem("signedJWT"); // Remove invalid JWT from localStorage
      console.log("Invalid JWT, user not authenticated");
      navigate("/"); // Redirect to login page
    }
  };

  // Effect to run on component mount or when token changes
  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("signedJWT")); // Retrieve token from localStorage
    if (storedToken) {
      getInfo(storedToken); // Fetch user info if token exists in localStorage
    } else {
      navigate("/"); // Redirect to login page if token doesn't exist
    }
  }, [navigate]); // Dependency array ensures effect runs when navigate changes

  // Effect to run when token changes
  useEffect(() => {
    if (token) {
      getInfo(token); // Fetch user info if token is updated
    }
  }, [token]); // Dependency array ensures effect runs when token changes

  // Effect to redirect to admin dashboard if user is an admin
  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin-dashboard"); // Redirect to admin-dashboard if user is admin
    }
  }, [user, navigate]); // Dependency array ensures effect runs when user or navigate changes

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 to-purple-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <img src={iphone} className="object-contain w-full rounded-lg shadow-lg" alt="iPhone" /> {/* Render iPhone image */}
        </div>
        <div className="flex flex-col justify-center items-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900">Support My Work</h1> {/* Render heading */}
          {user && ( // Conditional rendering based on user existence
            <div className="space-y-4 text-center">
              {!user.joinedRoom && ( // Render button to join room if user hasn't joined
                <button onClick={() => navigate("/join-room")} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300">Join Room</button>
              )}
              {user.joinedRoom && ( // Render link to leaderboard if user has joined a room
                <Link to="/leader-board" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300">View Leaderboard</Link>
              )}
              {user.winner && ( // Render link to redeem coupons if user is a winner
                <Link to="/redeem-coupons" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300">Redeem Coupons</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; // Export HomePage component as default
