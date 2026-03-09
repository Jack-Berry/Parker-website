import React from "react";
import { useParams } from "react-router-dom";
import ProtectedProperty from "./ProtectedProperty";

const ConditionalProtection = ({ children }) => {
  const { propertySlug } = useParams();

  // Only protect piddle-inn
  if (propertySlug === "piddle-inn") {
    return <ProtectedProperty>{children}</ProtectedProperty>;
  }

  // All other properties render normally
  return children;
};

export default ConditionalProtection;
