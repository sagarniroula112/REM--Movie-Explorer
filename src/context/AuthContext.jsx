// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Perform login (you can integrate an API here)
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Adding PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensuring children is a valid React node
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
