import React from "react";

const ContactForm = ({ formData, handleChange }) => {
  return (
    <form className="contact-form">
      <h1>You're in!</h1>
      <div className="contact-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="numberOfPeople">Number of People:</label>
        <input
          type="number"
          id="numberOfPeople"
          name="numberOfPeople"
          value={formData.numberOfPeople}
          onChange={handleChange}
          required
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="telephone">Telephone:</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <h2>{`You are booking from ${new Date(
          formData.startDate
        ).toLocaleDateString()} - ${new Date(
          formData.endDate
        ).toLocaleDateString()}.`}</h2>
      </div>
    </form>
  );
};

export default ContactForm;
