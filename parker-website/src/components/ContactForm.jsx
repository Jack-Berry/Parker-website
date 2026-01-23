import React from "react";

const ContactForm = ({ formData, handleChange }) => {
  const hasDates = Boolean(formData.startDate && formData.endDate);
  let dateText = "";
  if (hasDates) {
    try {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        dateText = `You are booking from ${start.toLocaleDateString()} - ${end.toLocaleDateString()}.`;
      }
    } catch {
      // silently ignore; dateText stays empty
    }
  }

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
          autoComplete="name"
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
          min="1"
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
          min="0"
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
          autoComplete="tel"
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
          autoComplete="email"
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
          rows={4}
          placeholder="Add any additional details or requests here..."
        />
      </div>

      {dateText && (
        <div className="contact-field">
          <h2>{dateText}</h2>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
