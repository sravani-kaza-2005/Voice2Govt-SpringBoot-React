import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaThumbsUp, FaClipboardList, FaEnvelope, FaComments } from "react-icons/fa"; // Icons for sections
import './PoliticianHome.css';

const PoliticianHome = ({ username }) => {
  const politicianId = 1; // Replace with actual logged-in politician's ID or get from state/authentication

  return (
    <div className="container mt-5">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="display-4 text-primary">Welcome, {username}!</h2>
          <p className="lead text-muted">
            This is your dashboard where you can view and respond to citizens' issues.
          </p>
        </div>
      </div>

      {/* Dashboard Overview Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-lg border-primary mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between">
              <FaBell size={24} />
              <span>Pending Issues</span>
            </div>
            <div className="card-body">
              <h5 className="card-title text-danger">5 Issues</h5>
              <p className="card-text">
                There are 5 issues pending your review. Click below to view and respond.
              </p>
              <Link to="/mapped-issues" className="btn btn-outline-primary">
                View Issues
              </Link>
            </div>
          </div>
        </div>

        {/* Resolved Issues Card */}
        <div className="col-md-4">
          <div className="card shadow-lg border-success mb-4">
            <div className="card-header bg-success text-white d-flex justify-content-between">
              <FaThumbsUp size={24} />
              <span>Resolved Issues</span>
            </div>
            <div className="card-body">
              <h5 className="card-title text-white">3 Issues</h5>
              <p className="card-text">
                3 issues have been successfully resolved. You can track their status here.
              </p>
              <Link to={`/resolved-issues/${politicianId}`} className="btn btn-success">
                View Resolved
              </Link>
            </div>
          </div>
        </div>

        {/* Update Issues Card */}
        <div className="col-md-4">
          <div className="card shadow-lg border-warning mb-4">
            <div className="card-header bg-warning text-white d-flex justify-content-between">
              <FaClipboardList size={24} />
              <span>Update Issues</span>
            </div>
            <div className="card-body">
              <h5 className="card-title text-dark">2 In-progress</h5>
              <p className="card-text">
                Update the 2 in-progress issues in your constituency.
              </p>
              <Link to={`/update-issues/${politicianId}`} className="btn btn-outline-dark">
                Update Issues
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-info text-white">
              <FaEnvelope size={24} />
              Messages
            </div>
            <div className="card-body">
              <h5 className="card-title">New Messages</h5>
              <p className="card-text">
                You have 4 new messages from citizens. Check your inbox to stay updated.
              </p>
              <Link to="/messages" className="btn btn-outline-info">
                Go to Messages
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-dark text-white">
              <FaComments size={24} />
              Feedback
            </div>
            <div className="card-body">
              <h5 className="card-title">View Feedback</h5>
              <p className="card-text">
                Read feedback from your constituents. Your feedback matters!
              </p>
              <Link to="/feedback" className="btn btn-outline-light">
                View Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="row mt-5 text-center">
        <div className="col-md-6">
          <button className="btn btn-lg btn-outline-primary w-100 shadow-lg">
            Create New Initiative
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-lg btn-outline-success w-100 shadow-lg">
            Schedule Public Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoliticianHome;
