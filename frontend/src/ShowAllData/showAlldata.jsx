import React, { useState } from "react";
import axios from "axios";
import './showAllData.css';

function ShowAllData() {
  const [records, setRecords] = useState([]);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const fetchRecords = async () => {
    try {
      const response = await axios.post("${apiUrl}/api/get-love-data", {
        enteredPassword: password,
      });

      setRecords(response.data);
      setAuthenticated(true);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch data");
      setAuthenticated(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecords();
  };

  // 🧹 Function to delete a particular record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return; // user cancelled
    }

    try {
      await axios.delete(`${apiUrl}/api/delete-love/${id}`);
      setRecords(records.filter(record => record._id !== id)); // Remove deleted record from local state
    } catch (err) {
      console.error(err);
      alert("Failed to delete record");
    }
  };

  return (
    <div className="table-container">
      {!authenticated ? (
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Enter Password to View Records</h2>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          />
          <button type="submit" className="submit-btn">Check</button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      ) : (
        <>
          <h2>All Love Records</h2>
          <table className="love-table">
            <thead>
              <tr>
                <th>Your Name</th>
                <th>Partner Name</th>
                <th>Date</th>
                <th>Action</th> {/* New column for Delete button */}
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.yourName}</td>
                  <td>{record.partnerName}</td>
                  <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(record._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ShowAllData;
