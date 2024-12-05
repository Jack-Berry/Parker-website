import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../css/home.scss";
import { DateRange } from "react-date-range";
import { eachDayOfInterval, parseISO } from "date-fns";
import { getEvents } from "../utils/fetch.js";
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
      const response = await fetch("http://localhost:4000/api/prices/total", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate }),
      });

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
    const adjustedEndDate = new Date(formData.endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // Adjust endDate for Google Calendar

    const response = await fetch("http://localhost:4000/add-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: formData.startDate,
        endDate: adjustedEndDate.toISOString(),
        summary: `Booking for ${formData.name}`,
        description: `Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.telephone}, Guests: ${formData.numberOfPeople}, Pets: ${formData.numberOfPets}, Message: ${formData.message}`,
      }),
    });

    if (response.ok) {
      alert(`Booking Successful!`);

      setBookings((prevBookings) => [
        ...prevBookings,
        {
          start: formData.startDate,
          end: formData.endDate,
        },
      ]);

      setToggle(!toggle);

      // Send confirmation email to yourself
      emailjs.send(
        "service_q1e9fo2", // EmailJS Service ID
        "template_2hc5skw", // EmailJS Template ID for Admin
        {
          name: formData.name,
          numberOfPeople: formData.numberOfPeople,
          numberOfPets: formData.numberOfPets, // Include pets
          telephone: formData.telephone,
          email: formData.email,
          message: formData.message, // Include message
          startDate: new Date(formData.startDate).toLocaleDateString(),
          endDate: new Date(formData.endDate).toLocaleDateString(),
        },
        "J776se2Ztlf8I3zen" // EmailJS User ID
      );

      // Send confirmation email to the customer
      emailjs.send(
        "service_q1e9fo2",
        "template_4bd2ucf", // EmailJS Template ID for Customer
        {
          name: formData.name,
          numberOfPeople: formData.numberOfPeople,
          numberOfPets: formData.numberOfPets,
          telephone: formData.telephone,
          email: formData.email,
          message: formData.message,
          startDate: new Date(formData.startDate).toLocaleDateString(),
          endDate: new Date(formData.endDate).toLocaleDateString(),
        },
        "J776se2Ztlf8I3zen"
      );
    } else {
      alert("Failed to add event. Please try again.");
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

  if (loading) return <div>Loading...</div>;

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
        <h1>Welcome to Bwythnpreswylfa</h1>
        <DateRange
          ranges={dateRange}
          onChange={handleSelect}
          disabledDay={isDisabledDate}
          dayContentRenderer={customDayContentRenderer}
        />
        {toggle && (
          <div className="contact-form-container">
            <ContactForm formData={formData} handleChange={handleFormChange} />
            <div className="total-price">
              {totalPrice !== null && (
                <p className="total-price">Total: £{totalPrice.toFixed(2)}</p>
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
          </div>
        )}
        <Button onClick={handleBooking} text="Next" className="btn" />
      </div>
      {/* <Nav /> */}
    </div>
  );
};

export default Home;
