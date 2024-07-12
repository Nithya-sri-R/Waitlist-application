import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create a context for user-related state management
const userContext = createContext();

// UserProvider component manages user state and provides it to children components
const UserProvider = ({ children }) => {
  // State variables
  const [token, setToken] = useState(""); // Token for authentication
  const [user, setUser] = useState({}); // User object
  const [score, setScore] = useState([]); // Array to store user scores
  const [referral, setReferral] = useState("REFERRAL"); // Default referral state

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Effect to run when component mounts
  useEffect(() => {
    // Retrieve user info from local storage
    let userInfo = localStorage.getItem("signedJWT");
    userInfo = JSON.parse(userInfo);
    
    // Set token state based on retrieved user info
    setToken(userInfo);

    // Redirect based on token existence
    if (!token) {
      navigate("/"); // Navigate to login page if token doesn't exist
    } else {
      navigate("/home"); // Navigate to home page if token exists
    }
  }, []); // Empty dependency array ensures effect runs only on mount

  // Provider component provides state values to its children
  return (
    <userContext.Provider
      value={{ token, setToken, user, setUser, score, setScore, referral, setReferral }}
    >
      {children} {/* Render children components */}
    </userContext.Provider>
  );
};

// Custom hook to consume user context and access state values
export const UserState = () => {
  return useContext(userContext);
};

export default UserProvider; // Export the UserProvider component as default
