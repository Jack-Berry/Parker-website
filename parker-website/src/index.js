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

        {/* Admin routes MUST come before dynamic slug routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />} />
        <Route path="/admin/dashboard" element={<Admin />} />

        <Route path="/:propertySlug" element={<Home />} />
        <Route path="/:propertySlug/about" element={<About />} />
        <Route path="/:propertySlug/what-to-do" element={<Todo />} />
        <Route path="/:propertySlug/contact" element={<Contact />} />

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
  </BrowserRouter>,
);

reportWebVitals();
