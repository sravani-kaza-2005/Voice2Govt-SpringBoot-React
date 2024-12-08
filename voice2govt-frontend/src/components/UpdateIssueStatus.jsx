import React, { useState } from "react";
import axios from "axios";

const UpdateIssueStatus = ({ politicianId, issueId }) => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9728/api/politicians/${politicianId}/issues/${issueId}/status`, status, {
        headers: { "Content-Type": "text/plain" },
      });
      setMessage("Status updated successfully");
    } catch (error) {
      setMessage(error.response?.data || "Failed to update status");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Update Issue Status</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Status</label>
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">Update Status</button>
        </form>
        {message && <p className="mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateIssueStatus;
