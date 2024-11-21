import React from "react";

const Button = ({ onClick, text, className }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button className={`btn ${className}`} onClick={(e) => handleClick(e)}>
      {text}
    </button>
  );
};

export default Button;
