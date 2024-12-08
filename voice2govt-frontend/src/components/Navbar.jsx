import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  // Check localStorage for user data on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username); // Extract username from the stored data
    } else {
      setIsAuthenticated(false); // No user logged in
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage on logout
    setIsAuthenticated(false); // Update state to reflect logged out status
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Voice2Govt</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* Login Dropdown if not authenticated */}
            {!isAuthenticated ? (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Login
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/adm-login">Admin Login</Link></li>
                  <li><Link className="dropdown-item" to="/citizen-login">Citizen Login</Link></li>
                  <li><Link className="dropdown-item" to="/politician-login">Politician Login</Link></li>
                </ul>
              </li>
            ) : (
              // Citizen Navbar after login
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {username}!</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
