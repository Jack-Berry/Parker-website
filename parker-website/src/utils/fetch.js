import request from "superagent";

// Base API URL from environment
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://holidayhomesandlets.co.uk";

/**
 * Fetch calendar events for a specific property
 * @param {string} propertyId - The property identifier (e.g., 'preswylfa', 'piddle-inn')
 * @param {function} callback - Callback function to handle the events
 */
export function getEvents(propertyId, callback) {
  const url = `${API_BASE_URL}/api/events/${propertyId}`;

  request.get(url).end((err, resp) => {
    if (!err) {
      const events = [];
      JSON.parse(resp.text).items.map((event) => {
        return events.push({
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
          title: event.summary,
        });
      });
      callback(events);
    } else {
      console.error("Error fetching events:", err);
      callback([]); // Return empty array on error
    }
  });
}

/**
 * Fetch pricing information for a specific property
 * @param {string} propertyId - The property identifier
 * @returns {Promise} Promise resolving to pricing data
 */
export async function getPricing(propertyId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/prices/${propertyId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch pricing");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pricing:", error);
    throw error;
  }
}

/**
 * Calculate total price for a date range for a specific property
 * @param {string} propertyId - The property identifier
 * @param {string} startDate - Start date (ISO format)
 * @param {string} endDate - End date (ISO format)
 * @returns {Promise} Promise resolving to total price
 */
export async function calculateTotalPrice(propertyId, startDate, endDate) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/prices/total/${propertyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to calculate total price");
    }

    return await response.json();
  } catch (error) {
    console.error("Error calculating total price:", error);
    throw error;
  }
}

/**
 * Add a booking event to the calendar for a specific property
 * @param {string} propertyId - The property identifier
 * @param {object} bookingData - Booking information
 * @returns {Promise} Promise resolving to the created event
 */
export async function addBookingEvent(propertyId, bookingData) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/add-event/${propertyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add booking event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding booking event:", error);
    throw error;
  }
}

/**
 * Send booking confirmation emails for a specific property
 * @param {string} propertyId - The property identifier
 * @param {object} bookingData - Booking information including customer details
 * @returns {Promise} Promise resolving when emails are sent
 */
export async function sendBookingEmails(propertyId, bookingData) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/send-booking-emails/${propertyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send booking emails");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending booking emails:", error);
    throw error;
  }
}

/**
 * Send a general contact form message
 * @param {object} contactData - Contact form data (name, email, message)
 * @returns {Promise} Promise resolving when message is sent
 */
export async function sendContactMessage(contactData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error("Failed to send contact message");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
}
