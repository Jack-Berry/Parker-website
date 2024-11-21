import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../css/home.css";
import { DateRangePicker, DateRange } from "react-date-range";
import { eachDayOfInterval, parseISO } from "date-fns";
import { getEvents } from "../utils/fetch.js";
import image1 from "../assets/2.jpg";
import Nav from "./Nav";
import Button from "./Button.jsx";

const Home = () => {
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents((fetchedEvents) => {
      setBookings(fetchedEvents || []);
      setLoading(false);
    });
  }, []);

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

  console.log("Final disabled dates array:", disabledDates);

  const isDisabledDate = (date) =>
    Array.isArray(disabledDates) &&
    disabledDates.some(
      (disabledDate) => date.toDateString() === disabledDate.toDateString()
    );

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    console.log("Selected range:", ranges.selection);
  };

  const containsDisabledDay = (dateRange, disabledDates) => {
    const { startDate, endDate } = dateRange[0];

    // Generate all dates within the selected range
    const allDatesInRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    // Check if any date in the range matches a disabled date
    return allDatesInRange.some((date) =>
      disabledDates.some(
        (disabledDate) => date.toDateString() === disabledDate.toDateString()
      )
    );
  };

  const handleSubmit = () => {
    if (!containsDisabledDay(dateRange, disabledDates)) {
      console.log("PASS");
    } else {
      console.log("FAIL");
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
    if (isStartDate) borderRadius = "50% 0 0 50%";
    if (isEndDate) borderRadius = "0 50% 50% 0";

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
            ? "#d3d3d3"
            : "inherit",
          color: isDisabled ? "white" : "inherit",
          borderRadius: isStartDate || isEndDate ? borderRadius : "0",
        }}
      >
        {day.getDate()}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${image1})` }}
    >
      {" "}
      <div className="home-content">
        <h1>Welcome</h1>
        <DateRange
          ranges={dateRange}
          onChange={handleSelect}
          disabledDay={isDisabledDate}
          dayContentRenderer={customDayContentRenderer} // Customize day rendering
          //   showDateDisplay={false} // Hide the date display at the top
        />
        <Button
          onClick={handleSubmit}
          text={"Submit Booking"}
          className={"tab col-c"}
        />
      </div>
      <Nav />
    </div>
  );
};

export default Home;
