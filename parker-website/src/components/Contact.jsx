import React, { useState } from "react";
import Nav from "./Nav";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitButton = document.getElementById("submit-button");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    const serviceId = "Parker";
    const templateId = "ID";
    const publicKey = "Key";

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      to_name: "Jack",
      message: formData.message,
    };

    e.preventDefault();
    submitButton.textContent = "Sending...";

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent!", response);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        submitButton.textContent = "Send";
      })
      .catch((error) => {
        console.error("error sending email", error);
      });
  };

  return (
    <div className="contact-container">
      <h1>Contact</h1>
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
      </div>
      <Nav />
    </div>
  );
};

export default Contact;
