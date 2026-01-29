import React, { useState, useEffect } from "react";
import Login from "./Login";
import Admin from "./Admin";

const ProtectedRoute = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      // Clear all auth-related data on logout
      localStorage.removeItem("token");
      localStorage.removeItem("propertyId");
      localStorage.removeItem("displayName");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Admin onLogout={handleLogout} />;
};

export default ProtectedRoute;
