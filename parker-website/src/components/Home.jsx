// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPropertyBySlug } from "../config/properties";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../css/home.scss";
import { DateRange } from "react-date-range";
import { eachDayOfInterval, parseISO, differenceInDays } from "date-fns";
import { API_BASE_URL, getEvents } from "../utils/fetch";
import Button from "./Button.jsx";
import ContactForm from "./ContactForm.jsx";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const { propertySlug } = useParams();
  const property = getPropertyBySlug(propertySlug);

  const [bookings, setBookings] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    numberOfPeople: "",
    numberOfPets: "",
    telephone: "",
    email: "",
    message: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCleaningChargeMessage, setShowCleaningChargeMessage] =
    useState(false);
  const [totalPrice, setTotalPrice] = useState(null);

  const images = property?.images?.hero || [];

  // Fetch bookings for this property
  useEffect(() => {
    if (!property) return;

    getEvents(property.id, (fetchedEvents) => {
      setBookings(fetchedEvents || []);
      setLoading(false);
    });
  }, [property?.id, property]); // safe dependency usage

  // Background slideshow
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [images]);

  if (!property) {
    return (
      <div className="home-container">
        <div className="error-container">
          <h2>Property not found</h2>
          <p>The property you’re trying to view doesn’t exist.</p>
        </div>
      </div>
    );
  }

  // Fetch total price from backend (property-specific)
  const fetchTotalPrice = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/prices/total/${property.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startDate, endDate }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        let finalTotal = data.total;
        const numNights = differenceInDays(
          new Date(endDate),
          new Date(startDate),
        );

        // Property-specific cleaning charge
        if (numNights <= property.pricing.cleaningChargeNights) {
          finalTotal += property.pricing.cleaningCharge;
        }
        setTotalPrice(finalTotal);
      } else {
        console.error("Failed to fetch total price");
      }
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };

  // Disable booked dates
  const disabledDates = bookings.flatMap((booking) => {
    let start = booking.start;
    let end = booking.end;
    if (typeof start === "string") start = parseISO(start);
    if (typeof end === "string") end = parseISO(end);
    if (
      !(start instanceof Date) ||
      !(end instanceof Date) ||
      isNaN(start) ||
      isNaN(end) ||
      start > end
    ) {
      console.warn(
        `Skipping invalid interval: ${booking.start} - ${booking.end}`,
      );
      return [];
    }
    return eachDayOfInterval({ start, end });
  });

  const isDisabledDate = (date) =>
    disabledDates.some((d) => date.toDateString() === d.toDateString());

  const handleSelect = (ranges) => {
    const newRange = ranges.selection;
    const numNights = differenceInDays(newRange.endDate, newRange.startDate);

    // Check for conflicts
    if (
      eachDayOfInterval({
        start: newRange.startDate,
        end: newRange.endDate,
      }).some(isDisabledDate)
    ) {
      console.log("FAIL: Contains disabled dates.");
      setDateRange([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
      setFormData((prev) => ({
        ...prev,
        startDate: "",
        endDate: "",
      }));
      setTotalPrice(null);
    } else {
      console.log("PASS");
      setDateRange([newRange]);
      setFormData((prev) => ({
        ...prev,
        startDate: newRange.startDate.toISOString(),
        endDate: newRange.endDate.toISOString(),
      }));

      setShowCleaningChargeMessage(
        numNights <= property.pricing.cleaningChargeNights,
      );

      fetchTotalPrice(
        newRange.startDate.toISOString().split("T")[0],
        newRange.endDate.toISOString().split("T")[0],
      );
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = () => {
    const { startDate, endDate } = dateRange[0];
    if (
      !startDate ||
      !endDate ||
      startDate.toDateString() === new Date().toDateString()
    ) {
      alert("Please select a valid date range before proceeding.");
      return;
    }
    setToggle(!toggle);
  };

  const handleSubmit = async () => {
    try {
      const adjustedEndDate = new Date(formData.endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const bookingData = {
        startDate: formData.startDate,
        endDate: adjustedEndDate.toISOString(),
        summary: `Booking for ${formData.name}`,
        description: `Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.telephone}, Guests: ${formData.numberOfPeople}, Pets: ${formData.numberOfPets}, Message: ${formData.message}`,
        totalPrice,
        name: formData.name,
        email: formData.email,
        numberOfPeople: formData.numberOfPeople,
        numberOfPets: formData.numberOfPets,
        telephone: formData.telephone,
        message: formData.message,
      };

      const calendarResponse = await fetch(
        `${API_BASE_URL}/api/add-event/${property.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        },
      );
      if (!calendarResponse.ok) throw new Error("Failed to add event.");

      const emailResponse = await fetch(
        `${API_BASE_URL}/api/send-booking-emails/${property.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        },
      );
      if (!emailResponse.ok) throw new Error("Failed to send emails.");

      setBookings((prev) => [
        ...prev,
        { start: formData.startDate, end: formData.endDate },
      ]);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setToggle(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const customDayContentRenderer = (day) => {
    const isDisabled = isDisabledDate(day);
    const isStart =
      dateRange[0].startDate.toDateString() === day.toDateString();
    const isEnd = dateRange[0].endDate.toDateString() === day.toDateString();
    const isSelected =
      day >= dateRange[0].startDate && day <= dateRange[0].endDate;

    let borderRadius = "0";
    if (isStart) borderRadius = "20% 0 0 20%";
    if (isEnd) borderRadius = "0 20% 20% 0";

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          backgroundColor: isDisabled
            ? "red"
            : isSelected
              ? "green"
              : "inherit",
          color: isDisabled ? "white" : isSelected ? "white" : "inherit",
          borderRadius,
        }}
      >
        {day.getDate()}
      </div>
    );
  };

  return (
    <div className="home-container">
      {/* Background slideshow */}
      <div className="background-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`background-image ${
              index === currentImageIndex ? "visible" : ""
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      <div className="home-content">
        {property.images?.logo && (
          <img
            src={property.images.logo}
            className="logo"
            alt={`${property.name} logo`}
          />
        )}
        <h1>Welcome to {property.name}</h1>

        {loading ? (
          <div className="loading-placeholder">
            <Spinner animation="border" variant="light" />
            <p>Getting dates...</p>
          </div>
        ) : (
          <>
            <DateRange
              ranges={dateRange}
              onChange={handleSelect}
              disabledDay={isDisabledDate}
              dayContentRenderer={customDayContentRenderer}
            />

            {toggle && (
              <div className="contact-form-container">
                {formSubmitted ? (
                  <>
                    <p className="success-message">
                      Thank you! Your booking request has been submitted.
                    </p>
                    <p className="success-message">
                      You will receive an email confirmation shortly.
                    </p>
                  </>
                ) : (
                  <>
                    <ContactForm
                      formData={formData}
                      handleChange={handleFormChange}
                    />
                    <div className="total-price">
                      {totalPrice !== null && (
                        <p>Total: £{totalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    <div className="contact-button-container">
                      <Button
                        onClick={handleSubmit}
                        text="Submit Booking"
                        className="tab col-c"
                      />
                      <Button
                        onClick={() => setToggle(false)}
                        text="Cancel"
                        className="tab col-c"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {totalPrice !== null && (
              <div className="price-summary">
                <div className="price-summary-content">
                  <span className="price-label">Total Price</span>
                  <span className="price-amount">£{totalPrice.toFixed(2)}</span>
                </div>
                {showCleaningChargeMessage && (
                  <p className="price-note">
                    Includes £{property.pricing.cleaningCharge} cleaning charge
                    for stays of {property.pricing.cleaningChargeNights} nights
                    or less
                  </p>
                )}
              </div>
            )}

            <Button onClick={handleBooking} text="Next" className="btn" />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
