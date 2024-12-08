import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import custom CSS for styling

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ admUsername: '', admPassword: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [adminName, setAdminName] = useState('');
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9728/api/admins/login', credentials);
      setSuccess(response.data.message);
      setError(null);
      setAdminName(response.data.adminName);
      setShowWelcomePopup(true);
      setTimeout(() => {
        navigate('/admin-home');
        setShowWelcomePopup(false);
      }, 2000);
    } catch (error) {
      setError('Invalid username or password.');
      setSuccess(null);
    }
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="container mt-5">
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="admUsername"
                value={credentials.admUsername}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="admPassword"
                value={credentials.admPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>

          {/* Register Link */}
          <div className="mt-3">
            <p>Don't have an account? <a href="/adm-register" className="btn btn-link">Register here</a></p>
          </div>
        </div>

        {/* Welcome Message Pop-up */}
        {showWelcomePopup && (
          <div className="popup-overlay show">
            <div className="popup-message">
              <h3>Welcome Back, {adminName}!</h3>
              <p>You have successfully logged in.</p>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default AdminLogin;
