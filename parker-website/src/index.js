import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Home";
import Todo from "./components/Todo";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
// import "bootstrap/dist/css/bootstrap.min.css";

import Temp from "./components/Temp";

const FooterWithCondition = () => {
  const location = useLocation();
  const hideFooterOnPaths = ["/", "/admin"]; // Add paths where the footer should be hidden
  return hideFooterOnPaths.includes(location.pathname) ? null : <Footer />;
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // if (!isAuthenticated) {
  //   return <Temp onSuccess={() => setIsAuthenticated(true)} />;
  // }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="what-to-do" element={<Todo />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<ProtectedRoute />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Nav />
      <FooterWithCondition />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
