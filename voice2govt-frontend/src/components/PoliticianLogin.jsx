import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PoliticianLogin = () => {
  const [formData, setFormData] = useState({
    polUsername: '', // Ensure these keys match backend
    polPassword: ''
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
      const response = await axios.post('http://localhost:9728/api/politicians/login', formData);
      if (response.status === 200) {
        // Save user data in localStorage for session persistence
        localStorage.setItem('user', JSON.stringify({
          // politicianId: pol_id,
          username: formData.polUsername,
          type: 'politician'
        }));
        navigate('/politician-home'); // Redirect on successful login
      }
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Politician Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="polUsername" // Match backend field name
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
            name="polPassword" // Match backend field name
            value={formData.polPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-3">
        <p>Don't have an account? <a href="/politician-register" className="btn btn-link">Register here</a></p>
      </div>
    </div>
  );
};

export default PoliticianLogin;
