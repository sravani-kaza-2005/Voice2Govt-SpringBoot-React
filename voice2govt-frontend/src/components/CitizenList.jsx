import React, { useEffect, useState } from "react";
import axios from "axios";

const CitizenList = () => {
  const [citizens, setCitizens] = useState([]);
  const [error, setError] = useState(''); // Error state

  // Fetch citizens when the component mounts
  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        const response = await axios.get("http://localhost:9728/api/admins/citizens"); // Corrected the URL
        setCitizens(response.data);
      } catch (error) {
        setError("Error fetching citizens.");
        console.error("Error fetching citizens:", error);
      }
    };
    fetchCitizens();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Citizen List</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Show error if there is any */}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>Username</th>
            <th>Constituency</th>
          </tr>
        </thead>
        <tbody>
          {citizens.length > 0 ? (
            citizens.map((citizen) => (
              <tr key={citizen.cti_id}> {/* Use cti_id as the key */}
                <td>{citizen.cti_firstName}</td>
                <td>{citizen.cti_lastName}</td>
                <td>{citizen.cti_email}</td>
                <td>{citizen.cti_phoneNumber}</td>
                <td>{citizen.cti_dob}</td>
                <td>{citizen.ctiUsername}</td>
                <td>{citizen.ctiConstituency}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No citizens available</td> {/* Display message if no citizens */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitizenList;
