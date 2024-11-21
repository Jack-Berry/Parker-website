import React, { Component } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "../css/nav.css";

const Nav = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  const handleAbout = () => {
    navigate("/about");
  };
  const handleContact = () => {
    navigate("/contact");
  };
  const handleToDo = () => {
    navigate("/what-to-do");
  };
  return (
    <div className="nav-container">
      <Button onClick={handleHome} text={"Home"} className={"tab col-a"} />
      <Button onClick={handleAbout} text={"About"} className={"tab col-a"} />
      <Button
        onClick={handleToDo}
        text={"What to do"}
        className={"tab col-b"}
      />
      <Button
        onClick={handleContact}
        text={"Contact"}
        className={"tab col-c"}
      />
    </div>
  );
};

export default Nav;
