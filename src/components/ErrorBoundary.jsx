import React from "react";
import logo from "../assets/HHAL Logo.png";

const STORAGE_KEY = "errorBoundaryAttempts";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  componentDidMount() {
    // Only clear the counter if the app loaded without error
    if (!this.state.hasError) {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  handleClick = () => {
    const attempts = parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10);
    if (attempts >= 2) {
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.href = "/";
    } else {
      sessionStorage.setItem(STORAGE_KEY, String(attempts + 1));
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            fontFamily: "sans-serif",
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#a2b9c8",
          }}
        >
          <img
            src={logo}
            alt="Holiday Homes And Lets"
            style={{ width: "200px", marginBottom: "2rem" }}
          />
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page.</p>
          <button
            type="button"
            onClick={this.handleClick}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              fontSize: "1rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
