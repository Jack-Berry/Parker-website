import React, { useState, useEffect } from "react";
import Login from "./Login";
import Admin from "./Admin";

const ProtectedRoute = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Admin />;
};

export default ProtectedRoute;
