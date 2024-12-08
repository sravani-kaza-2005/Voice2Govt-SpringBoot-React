// import React, { useState } from 'react';
// import './CitizenHome.css'; // CitizenHome styles
// import CreateCitizenIssue from './CreateCitizenIssue'; // Import the CreateCitizenIssue component

// const CitizenHome = () => {
//   const [showCreateIssue, setShowCreateIssue] = useState(false); // State to toggle Create Issue view

//   const handleCreateIssueClick = () => {
//     setShowCreateIssue(true); // Show the Create Issue form
//   };

//   return (
//     <div className="citizen-home-container">
//       {/* Hero Section with Abstract Design */}
//       <header className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">Make Your Voice Heard!</h1>
//           <p className="hero-subtitle">Your actions can shape a better future.</p>
//         </div>
//       </header>

//       {/* Main Actions */}
//       {!showCreateIssue ? (
//         <div className="actions">
//           <h2 className="actions-title">What would you like to do today?</h2>
//           <div className="action-cards">
//             <div className="card">
//               <i className="card-icon fas fa-clipboard-list"></i>
//               <h3>Create Issue</h3>
//               <p>Raise concerns or issues that require government attention.</p>
//               <button className="card-button" onClick={handleCreateIssueClick}>
//                 Get Started
//               </button>
//             </div>
//             <div className="card">
//               <i className="card-icon fas fa-comments"></i>
//               <h3>View Feedback</h3>
//               <p>Explore feedback shared by other citizens.</p>
//               <button className="card-button" onClick={() => alert('View Feedback')}>
//                 View Now
//               </button>
//             </div>
//             <div className="card">
//               <i className="card-icon fas fa-bell"></i>
//               <h3>Check Updates</h3>
//               <p>Stay up to date with the latest developments.</p>
//               <button className="card-button" onClick={() => alert('Check Updates')}>
//                 Check Now
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="create-issue-section">
//           <CreateCitizenIssue />
//           <button
//             className="back-button"
//             onClick={() => setShowCreateIssue(false)} // Go back to the main actions
//           >
//             Back to Actions
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CitizenHome;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CitizenHome.css';
import CreateCitizenIssue from './CreateCitizenIssue';

const CitizenHome = () => {
  const [showCreateIssue, setShowCreateIssue] = useState(false);
  const navigate = useNavigate();

  const handleCreateIssueClick = () => {
    setShowCreateIssue(true);
  };

  const handleViewIssuesClick = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve logged-in user from localStorage
    if (user && user.username) {
      navigate('/view-issues', { state: { username: user.username } });
       // Navigate to ViewIssues page with username
    } else {
      alert('User not logged in.');
    }
  };

  return (
    <div className="citizen-home-container">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Make Your Voice Heard!</h1>
          <p className="hero-subtitle">Your actions can shape a better future.</p>
        </div>
      </header>

      {!showCreateIssue ? (
        <div className="actions">
          <h2 className="actions-title">What would you like to do today?</h2>
          <div className="action-cards">
            <div className="card">
              <i className="card-icon fas fa-clipboard-list"></i>
              <h3>Create Issue</h3>
              <p>Raise concerns or issues that require government attention.</p>
              <button className="card-button" onClick={handleCreateIssueClick}>
                Get Started
              </button>
            </div>
            <div className="card">
              <i className="card-icon fas fa-comments"></i>
              <h3>View My Issues</h3>
              <p>View issues raised by me</p>
              <button className="card-button" onClick={handleViewIssuesClick}>
                View Now
              </button>
            </div>``
            <div className="card">
              <i className="card-icon fas fa-bell"></i>
              <h3>Check Updates</h3>
              <p>Stay up to date with the latest developments.</p>
              <button className="card-button" onClick={() => alert('Check Updates')}>
                Check Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="create-issue-section">
          <CreateCitizenIssue />
          <button
            className="back-button"
            onClick={() => setShowCreateIssue(false)}
          >
            Back to Actions
          </button>
        </div>
      )}
    </div>
  );
};

export default CitizenHome;