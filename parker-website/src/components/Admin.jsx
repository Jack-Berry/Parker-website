import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../css/admin.scss";

const Admin = () => {
  const [standardPrice, setStandardPrice] = useState("");
  const [datePrices, setDatePrices] = useState([]);
  const [newRange, setNewRange] = useState({ startDate: "", endDate: "" });
  const [newPrice, setNewPrice] = useState("");

  // Format date to UK style
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Fetch prices from the server
  useEffect(() => {
    fetch("/api/prices")
      .then((res) => res.json())
      .then((data) => {
        setStandardPrice(data.standardPrice);
        setDatePrices(data.datePrices);
        console.log("Fetched Data:", data);
      })
      .catch((err) => console.error("Error fetching prices:", err));
  }, []);

  // Handle standard price update
  const updateStandardPrice = () => {
    fetch("/api/prices/standard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: standardPrice }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Standard price updated!");
      })
      .catch((err) => console.error("Error updating standard price:", err));
  };

  // Add or update a date-specific price
  const addOrUpdateDatePrice = () => {
    fetch("/api/prices/date-range", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: newRange.startDate,
        endDate: newRange.endDate,
        price: newPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDatePrices(data.datePrices); // Update the UI with the new list
        setNewRange({ startDate: "", endDate: "" });
        setNewPrice("");
        // alert("Date range price updated!");
      })
      .catch((err) => console.error("Error updating date price:", err));
  };

  // Delete a date-specific price
  const deleteDateRangePrice = (id) => {
    fetch(`/api/prices/date-range/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setDatePrices(data.datePrices); // Update the UI with the new list
        // alert("Date-specific price removed!");
      })
      .catch((err) => console.error("Error deleting date price:", err));
  };

  console.log("Fetched Date Prices:", datePrices);
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

      <div className="date-prices-section">
        <h2>Date-Specific Prices</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datePrices.map((price) => (
              <tr key={price.id}>
                <td>{formatDate(price.date)}</td>
                <td>£{Number(price.price).toFixed(2) || "N/A"}</td>
                <td>
                  <button onClick={() => deleteDateRangePrice(price.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Add/Update Date-Specific Price</h3>
        <input
          type="date"
          value={newRange.startDate}
          onChange={(e) =>
            setNewRange((prev) => ({ ...prev, startDate: e.target.value }))
          }
        />
        <input
          type="date"
          value={newRange.endDate}
          onChange={(e) =>
            setNewRange((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button onClick={addOrUpdateDatePrice}>Add/Update Price</button>
      </div>
      <Nav />
    </div>
  );
};

export default Admin;
