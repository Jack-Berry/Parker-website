import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/footer.scss";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { getPropertyBySlug } from "../config/properties";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive slug from the current URL (Footer is outside <Routes/>)
  const match = location.pathname.match(/^\/property\/([^/]+)/);
  const propertySlug = match ? match[1] : null;
  const property = propertySlug ? getPropertyBySlug(propertySlug) : null;

  // Build scoped links
  const homeHref = propertySlug ? `/property/${propertySlug}` : "/";
  const aboutHref = propertySlug ? `/property/${propertySlug}/about` : "/about";
  const todoHref = propertySlug
    ? `/property/${propertySlug}/what-to-do`
    : "/what-to-do";
  const contactHref = propertySlug
    ? `/property/${propertySlug}/contact`
    : "/contact";
  const adminHref = "/admin";

  const handleOwnerLogin = () => {
    console.log("Footer - propertySlug:", propertySlug);
    console.log("Footer - property:", property);
    navigate(adminHref, { state: { propertySlug } });
  };

  const email = property?.contact?.email || "hello@holidayhomesandlets.co.uk";
  const addressLines = property?.contact?.addressLines || [
    property?.name || "Our Property",
    property?.location?.address || "",
  ];
  const facebook = property?.contact?.social?.facebook || null;
  const instagram = property?.contact?.social?.instagram || null;

  return (
    <footer>
      <div className="footer-section logo">
        {property?.images?.logo ? (
          <img
            src={property.images.logo}
            alt={`${property.name || "Property"} Logo`}
          />
        ) : (
          <div aria-label="Logo" style={{ height: 48 }} />
        )}
      </div>

      <div className="footer-section links">
        <ul>
          <li>
            <a href={homeHref}>Book</a>
          </li>
          <li>
            <a href={aboutHref}>About</a>
          </li>
          <li>
            <a href={todoHref}>Things To Do</a>
          </li>
          <li>
            <a href={contactHref}>Contact Us</a>
          </li>
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleOwnerLogin();
              }}
              href="#"
              className="linklike"
            >
              Owner Login
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-section contact">
        <p className="footer-title">CONTACT</p>

        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>

        {/* Address, line by line */}
        {addressLines.filter(Boolean).map((line, idx) => (
          <p key={`addr-${idx}`}>{line}</p>
        ))}

        <div className="social-links">
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
