
// export default AdminHome;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css'; // Import CSS for styling
import axios from 'axios'; // For making API requests

const AdminHome = ({ adminName }) => {
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [showPoliticianPopup, setShowPoliticianPopup] = useState(false);
  const [showCitizenPopup, setShowCitizenPopup] = useState(false);
  const [admins, setAdmins] = useState([]);  // State for storing admins list
  const [citizens, setCitizens] = useState([]);  // State for storing citizens list
  const [politicians, setPoliticians] = useState([]);  // State for storing politicians list
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/adm-login'); // Redirect to login page on logout
  };

  const handleAdminClick = () => {
    setShowAdminPopup(true);
  };

  const handlePoliticianClick = () => {
    setShowPoliticianPopup(true);
  };

  const handleCitizenClick = () => {
    setShowCitizenPopup(true);
  };

  const handleClosePopup = () => {
    setShowAdminPopup(false);
    setShowPoliticianPopup(false);
    setShowCitizenPopup(false);
  };

  // Fetch admins list from backend API
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('/api/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  // Fetch citizens list from backend API
  const fetchCitizens = async () => {
    try {
      const response = await axios.get('/api/admins/citizens');
      setCitizens(response.data);
    } catch (error) {
      console.error('Error fetching citizens:', error);
    }
  };

  // Fetch politicians list from backend API
  const fetchPoliticians = async () => {
    try {
      const response = await axios.get('/api/admins/politicians');
      setPoliticians(response.data);
    } catch (error) {
      console.error('Error fetching politicians:', error);
    }
  };

  const handleCreateAdmin = () => {
    navigate('/adm-register');
    setShowAdminPopup(false);
  };

  const handleCreateCitizen = () => {
    navigate('/citizen-register');
    setShowCitizenPopup(false);
  };

  const handleCreatePolitician = () => {
    navigate('/politician-register');
    setShowPoliticianPopup(false);
  };

  // View Admins
  const handleViewAdmins = () => {
    fetchAdmins(); // Fetch admins
    navigate('/adminlist', { state: { admins } }); // Navigate to Admin List page
    setShowAdminPopup(false);
  };

  // View Citizens
  const handleViewCitizens = () => {
    fetchCitizens(); // Fetch citizens
    navigate('/citizen-list', { state: { citizens } }); // Navigate to Citizen List page
    setShowCitizenPopup(false);
  };

  // View Politicians
  const handleViewPoliticians = () => {
    fetchPoliticians(); // Fetch politicians
    navigate('/politician-list', { state: { politicians } }); // Navigate to Politician List page
    setShowPoliticianPopup(false);
  };

  return (
    <div className="admin-home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Welcome Section */}
      <header className="welcome-section">
        <h1>Welcome, {adminName}!</h1>
        <p>Manage the portal and keep track of all activities efficiently.</p>
      </header>

      {/* Actions Section */}
      <div className="actions-container">
        {/* Admin Card */}
        <div className="action-card" onClick={handleAdminClick}>
          <h3>Admin</h3>
          <p>Manage admins and related actions.</p>
        </div>

        {/* Politician Card */}
        <div className="action-card" onClick={handlePoliticianClick}>
          <h3>Politician</h3>
          <p>View and manage politician details.</p>
        </div>

        {/* Citizen Card */}
        <div className="action-card" onClick={handleCitizenClick}>
          <h3>Citizen</h3>
          <p>Manage citizen complaints, feedback, and suggestions.</p>
        </div>
      </div>

      {/* Admin Actions Popup */}
      {showAdminPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Admin Actions</h3>
            <ul>
              <li onClick={handleCreateAdmin}>Create Admin</li>
              <li onClick={handleViewAdmins}>View Admins</li>
              <li>Edit Admin</li>
              <li>Delete Admin</li>
            </ul>
            <button className="close-popup" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Politician Actions Popup */}
      {showPoliticianPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Politician Actions</h3>
            <ul>
              <li onClick={handleCreatePolitician}>Create Politician</li>
              <li onClick={handleViewPoliticians}>View Politicians</li>
              <li>Edit Politician</li>
              <li>Delete Politician</li>
            </ul>
            <button className="close-popup" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Citizen Actions Popup */}
      {showCitizenPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Citizen Actions</h3>
            <ul>
              <li onClick={handleCreateCitizen}>Create Citizen</li>
              <li onClick={handleViewCitizens}>View Citizens</li>
              <li>Edit Citizen</li>
              <li>Delete Citizen</li>
            </ul>
            <button className="close-popup" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
