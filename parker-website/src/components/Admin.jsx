import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/admin.scss";

const Admin = ({ onLogout }) => {
  const localizer = momentLocalizer(moment);
  const [standardPrice, setStandardPrice] = useState("");
  const [datePrices, setDatePrices] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [propertyInfo, setPropertyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get auth data from localStorage
  const token = localStorage.getItem("token");
  const propertyId = localStorage.getItem("propertyId");
  const displayName = localStorage.getItem("displayName");

  useEffect(() => {
    // Set property info
    setPropertyInfo({
      id: propertyId,
      displayName: displayName || propertyId || "Admin",
    });

    fetchPrices();
  }, []);

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const handleAuthError = (response) => {
    if (response.status === 401 || response.status === 403) {
      // Token expired or invalid - trigger logout
      onLogout();
      return true;
    }
    return false;
  };

  const fetchPrices = () => {
    setIsLoading(true);
    // Use propertyId in URL if available, otherwise let backend use default
    const url = propertyId ? `/api/prices/${propertyId}` : "/api/prices";

    fetch(url, {
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then((data) => {
        if (data) {
          setStandardPrice(data.standardPrice);
          setDatePrices(data.datePrices);
        }
      })
      .catch((err) => console.error("Error fetching prices:", err))
      .finally(() => setIsLoading(false));
  };

  const handleDateSelect = ({ start, end }) => {
    console.log("Selection start:", start, "end:", end);
    const startDate = moment(start).startOf("day");
    const endDate = moment(end).startOf("day").subtract(1, "seconds");

    const selectedRange = [];
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate)) {
      selectedRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    setSelectedDates((prevSelectedDates) => {
      const updatedSelection = new Set(prevSelectedDates);

      selectedRange.forEach((date) => {
        if (updatedSelection.has(date)) {
          updatedSelection.delete(date);
        } else {
          updatedSelection.add(date);
        }
      });

      return Array.from(updatedSelection);
    });
  };

  const clearSelection = () => setSelectedDates([]);

  const updateStandardPrice = () => {
    const url = propertyId
      ? `/api/prices/standard/${propertyId}`
      : "/api/prices/standard";

    fetch(url, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ price: standardPrice }),
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then(() => {
        alert("Standard price updated!");
        fetchPrices();
      })
      .catch((err) => console.error("Error updating standard price:", err));
  };

  const updateSelectedDatesPrice = () => {
    if (!selectedDates.length || !newPrice) {
      alert("Select dates and enter a price.");
      return;
    }

    const url = propertyId
      ? `/api/prices/date-range/${propertyId}`
      : "/api/prices/date-range";

    fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        dates: selectedDates,
        price: newPrice,
      }),
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then((data) => {
        if (data) {
          setDatePrices(data.datePrices);
          setSelectedDates([]);
          setNewPrice("");
        }
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
        pointerEvents: "none",
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
        <span className="rbc-toolbar-label">{toolbar.label}</span>
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

  if (isLoading) {
    return (
      <div className="admin-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin - {propertyInfo?.displayName}</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

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
        <p className="help-text">
          Click and drag to select dates. Selected dates will turn blue.
        </p>
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
          longPressThreshold={10}
        />

        <div className="price-controls">
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="Enter price for selected dates"
          />
          <button onClick={updateSelectedDatesPrice}>Update Price</button>
          <button onClick={clearSelection}>Clear Selection</button>
        </div>

        {selectedDates.length > 0 && (
          <p className="selection-info">
            {selectedDates.length} date{selectedDates.length !== 1 ? "s" : ""}{" "}
            selected
          </p>
        )}
      </div>
    </div>
  );
};

export default Admin;
