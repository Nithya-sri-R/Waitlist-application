import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import App from "./App"; // Import main App component
import UserProvider from "./context/UserProvider"; // Import UserProvider component
import "./index.css"; // Import custom CSS for index.js

// Create a React root using ReactDOM.createRoot for concurrent rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application within React.StrictMode for additional checks in development mode
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Provide BrowserRouter for routing capabilities */}
      <UserProvider> {/* Provide UserProvider to manage user state */}
        <App /> {/* Render the main App component */}
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
