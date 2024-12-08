import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    const token = sessionStorage.getItem('token'); // Check for token to confirm login

    if (firstName && lastName && token) {
      setAdminName(`${firstName} ${lastName}`);
      setLoading(false);
    } else {
      navigate('/'); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear session data on logout
    sessionStorage.clear();
    navigate('/'); // Redirect to login page after logging out
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {adminName}</h2>
      <div className="mt-4">
        <p>Here is your admin dashboard. You can manage users, view statistics, and more.</p>
        {/* Add more dashboard content here */}
        <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
