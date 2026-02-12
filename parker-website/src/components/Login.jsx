import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SeoHead from "./SEO/SeoHead";
import "../css/admin.scss";
import { PROPERTIES, getPropertyBySlug } from "../config/properties";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Get propertySlug from navigation state (passed from Footer)
  const location = useLocation();
  const propertySlug = location.state?.propertySlug;
  const property = propertySlug ? getPropertyBySlug(propertySlug) : null;

  // Use property-specific logo if available, otherwise default to Preswylfa
  const logo =
    property?.images?.logo || PROPERTIES?.preswylfa?.images?.logo || null;
  const siteName = property?.name || "Holiday Homes & Lets";

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

      // Store property info for Admin component to use
      if (data.propertyId) {
        localStorage.setItem("propertyId", data.propertyId);
      }
      if (data.displayName) {
        localStorage.setItem("displayName", data.displayName);
      }

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
    <>
      <SeoHead
        title="Login | Holiday Homes & Lets"
        canonicalPath="/login"
        robots="noindex, nofollow"
      />
      <form onSubmit={handleSubmit} className="login-container">
      {logo ? (
        <img src={logo} className="logo" alt={`${siteName} logo`} />
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
    </>
  );
};

export default Login;
