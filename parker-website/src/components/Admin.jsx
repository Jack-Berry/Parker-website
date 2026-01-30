import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/admin.scss";

const Admin = ({ onLogout }) => {
  const localizer = momentLocalizer(moment);
  const [standardPrice, setStandardPrice] = useState("");
  const [weekendPrice, setWeekendPrice] = useState("");
  const [datePrices, setDatePrices] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [propertyInfo, setPropertyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [monthFilter, setMonthFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");

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

    // Clean up old prices if authenticated, then fetch current prices
    if (token) {
      cleanupOldPrices()
        .catch((err) => {
          // Silently fail if cleanup errors - not critical
          console.log("Cleanup skipped:", err);
        })
        .finally(() => {
          // Always fetch prices regardless of cleanup success
          fetchPrices();
        });
    } else {
      // No token yet, just fetch prices
      fetchPrices();
    }
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

  const cleanupOldPrices = async () => {
    const url = propertyId
      ? `/api/prices/cleanup/${propertyId}`
      : "/api/prices/cleanup";

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!handleAuthError(response)) {
        const data = await response.json();
        console.log("Cleaned up old prices:", data);
      }
    } catch (err) {
      console.error("Error cleaning up old prices:", err);
    }
  };

  const fetchPrices = () => {
    setIsLoading(true);
    // Use propertyId in URL if available, otherwise let backend use default
    const url = propertyId ? `/api/prices/${propertyId}` : "/api/prices";

    // Add timestamp to prevent caching
    const cacheBuster = `?t=${Date.now()}`;

    fetch(url + cacheBuster, {
      headers: {
        ...getAuthHeaders(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then((data) => {
        if (data) {
          setStandardPrice(data.standardPrice);
          setWeekendPrice(data.weekendPrice || data.standardPrice);
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
        // Small delay to ensure DB commit, then fetch fresh data
        setTimeout(() => fetchPrices(), 300);
      })
      .catch((err) => console.error("Error updating standard price:", err));
  };

  const updateWeekendPrice = () => {
    const url = propertyId
      ? `/api/prices/weekend/${propertyId}`
      : "/api/prices/weekend";

    fetch(url, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ price: weekendPrice }),
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then(() => {
        alert("Weekend price updated!");
        setTimeout(() => fetchPrices(), 300);
      })
      .catch((err) => console.error("Error updating weekend price:", err));
  };

  const clearMonthPrices = () => {
    const monthYear = currentMonth.format("YYYY-MM");
    const confirmMsg = `Delete all custom prices for ${currentMonth.format("MMMM YYYY")}?`;

    if (!window.confirm(confirmMsg)) return;

    const url = propertyId
      ? `/api/prices/clear-month/${propertyId}/${monthYear}`
      : `/api/prices/clear-month/${monthYear}`;

    fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then(() => {
        alert(`Cleared all prices for ${currentMonth.format("MMMM YYYY")}`);
        setTimeout(() => fetchPrices(), 300);
      })
      .catch((err) => console.error("Error clearing month:", err));
  };

  const deleteSingleDate = (date) => {
    if (
      !window.confirm(
        `Delete custom price for ${moment(date).format("DD/MM/YYYY")}?`,
      )
    )
      return;

    const url = propertyId
      ? `/api/prices/${propertyId}/${date}`
      : `/api/prices/${date}`;

    fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then(() => {
        setTimeout(() => fetchPrices(), 300);
      })
      .catch((err) => console.error("Error deleting date:", err));
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
      const dayOfWeek = currentDate.day(); // 0 = Sunday, 5 = Friday, 6 = Saturday

      // Use custom price if exists, otherwise weekend price for Fri/Sat, otherwise standard
      let price;
      if (dateMap[formattedDate]) {
        price = dateMap[formattedDate];
      } else if (dayOfWeek === 5 || dayOfWeek === 6) {
        price = weekendPrice || standardPrice;
      } else {
        price = standardPrice;
      }

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
    // Update current month when user navigates
    const handleNavigate = (action) => {
      toolbar.onNavigate(action);
      if (action === "PREV") {
        setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
      } else if (action === "NEXT") {
        setCurrentMonth((prev) => prev.clone().add(1, "month"));
      }
    };

    return (
      <div className="rbc-toolbar">
        <button
          type="button"
          className="rbc-btn"
          onClick={() => handleNavigate("PREV")}
        >
          Previous
        </button>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <button
          type="button"
          className="rbc-btn"
          onClick={() => handleNavigate("NEXT")}
        >
          Next
        </button>
      </div>
    );
  };

  const dayPropGetter = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isSelected = selectedDates.includes(formattedDate);
    const dayOfWeek = moment(date).day();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hasCustomPrice = datePrices.some(
      (dp) => moment(dp.date).format("YYYY-MM-DD") === formattedDate,
    );

    return {
      style: {
        backgroundColor: isSelected
          ? "lightblue"
          : hasCustomPrice
            ? "#e3f2fd"
            : isWeekend
              ? "#fff9e6"
              : "inherit",
        border: isSelected ? "1px solid blue" : "none",
        cursor: "pointer",
      },
    };
  };

  // Get unique months from datePrices
  const getAvailableMonths = () => {
    const months = new Set();
    datePrices.forEach((item) => {
      const monthYear = moment(item.date).format("YYYY-MM");
      months.add(monthYear);
    });
    return Array.from(months).sort();
  };

  // Filter and sort custom dates
  const getFilteredAndSortedDates = () => {
    let filtered = [...datePrices];

    // Filter by month
    if (monthFilter !== "all") {
      filtered = filtered.filter(
        (item) => moment(item.date).format("YYYY-MM") === monthFilter,
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);

      switch (sortBy) {
        case "date-asc":
          return dateA.diff(dateB);
        case "date-desc":
          return dateB.diff(dateA);
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        default:
          return dateA.diff(dateB);
      }
    });

    return filtered;
  };

  const clearSelectedMonth = () => {
    if (monthFilter === "all") return;

    const monthName = moment(monthFilter, "YYYY-MM").format("MMMM YYYY");
    const confirmMsg = `Delete all custom prices for ${monthName}?`;

    if (!window.confirm(confirmMsg)) return;

    const url = propertyId
      ? `/api/prices/clear-month/${propertyId}/${monthFilter}`
      : `/api/prices/clear-month/${monthFilter}`;

    fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (handleAuthError(res)) return;
        return res.json();
      })
      .then(() => {
        alert(`Cleared all prices for ${monthName}`);
        setMonthFilter("all");
        setTimeout(() => fetchPrices(), 300);
      })
      .catch((err) => console.error("Error clearing month:", err));
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
        <div className="header-buttons">
          <button
            onClick={() => (window.location.href = "/")}
            className="home-btn"
          >
            Home
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="pricing-section">
        <h2>Base Pricing</h2>
        <div className="pricing-row">
          <div className="pricing-input-group">
            <label htmlFor="standard-price">Standard Price</label>
            <input
              id="standard-price"
              type="number"
              value={standardPrice}
              onChange={(e) => setStandardPrice(e.target.value)}
            />
            <button onClick={updateStandardPrice}>Update</button>
          </div>

          <div className="pricing-input-group">
            <label htmlFor="weekend-price">Weekend Price (Fri/Sat)</label>
            <input
              id="weekend-price"
              type="number"
              value={weekendPrice}
              onChange={(e) => setWeekendPrice(e.target.value)}
            />
            <button onClick={updateWeekendPrice}>Update</button>
          </div>
        </div>
      </div>

      <div className="calendar-section">
        <div className="calendar-header">
          <h2>Manage Prices</h2>
          <button onClick={clearMonthPrices} className="clear-month-btn">
            Clear {currentMonth.format("MMMM")} Prices
          </button>
        </div>
        <p className="help-text">
          Click and drag to select dates. Selected dates will turn blue.
          <span className="color-legend">
            <span className="legend-item">
              <span className="color-box weekend"></span>Weekend dates (yellow)
            </span>
            <span className="legend-item">
              <span className="color-box custom"></span>Custom priced dates
              (light blue)
            </span>
          </span>
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
          culture="en-GB"
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

      <div className="custom-dates-section">
        <div className="custom-dates-header">
          <h2>Custom Date Prices ({datePrices.length})</h2>
          <div className="custom-dates-controls">
            <div className="filter-group">
              <label htmlFor="month-filter">Filter by Month:</label>
              <select
                id="month-filter"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                {getAvailableMonths().map((month) => {
                  const count = datePrices.filter(
                    (d) => moment(d.date).format("YYYY-MM") === month,
                  ).length;
                  return (
                    <option key={month} value={month}>
                      {moment(month, "YYYY-MM").format("MMMM YYYY")} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-by">Sort by:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-asc">Date (Oldest First)</option>
                <option value="date-desc">Date (Newest First)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="price-low">Price (Low to High)</option>
              </select>
            </div>

            {monthFilter !== "all" && (
              <button
                onClick={clearSelectedMonth}
                className="clear-filtered-month-btn"
              >
                Clear {moment(monthFilter, "YYYY-MM").format("MMMM")}
              </button>
            )}
          </div>
        </div>

        {datePrices.length === 0 ? (
          <p>No custom date prices set</p>
        ) : (
          <>
            {monthFilter !== "all" && (
              <p className="filter-summary">
                Showing {getFilteredAndSortedDates().length} dates in{" "}
                {moment(monthFilter, "YYYY-MM").format("MMMM YYYY")}
              </p>
            )}
            <div className="dates-list">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredAndSortedDates().map((item) => {
                    const date = moment(item.date);
                    const isWeekend = date.day() === 0 || date.day() === 6;
                    return (
                      <tr
                        key={item.date}
                        className={isWeekend ? "weekend-row" : ""}
                      >
                        <td>{date.format("DD/MM/YYYY")}</td>
                        <td>{date.format("ddd")}</td>
                        <td>£{item.price}</td>
                        <td>
                          <button
                            onClick={() => deleteSingleDate(item.date)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
