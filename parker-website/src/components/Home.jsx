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
      // Reset to default range or do nothing
      setDateRange([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
    } else {
      console.log("PASS");
      setDateRange([newRange]);
    }
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
          //   borderRadius: isStartDate || isEndDate ? borderRadius : "0",
          borderRadius: "0",
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
          dayContentRenderer={customDayContentRenderer}
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
