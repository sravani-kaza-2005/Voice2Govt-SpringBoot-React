import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateIssues = () => {
  const { politicianId } = useParams(); // Retrieve the politician ID from the route
  const [issues, setIssues] = useState([]); // List of issues
  const [statusUpdates, setStatusUpdates] = useState({}); // Track status changes

  useEffect(() => {
    // Fetch in-progress issues for the politician
    axios
      .get(`http://localhost:9728/api/politicians/${politicianId}/issues/inprogress`)
      .then((response) => {
        setIssues(response.data);
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, [politicianId]);

  const handleStatusUpdate = (issueId) => {
    const newStatus = statusUpdates[issueId];
    if (!newStatus) {
      alert("Please select a status before updating.");
      return;
    }

    axios
      .put(
        `http://localhost:9728/api/politicians/${politicianId}/issues/${issueId}/status`,
        { status: newStatus }
      )
      .then(() => {
        alert("Issue status updated successfully!");
        // Update the issue locally
        setIssues((prevIssues) =>
          prevIssues.map((issue) =>
            issue.id === issueId ? { ...issue, status: newStatus } : issue
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div className="container mt-5">
      <h2>Update In-Progress Issues</h2>
      {issues.length === 0 ? (
        <p>No in-progress issues found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Description</th>
              <th>Constituency</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.description}</td>
                <td>{issue.constituency}</td>
                <td>{issue.status}</td>
                <td>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setStatusUpdates({ ...statusUpdates, [issue.id]: e.target.value })
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleStatusUpdate(issue.id)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UpdateIssues;
