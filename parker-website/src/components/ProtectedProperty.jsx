import React, { useState, useEffect } from "react";
import logo from "../assets/piddle-inn/piddle-logo.png";

const ProtectedProperty = ({ propertyId, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Check localStorage on mount
  useEffect(() => {
    const authKey = localStorage.getItem(`auth_${propertyId}`);
    if (authKey === "granted") {
      setIsAuthenticated(true);
    }
  }, [propertyId]);

  const handleLogin = () => {
    const TEMP_PASSWORD = process.env.REACT_APP_TEMP_PASS;

    if (input === TEMP_PASSWORD) {
      localStorage.setItem(`auth_${propertyId}`, "granted");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // Show password screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="Website Logo"
          style={{
            width: "200px",
            height: "200px",
            marginBottom: "40px",
          }}
        />
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Property Preview
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>
          This property is currently in preview mode. Please enter the password
          to continue.
        </p>
        <input
          type="password"
          placeholder="Enter password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginBottom: "20px",
            width: "250px",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid white",
            backgroundColor: "black",
            color: "white",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      </div>
    );
  }

  // Show actual content if authenticated
  return <>{children}</>;
};

export default ProtectedProperty;
