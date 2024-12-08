import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditAdmin = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:9728/api/admins/${id}`);
        setAdmin(response.data);
      } catch (error) {
        setError('Error fetching admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9728/api/admins/${id}`, admin);
      setError(null);
      setAdmin({ ...admin, success: 'Admin updated successfully!' });
    } catch (error) {
      setError('Error updating admin data.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Edit Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="adm_firstName"
            value={admin.adm_firstName || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Repeat for other fields like last name, email, etc. */}
        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
};

export default EditAdmin;
