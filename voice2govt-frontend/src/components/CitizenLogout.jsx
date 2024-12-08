import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user from localStorage on logout
    localStorage.removeItem('user');
    navigate('/citizen-login');  // Redirect to login page
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
