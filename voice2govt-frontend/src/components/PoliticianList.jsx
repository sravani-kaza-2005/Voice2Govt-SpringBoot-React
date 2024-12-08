import React, { useEffect, useState } from "react";
import axios from "axios";

const PoliticianList = () => {
  const [politicians, setPoliticians] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const response = await axios.get("http://localhost:9728/api/admins/politicians");
        console.log(response.data);  // Log the response to check the structure
        const politiciansData = Array.isArray(response.data) ? response.data : [];  // Ensure it's an array
        setPoliticians(politiciansData);
      } catch (error) {
        setError('Error fetching politician data.');
        console.error(error);  // Log the error to the console for debugging
      }
    };
    fetchPoliticians();
  }, []);

  return (
    <div>
      <h2>Politician List</h2>
      {error && <p>{error}</p>}
      {Array.isArray(politicians) && politicians.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Username</th>
              <th>Date of Birth</th>
              <th>Constituency</th>
            </tr>
          </thead>
          <tbody>
            {politicians.map(politician => (
              <tr key={politician.pol_id}>
                <td>{politician.pol_id}</td>
                <td>{politician.pol_firstName}</td>
                <td>{politician.pol_lastName}</td>
                <td>{politician.pol_email}</td>
                <td>{politician.pol_phoneNumber}</td>
                <td>{politician.polUsername}</td>
                <td>{politician.pol_dob}</td>
                <td>{politician.polConstituency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No politicians found.</p>
      )}
    </div>
  );
};

export default PoliticianList;
