import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyBySlug } from "../config/properties";
import "../css/contact.scss";

const Contact = () => {
  const { propertySlug } = useParams();
  const property = getPropertyBySlug(propertySlug);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);

  if (!property) {
    return (
      <div className="contact-container">
        <div className="error-container">
          <h2>Property not found</h2>
          <p>The property you’re trying to contact does not exist.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contact/${property.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 5000);
      } else {
        console.error("Error sending message.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="contact-container">
      {property.images?.topbar && (
        <img
          src={property.images.topbar}
          className="topbar"
          alt={`${property.name} top bar`}
        />
      )}
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>
          <button id="submit-button" type="submit" className="submit-button">
            Send
          </button>
        </form>

        {successMessage && (
          <p className="success-message">Message sent successfully!</p>
        )}

        {property.contact?.email && (
          <p className="contact-note">
            Messages for <strong>{property.name}</strong> are sent to{" "}
            <a href={`mailto:${property.contact.email}`}>
              {property.contact.email}
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
