import React, { useState } from "react";
import logo from "../assets/Bwythn_Preswylfa_Logo_Enhanced.png";

const Temp = ({ onSuccess }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const TEMP_PASSWORD = import.meta.env.VITE_TEMP_PASS; // Replace with your desired password
    if (input === TEMP_PASSWORD) {
      onSuccess(); // Trigger the success callback
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

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
        Website Under Construction
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>
        Please either log in or check back soon
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
};

export default Temp;
