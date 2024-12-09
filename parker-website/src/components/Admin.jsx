import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/admin.scss";

const Admin = () => {
  const localizer = momentLocalizer(moment);
  const [standardPrice, setStandardPrice] = useState("");
  const [datePrices, setDatePrices] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetch("/api/prices")
      .then((res) => res.json())
      .then((data) => {
        setStandardPrice(data.standardPrice);
        setDatePrices(data.datePrices);
      })
      .catch((err) => console.error("Error fetching prices:", err));
  }, []);

  const handleDateSelect = ({ start, end }) => {
    console.log("Selection start:", start, "end:", end);
    const startDate = moment(start).startOf("day");
    const endDate = moment(end).startOf("day").subtract(1, "seconds"); // Include the end day

    const selectedRange = [];
    let currentDate = startDate.clone();

    // Generate the range of dates, inclusive of both start and end
    while (currentDate.isSameOrBefore(endDate)) {
      selectedRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    setSelectedDates((prevSelectedDates) => {
      const updatedSelection = new Set(prevSelectedDates);

      selectedRange.forEach((date) => {
        if (updatedSelection.has(date)) {
          updatedSelection.delete(date); // Remove if already selected
        } else {
          updatedSelection.add(date); // Add if not selected
        }
      });

      return Array.from(updatedSelection); // Convert back to an array
    });
  };

  const clearSelection = () => setSelectedDates([]);

  const updateStandardPrice = () => {
    fetch("/api/prices/standard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: standardPrice }),
    })
      .then(() => alert("Standard price updated!"))
      .catch((err) => console.error("Error updating standard price:", err));
  };

  const updateSelectedDatesPrice = () => {
    if (!selectedDates.length || !newPrice) {
      alert("Select dates and enter a price.");
      return;
    }

    fetch("/api/prices/date-range", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dates: selectedDates,
        price: newPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDatePrices(data.datePrices);
        setSelectedDates([]);
        setNewPrice("");
      })
      .catch((err) => console.error("Error updating date prices:", err));
  };

  const formatEvents = () => {
    const events = [];
    const dateMap = datePrices.reduce((acc, { date, price }) => {
      acc[moment(date).format("YYYY-MM-DD")] = price;
      return acc;
    }, {});

    const today = moment();
    const daysInYear = 365;

    for (let i = 0; i < daysInYear; i++) {
      const currentDate = today.clone().add(i, "days");
      const formattedDate = currentDate.format("YYYY-MM-DD");
      const price = dateMap[formattedDate] || standardPrice;

      events.push({
        title: `£${price}`,
        start: new Date(formattedDate),
        end: new Date(formattedDate),
        allDay: true,
        selected: selectedDates.includes(formattedDate),
      });
    }

    return events;
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.selected ? "lightblue" : "white";
    const borderColor = event.selected ? "blue" : "gray";

    return {
      style: {
        backgroundColor,
        borderColor,
        color: "black",
        borderRadius: "5px",
        textAlign: "center",
        pointerEvents: "none", // Prevent interaction with the event overlay
      },
    };
  };

  const CustomToolbar = (toolbar) => {
    return (
      <div className="rbc-toolbar">
        <button
          type="button"
          className="rbc-btn"
          onClick={() => toolbar.onNavigate("PREV")}
        >
          Previous
        </button>
        <span className="rbc-toolbar-label">
          {toolbar.label} {/* Displays the current month */}
        </span>
        <button
          type="button"
          className="rbc-btn"
          onClick={() => toolbar.onNavigate("NEXT")}
        >
          Next
        </button>
      </div>
    );
  };

  const dayPropGetter = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isSelected = selectedDates.includes(formattedDate);

    return {
      style: {
        backgroundColor: isSelected ? "lightblue" : "inherit",
        border: isSelected ? "1px solid blue" : "none",
        cursor: "pointer",
      },
    };
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>

      <div className="standard-price-section">
        <h2>Standard Price</h2>
        <input
          type="number"
          value={standardPrice}
          onChange={(e) => setStandardPrice(e.target.value)}
        />
        <button onClick={updateStandardPrice}>Update Standard Price</button>
      </div>

      <div className="calendar-section">
        <h2>Manage Prices</h2>
        <Calendar
          localizer={localizer}
          events={formatEvents()}
          selectable
          onSelectSlot={handleDateSelect}
          onSelectEvent={(event) =>
            handleDateSelect({ start: event.start, end: event.end })
          }
          dayPropGetter={dayPropGetter}
          eventPropGetter={eventStyleGetter}
          style={{ height: 500 }}
          toolbar
          components={{
            toolbar: CustomToolbar,
          }}
          defaultView="month"
          views={["month"]}
          longPressThreshold={10} // Adjust to make it more sensitive to touch
        />

        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Enter price for selected dates"
        />
        <button onClick={updateSelectedDatesPrice}>Update Price</button>
        <button onClick={clearSelection}>Clear Selection</button>
      </div>
    </div>
  );
};

export default Admin;
