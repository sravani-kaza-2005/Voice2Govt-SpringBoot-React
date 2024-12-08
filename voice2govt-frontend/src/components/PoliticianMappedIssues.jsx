import React, { useState, useEffect } from "react";
import axios from "axios";

const PoliticianMappedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  const username = JSON.parse(localStorage.getItem("user"))?.username; // Get the username from localStorage

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        if (!username) {
          setError("Politician username is not available. Please log in again.");
          return;
        }

        const response = await axios.get(`http://localhost:9728/api/politicians/${username}/issues`);
        setIssues(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch issues.");
      }
    };

    fetchIssues();
  }, [username]);

  return (
    <div className="container mt-5">
      <h2>Issues Mapped to Politician</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {issues.length > 0 ? (
        <div className="row">
          {issues.map((issue) => (
            <div className="col-md-4" key={issue.id}>
              <div className="card mb-3">
                <div className="card-header">
                  <h5>Issue #{issue.id}</h5>
                </div>
                <div className="card-body">
                  <p><strong>Citizen:</strong> {issue.citizen?.ctiUsername || "N/A"}</p>
                  <p><strong>Description:</strong> {issue.issueDescription}</p>
                  <p><strong>Status:</strong> {issue.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No issues found for this politician.</p>
      )}
    </div>
  );
};

export default PoliticianMappedIssues;
