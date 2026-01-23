import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Home from "./components/Home";
import Todo from "./components/Todo";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import Admin from "./components/Admin";
import Login from "./components/Login";
import PropertySelection from "./components/PropertySelection";
import ConditionalProtection from "./components/ConditionalProtection";

/* ---------- Utility Components ---------- */

// Hide footer on specific paths (already existed)
const FooterWithCondition = () => {
  const location = useLocation();
  const hideFooterOnPaths = ["/", "/admin", "/login"];
  return hideFooterOnPaths.includes(location.pathname) ? null : <Footer />;
};

// Hide nav on specific paths (NEW)
const NavWithCondition = () => {
  const location = useLocation();
  const hideNavOnPaths = ["/", "/login", "/admin"]; // add others if needed
  return hideNavOnPaths.includes(location.pathname) ? null : <Nav />;
};

// Scroll reset on route change
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);
  return null;
};

/* ---------- App ---------- */

const App = () => {
  return (
    <>
      <ScrollToTop />
      <NavWithCondition />

      <Routes>
        <Route path="/" element={<PropertySelection />} />

        {/* Use dynamic :propertySlug route */}
        <Route
          path="/property/:propertySlug"
          element={
            <ConditionalProtection>
              <Home />
            </ConditionalProtection>
          }
        />
        <Route
          path="/property/:propertySlug/about"
          element={
            <ConditionalProtection>
              <About />
            </ConditionalProtection>
          }
        />
        <Route
          path="/property/:propertySlug/what-to-do"
          element={
            <ConditionalProtection>
              <Todo />
            </ConditionalProtection>
          }
        />
        <Route
          path="/property/:propertySlug/contact"
          element={
            <ConditionalProtection>
              <Contact />
            </ConditionalProtection>
          }
        />

        {/* Admin */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />} />
        <Route path="/admin/dashboard" element={<Admin />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <FooterWithCondition />
    </>
  );
};

/* ---------- Bootstrap ---------- */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
