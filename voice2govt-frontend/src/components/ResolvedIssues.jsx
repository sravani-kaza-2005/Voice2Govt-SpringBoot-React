import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResolvedIssues = () => {
  const { politicianId } = useParams();
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResolvedIssues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9728/api/politicians/${politicianId}/issues/resolved`
        );
        setResolvedIssues(response.data);
      } catch (err) {
        setError("Failed to load resolved issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchResolvedIssues();
  }, [politicianId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Resolved Issues</h2>
      {loading && <p>Loading resolved issues...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="list-group">
          {resolvedIssues.length > 0 ? (
            resolvedIssues.map((issue) => (
              <div key={issue.id} className="list-group-item">
                <h5>{issue.title}</h5>
                <p>{issue.description}</p>
                <small className="text-muted">Status: {issue.status}</small>
              </div>
            ))
          ) : (
            <p>No resolved issues found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResolvedIssues;
