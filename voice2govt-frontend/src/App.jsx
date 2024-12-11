import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import AdminList from './components/AdminList.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminHomePage from './components/AdminHomePage.jsx';
import EditAdmin from './components/EditAdmin.jsx';
import AdminHome from './components/Home.jsx';
import ViewIssues from './components/ViewIssues.jsx';
import AdminRegistrationForm from './components/AdminRegistrationForm.jsx';
import AdminNavbar from './components/Navbar.jsx';
import AdminFooter from './components/AdminFooter.jsx';
import CitizenRegister from './components/CitizenRegister.jsx';
import CitizenNavbar from './components/CitizenNavbar.jsx';
import CitizenLogin from './components/CitizenLogin.jsx';
import PoliticianLogin from './components/PoliticianLogin.jsx';
import PoliticianNavbar from './components/PoliticianNavbar.jsx';
import PoliticianHome from './components/PoliticianHome.jsx';
import CitizenHome from './components/CitizenHome.jsx';
import PoliticianRegistration from './components/PoliticianRegister.jsx';
import PoliticianMappedIssues from './components/PoliticianMappedIssues.jsx';
import ResolvedIssues from './components/ResolvedIssues.jsx';
import UpdateIssues from './components/UpdateIssues.jsx';
import UpdateIssueStatus from './components/UpdateIssueStatus.jsx';
import PoliticianList from './components/PoliticianList.jsx';
import CitizenList from './components/CitizenList.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAuthenticated(true);
      setUserType(parsedUser.type);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render navbar based on user type */}
        {isAuthenticated && userType === 'citizen' && <CitizenNavbar  onLogout={handleLogout}/>}
        {isAuthenticated && userType === 'politician' && <PoliticianNavbar onLogout={handleLogout} />}
        {!isAuthenticated && <AdminNavbar />}
        
        <div className="container mt-4">
          <Routes>
            <Route path="/adminlist" element={<AdminList />} />
            <Route path="/adm-login" element={<AdminLogin />} />
            <Route path="/view-issues" element={<ViewIssues />} />
            <Route path="/adm-register" element={<AdminRegistrationForm />} />
            <Route path="/edit/:id" element={<EditAdmin />} />
            <Route path="/" element={<AdminHome />} />
            <Route path="/citizen-register" element={<CitizenRegister />} />
            <Route path="/citizen-login" element={<CitizenLogin />} />
            <Route path="/politician-list" element={<PoliticianList />} />
            <Route path="/citizen-list" element={<CitizenList />} />
            {/* <Route path="/politician-login" element={<PoliticianLogin />} /> */}
            <Route path="/politician-register" element={<PoliticianRegistration/>} />
            <Route path="/politician-login" element={<PoliticianLogin />} />
            <Route path="/politician-home" element={<PoliticianHome />} />
            <Route path="/citizen-home" element={<CitizenHome />} />
            <Route path="/mapped-issues" element={<PoliticianMappedIssues />} />
            <Route path="/resolved-issues/:politicianId" element={<ResolvedIssues />} />
            <Route path="/update-issues/:politicianId" element={<UpdateIssues />} />
          </Routes>
          <Routes>
          <Route path="/admin-home" element={< AdminHomePage/>} />
          </Routes>
        </div>
        
        <AdminFooter />
      </div>
    </Router>
  );
}

export default App;
