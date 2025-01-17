import React, { useState } from "react";
import "../css/admin.scss";
import logo from "../assets/Bwythn_Preswylfa_Logo_Enhanced.png";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token); // Save the token in state or localStorage
    } else {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <img src={logo} className="logo" />
      <div className="login-box">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="login-box">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
