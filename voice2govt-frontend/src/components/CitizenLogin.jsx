import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CitizenLogin = () => {
  const [formData, setFormData] = useState({
    ctiUsername: '',
    ctiPassword: ''
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
      const response = await axios.post('http://localhost:9728/api/citizens/login', formData);
      if (response.status === 200) {
        // Save user data in localStorage on successful login
        localStorage.setItem('user', JSON.stringify({ username: formData.ctiUsername, type: 'citizen' }));
        navigate('/citizen-home'); // Redirect to Citizen Home
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Citizen Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-3">
        <p>Don't have an account? <a href="/citizen-register" className="btn btn-link">Register here</a></p>
      </div>
    </div>
  );
};

export default CitizenLogin;
