import React from "react";

const ContactForm = ({ formData, handleChange }) => {
  return (
    <form className="contact-form">
      <h1>We need to take some details...</h1>
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
        <label htmlFor="numberOfPets">Number of Pets:</label>
        <input
          type="number"
          id="numberOfPets"
          name="numberOfPets"
          value={formData.numberOfPets}
          onChange={handleChange}
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
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="contact-textarea"
          placeholder="Add any additional details or requests here..."
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
