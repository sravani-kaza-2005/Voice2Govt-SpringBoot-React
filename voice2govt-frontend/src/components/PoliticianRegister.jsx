import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PoliticianRegister = () => {
  const [formData, setFormData] = useState({
    pol_firstName: '',
    pol_lastName: '',
    pol_email: '',
    pol_phoneNumber: '',
    pol_dob: '',
    polUsername: '',
    polPassword: '',
    polConstituency: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:9728/api/politicians/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Registration successful! Redirecting to login page...');
        setTimeout(() => navigate('/politician-login'), 2000); // Redirect to the login page after 2 seconds
      }
    } catch (err) {
      setError(err.response?.data || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Politician Registration</h2>

      {/* Success or Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="pol_firstName"
            value={formData.pol_firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="pol_lastName"
            value={formData.pol_lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="pol_email"
            value={formData.pol_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="pol_phoneNumber"
            value={formData.pol_phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="pol_dob"
            value={formData.pol_dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="polUsername"
            value={formData.polUsername}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="polPassword"
            value={formData.polPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Constituency</label>
          <input
            type="text"
            className="form-control"
            name="polConstituency"
            value={formData.polConstituency}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-3">
        <p>
          Already have an account? <a href="/politician-login" className="btn btn-link">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default PoliticianRegister;
