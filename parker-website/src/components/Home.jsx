import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../css/home.scss";
import { DateRange } from "react-date-range";
import { eachDayOfInterval, parseISO } from "date-fns";
import { getEvents } from "../utils/fetch.js";
import logo from "../assets/Bwythn_Preswylfa_Logo_Enhanced.png";
import image1 from "../assets/2.jpg";
import image2 from "../assets/3.jpg";
import image3 from "../assets/54.jpg";
import image4 from "../assets/20240324_170910.jpg";
import image5 from "../assets/20240908_141632.jpg";
import image6 from "../assets/IMG-20240520-WA0009.jpg";
import image7 from "../assets/IMG-20240528-WA0000.jpg";
import image8 from "../assets/SmartSelect_20240225_201528_Airbnb.jpg";
import image9 from "../assets/SmartSelect_20240225_201536_Airbnb.jpg";
import Button from "./Button.jsx";
import ContactForm from "./ContactForm.jsx";
import { Spinner } from "react-bootstrap";
import emailjs from "emailjs-com";

const Home = () => {
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
  const [formSubmitted, setFormSubmitted] = useState(false); // New state for tracking form submission

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ];
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    // Fetch bookings
    getEvents((fetchedEvents) => {
      setBookings(fetchedEvents || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [images.length]);

  const fetchTotalPrice = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/prices/total`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startDate, endDate }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTotalPrice(data.total); // Update total price state
      } else {
        console.error("Failed to fetch total price");
      }
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };

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
        `Skipping invalid interval: ${booking.start} - ${booking.end}`
      );
      return [];
    }

    return eachDayOfInterval({ start, end });
  });

  const isDisabledDate = (date) =>
    disabledDates.some(
      (disabledDate) => date.toDateString() === disabledDate.toDateString()
    );

  const handleSelect = (ranges) => {
    const newRange = ranges.selection;

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: "",
        endDate: "",
      }));
      setTotalPrice(null);
    } else {
      console.log("PASS");
      setDateRange([newRange]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: newRange.startDate.toISOString(),
        endDate: newRange.endDate.toISOString(),
      }));

      // Fetch total price with new range
      fetchTotalPrice(
        newRange.startDate.toISOString().split("T")[0],
        newRange.endDate.toISOString().split("T")[0]
      );
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        `${process.env.REACT_APP_API_URL}/api/add-event`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!calendarResponse.ok) {
        throw new Error("Failed to add event to Google Calendar.");
      }

      const emailResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/send-booking-emails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!emailResponse.ok) {
        throw new Error("Failed to send confirmation emails.");
      }

      setBookings((prevBookings) => [
        ...prevBookings,
        {
          start: formData.startDate,
          end: formData.endDate,
        },
      ]);

      setFormSubmitted(true); // Show thank-you message
      setTimeout(() => {
        setFormSubmitted(false);
        setToggle(false);
      }, 2000); // Hide form and thank-you message after 5 seconds
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const customDayContentRenderer = (day) => {
    const isDisabled = isDisabledDate(day);
    const isStartDate =
      dateRange[0].startDate.toDateString() === day.toDateString();
    const isEndDate =
      dateRange[0].endDate.toDateString() === day.toDateString();
    const isSelected =
      day >= dateRange[0].startDate && day <= dateRange[0].endDate;

    let borderRadius = "0";
    if (isStartDate) borderRadius = "20% 0 0 20%";
    if (isEndDate) borderRadius = "0 20% 20% 0";

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
          // borderRadius: isStartDate || isEndDate ? borderRadius : "0",
        }}
      >
        {day.getDate()}
      </div>
    );
  };

  return (
    <div className="home-container">
      <div className="background-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`background-image ${
              index === currentImageIndex ? "visible" : ""
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <div className="home-content">
        <img src={logo} className="logo" alt="Logo" />
        <h1>Welcome to Bwthyn Preswylfa</h1>
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
            <Button
              onClick={() => setToggle(!toggle)}
              text="Next"
              className="btn"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
