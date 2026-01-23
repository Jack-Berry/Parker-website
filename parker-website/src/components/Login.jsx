import React, { useState } from "react";
import "../css/admin.scss";
import { PROPERTIES } from "../config/properties"; // optional: for a default brand logo

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Use a default brand logo if available (e.g., Preswylfa’s logo).
  // Safe if you later change the default or add a dedicated site logo.
  const defaultLogo = PROPERTIES?.preswylfa?.images?.logo || null;
  const siteName = "Holiday Homes & Lets";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Login failed. Check your credentials.");
      }

      const data = await res.json();
      // Store token via parent state; ProtectedRoute persists it to localStorage.
      setToken(data.token);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      {defaultLogo ? (
        <img src={defaultLogo} className="logo" alt={`${siteName} logo`} />
      ) : (
        <h1 className="logo-text">{siteName}</h1>
      )}

      <div className="login-box">
        <label htmlFor="admin-username">Username:</label>
        <input
          id="admin-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>

      <div className="login-box">
        <label htmlFor="admin-password">Password:</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Logging in…" : "Login"}
      </button>
    </form>
  );
};

export default Login;
