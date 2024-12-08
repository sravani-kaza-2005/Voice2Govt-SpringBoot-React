import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CitizenRegister = () => {
  const [formData, setFormData] = useState({
    cti_firstName: '',
    cti_lastName: '',
    cti_email: '',
    cti_phoneNumber: '',
    cti_dob: '',
    ctiUsername: '',
    ctiPassword: '',
    ctiConstituency: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:9728/api/citizens/register', formData);
      if (response.status === 201) {
        // On successful registration, redirect the user to login page or home page
        navigate('/citizen-login'); 
      }
    } catch (error) {
      setError('There was an error during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Citizen Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="cti_firstName"
            value={formData.cti_firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="cti_lastName"
            value={formData.cti_lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="cti_email"
            value={formData.cti_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="cti_phoneNumber"
            value={formData.cti_phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="cti_dob"
            value={formData.cti_dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="ctiUsername"
            value={formData.ctiUsername}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="ctiPassword"
            value={formData.ctiPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Constituency</label>
          <input
            type="text"
            className="form-control"
            name="ctiConstituency"
            value={formData.ctiConstituency}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-3">
        <p>Already have an account? <a href="/citizen-login" className="btn btn-link">Login here</a></p>
      </div>
    </div>
  );
};

export default CitizenRegister;
