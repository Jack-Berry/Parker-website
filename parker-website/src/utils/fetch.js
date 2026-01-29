// src/utils/fetch.js
import request from "superagent";

/**
 * Centralised backend base URL.
 *
 * Priority:
 * 1) REACT_APP_API_BASE_URL (preferred, new)
 * 2) REACT_APP_API_URL      (legacy, existing)
 * 3) https://holidayhomesandlets.co.uk (default)
 *
 * That means: unless you explicitly override one of the env vars,
 * BOTH localhost dev and the deployed frontend will talk to the
 * live backend at https://holidayhomesandlets.co.uk.
 */
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  "https://holidayhomesandlets.co.uk";

/**
 * Small helper in case you ever want the base URL as a function.
 * (Doesn’t change any existing behaviour; purely additive.)
 */
export function getApiBaseUrl() {
  return API_BASE_URL;
}

/**
 * Fetch calendar events for a specific property
 * @param {string} propertyId - The property identifier (e.g., 'preswylfa', 'piddle-inn')
 * @param {function} callback - Callback function to handle the events: (eventsArray) => void
 */
export function getEvents(propertyId, callback) {
  if (!propertyId) {
    console.error("getEvents: propertyId is required");
    if (typeof callback === "function") callback([]);
    return;
  }

  const url = `${API_BASE_URL}/api/events/${propertyId}`;

  console.log("Fetching events from URL:", url);

  request.get(url).end((err, resp) => {
    if (err) {
      console.error("Error fetching events:", err);
      if (typeof callback === "function") callback([]);
      return;
    }

    try {
      // superagent usually gives you resp.body, but fall back to resp.text just in case
      const payload =
        (resp && resp.body) ||
        (resp && resp.text && JSON.parse(resp.text)) ||
        {};
      const items = Array.isArray(payload.items) ? payload.items : [];
      console.log(payload);

      const events = items
        .map((event) => {
          const startStr = event.start?.dateTime || event.start?.date;
          const endStr = event.end?.dateTime || event.end?.date;
          const start = startStr ? new Date(startStr) : null;
          const end = endStr ? new Date(endStr) : null;

          if (!start || !end || isNaN(start) || isNaN(end)) {
            console.warn("Skipping invalid event:", event);
            return null;
          }

          console.log("Parsed event:", {
            title: event.summary,
            start,
            end,
          });

          return {
            start,
            end,
            title: event.summary,
          };
        })
        .filter(Boolean);

      if (typeof callback === "function") {
        callback(events);
      }
    } catch (parseError) {
      console.error("Error parsing events response:", parseError);
      if (typeof callback === "function") callback([]);
    }
  });
}

/**
 * Fetch pricing information for a specific property
 * @param {string} propertyId - The property identifier
 * @returns {Promise<any>} Promise resolving to pricing data
 */
export async function getPricing(propertyId) {
  if (!propertyId) {
    throw new Error("getPricing requires a propertyId");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/prices/${propertyId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pricing (status ${response.status})`);
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
 * @param {string} startDate - Start date (ISO format: YYYY-MM-DD)
 * @param {string} endDate - End date (ISO format: YYYY-MM-DD)
 * @returns {Promise<any>} Promise resolving to total price payload
 */
export async function calculateTotalPrice(propertyId, startDate, endDate) {
  if (!propertyId) {
    throw new Error("calculateTotalPrice requires a propertyId");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/prices/total/${propertyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to calculate total price (status ${response.status})`,
      );
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
 * @returns {Promise<any>} Promise resolving to the created event
 */
export async function addBookingEvent(propertyId, bookingData) {
  if (!propertyId) {
    throw new Error("addBookingEvent requires a propertyId");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/add-event/${propertyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add booking event (status ${response.status})`,
      );
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
 * @returns {Promise<any>} Promise resolving when emails are sent
 */
export async function sendBookingEmails(propertyId, bookingData) {
  if (!propertyId) {
    throw new Error("sendBookingEmails requires a propertyId");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/send-booking-emails/${propertyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to send booking emails (status ${response.status})`,
      );
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
 * @returns {Promise<any>} Promise resolving when message is sent
 */
export async function sendContactMessage(contactData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send contact message (status ${response.status})`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
}
