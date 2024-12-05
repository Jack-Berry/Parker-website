import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "../css/footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin");
    const handleAbout = () => {
      navigate("/about");
    };
  };

  return (
    <footer>
      <button onClick={handleAdmin} className="btn">
        Admin
      </button>
      {/* <Button onClick={handleAdmin} text="Admin" className="btn" /> */}
    </footer>
  );
};

export default Footer;
