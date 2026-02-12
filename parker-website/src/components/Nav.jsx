import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import "../css/nav.scss";
import { getPropertyBySlug } from "../config/properties";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive slug from pathname, e.g. /piddle-inn/...
  const match = location.pathname.match(/^\/([^/]+)/);
  const propertySlug = match ? match[1] : null;
  const property = propertySlug ? getPropertyBySlug(propertySlug) : null;

  const goto = (path) => navigate(path);

  return (
    <div className="nav-container">
      {propertySlug ? (
        <>
          <Button
            onClick={() => goto(`/${propertySlug}`)}
            text="Book"
            className="tab"
          />
          <Button
            onClick={() => goto(`/${propertySlug}/about`)}
            text="About"
            className="tab"
          />
          <Button
            onClick={() => goto(`/${propertySlug}/what-to-do`)}
            text="What to do"
            className="tab"
          />
          <Button
            onClick={() => goto(`/${propertySlug}/contact`)}
            text="Contact"
            className="tab"
          />

          {/* “Properties” button linking back to the selection page */}
          <Button
            onClick={() => goto("/")}
            text="Select Property"
            className="tab properties-tab"
          />
        </>
      ) : (
        <Button
          onClick={() => goto("/")}
          text="Choose Property"
          className="tab"
        />
      )}
    </div>
  );
};

export default Nav;
