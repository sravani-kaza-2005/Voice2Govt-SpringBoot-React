import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PoliticianLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove politician from localStorage on logout
    localStorage.removeItem('user');
    navigate('/politician-login'); // Redirect to login page
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Logging out...</h2>
    </div>
  );
};

export default PoliticianLogout;
