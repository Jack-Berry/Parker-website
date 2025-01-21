import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Bwythn_Preswylfa_Logo_Enhanced.png";
import "../css/footer.scss";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const handleOwnerLogin = () => {
    navigate("/admin");
  };

  return (
    <footer>
      <div className="footer-section logo">
        <img src={logo} alt="Bwthyn Preswylfa Logo" />
      </div>
      <div className="footer-section links">
        <ul>
          <li>
            <a href="/">Book</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/what-to-do">Things To Do</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          <li>
            <a href="/admin">Owner Login</a>
          </li>
        </ul>
        {/* <button onClick={handleOwnerLogin} className="btn">
          Owner Login
        </button> */}
      </div>
      <div className="footer-section contact">
        <p className="footer-title">CONTACT</p>
        <p>info@holidayhomesandlets.co.uk</p>
        <p>Bwthyn Preswylfa</p>
        <p>Cromlech Ter</p>
        <p>Tregele</p>
        <p>Cemaes</p>
        <p>LL67 0DW</p>
        <div className="social-links">
          <a
            href="https://www.facebook.com/p/bwythn-preswylfa-61557385151261/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/bwythnpreswylfa1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
