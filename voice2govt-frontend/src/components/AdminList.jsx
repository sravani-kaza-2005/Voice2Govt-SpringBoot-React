import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:9728/api/admins');
        setAdmins(response.data);
      } catch (error) {
        setError('Error fetching admin data.');
      }
    };
    
    fetchAdmins();
  }, []);

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}

      <h2 className="mb-4">Admin List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Username</th>
            {/* <th>Role</th> */}
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.adm_id}</td>
              <td>{admin.adm_firstName}</td>
              <td>{admin.adm_lastName}</td>
              <td>{admin.adm_email}</td>
              <td>{admin.adm_phoneNumber}</td> {/* New field */}
              <td>{admin.admUsername}</td> {/* New field */}
              {/* <td>{admin.adm_role}</td> New field */}
              <td>{admin.adm_dob}</td> {/* New field */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
