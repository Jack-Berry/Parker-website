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
import Nav from "./Nav";
import Button from "./Button.jsx";
import ContactForm from "./ContactForm.jsx";

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
    telephone: "",
    email: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3];

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
    } else {
      console.log("PASS");
      setDateRange([newRange]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: newRange.startDate.toISOString(),
        endDate: newRange.endDate.toISOString(),
      }));
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
          backgroundColor: isDisabled
            ? "red"
            : isSelected
            ? "green"
            : "inherit",
          color: isDisabled ? "white" : isSelected ? "white" : "inherit",
          borderRadius: isStartDate || isEndDate ? borderRadius : "0",
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
            <div className="contact-button-container">
              <Button
                onClick={() => alert("Submit Booking")}
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
      <Nav />
    </div>
  );
};

export default Home;
