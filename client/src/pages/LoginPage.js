import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import comingSoonImage from '../utils/new.jpg'; // Import the image file
import './LoginPage.css'; // Import custom CSS for LoginPage

const LoginPage = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State for expanded form container
  const [showLogin, setShowLogin] = useState(true); // State to toggle between Login and Register forms

  // Toggle function to expand/collapse form container
  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to switch between Login and Register forms
  const switchForm = () => {
    setShowLogin(!showLogin);
  };

  // Function to handle resizing of form container via mouse drag
  const handleDrag = (e) => {
    const formContainer = document.querySelector('.form-container'); // Select form container element
    const wrapper = document.querySelector('.wrapper'); // Select wrapper element
    const newHeight = e.clientY - wrapper.offsetTop; // Calculate new height based on mouse position
    if (newHeight > 0 && newHeight < wrapper.offsetHeight - 100) { // Adjusted max height
      formContainer.style.height = `${newHeight}px`; // Set new height for form container
    }
  };

  // Effect to add event listeners for mouse drag on component mount
  useEffect(() => {
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleDrag); // Remove mousemove listener on mouseup
    };

    const handleMouseDown = () => {
      document.addEventListener('mousemove', handleDrag); // Add mousemove listener on mousedown
    };

    const dragHandle = document.querySelector('.drag-handle'); // Select drag handle element
    if (dragHandle) {
      document.addEventListener('mouseup', handleMouseUp); // Add mouseup listener
      dragHandle.addEventListener('mousedown', handleMouseDown); // Add mousedown listener

      // Cleanup function to remove event listeners when component unmounts
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        dragHandle.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, []); // Empty dependency array ensures effect runs only on mount

  return (
    <div className="body">
      <div className="wrapper">
        <div className="welcome-section">
          <h1>Welcome to the Waitlist App!</h1>
          <p>Join our waitlist to stay informed.</p>
        </div>
        <div className="form-container">
          <img src={comingSoonImage} alt="Coming Soon" className="coming-soon-image" /> {/* Render coming soon image */}
          {showLogin ? <Login /> : <Register />} {/* Conditionally render Login or Register component */}
          <div className="switch-link">
            {showLogin ? (
              <>
                Don't have an account? <button onClick={switchForm}>Sign up</button> {/* Render signup button */}
              </>
            ) : (
              <>
                Already have an account? <button onClick={switchForm}>Login</button> {/* Render login button */}
              </>
            )}
          </div>
        </div>
        <div className="drag-handle">
          <i className="fas fa-chevron-up"></i> {/* Render icon for collapsing form */}
          <i className="fas fa-chevron-down"></i> {/* Render icon for expanding form */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage; // Export LoginPage component as default
