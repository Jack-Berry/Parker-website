import React, { useState } from "react";
import logo from "../assets/Bwythn_Preswylfa_Logo_Enhanced.png";
import topbar from "../assets/Topbar.png";
import "../css/contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setSuccessMessage(true);

        // Hide the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);
      } else {
        console.error("Error sending message.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="contact-container">
      {/* <img src={logo} className="logo" />
      <h1>Contact</h1> */}
      <img src={topbar} className="topbar" />
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
            ></textarea>
          </div>
          <button id="submit-button" type="submit" className="submit-button">
            Send
          </button>
        </form>
        {successMessage && (
          <p className="success-message">Message sent successfully!</p>
        )}
      </div>
      {/* <Nav /> */}
    </div>
  );
};

export default Contact;
