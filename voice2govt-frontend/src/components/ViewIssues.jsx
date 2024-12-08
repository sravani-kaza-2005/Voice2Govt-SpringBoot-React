import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewIssues = () => {
  const location = useLocation();
  const { username } = location.state; // Retrieve username from state
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`http://localhost:9728/api/citizenissues/citizen/view/${username}`);
        setIssues(response.data);
      } catch (err) {
        setError('Failed to fetch issues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [username]);

  if (loading) {
    return <p>Loading issues...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="view-issues-container">
      <h2>My Issues</h2>
      {issues.length > 0 ? (
        <ul className="issues-list">
          {issues.map((issue) => (
            <li key={issue.issueId} className="issue-item">
              <h3>Issue ID: {issue.issueId}</h3>
              <p><strong>Description:</strong> {issue.issueDescription}</p>
              <p><strong>Status:</strong> {issue.status}</p>
              <p><strong>Politician:</strong> {issue.politician.polName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
};

export default ViewIssues;