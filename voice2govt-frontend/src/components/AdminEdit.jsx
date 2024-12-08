import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    adm_firstName: '',
    adm_lastName: '',
    adm_email: '',
    adm_phoneNumber: '',
    adm_dob: '',
    adm_password: '',
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`/api/admins/${id}`);
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin:', error);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admins/${id}`, adminData);
      navigate('/');
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  return (
    <div>
      <h2>Edit Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="adm_firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="adm_firstName" name="adm_firstName" value={adminData.adm_firstName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="adm_lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="adm_lastName" name="adm_lastName" value={adminData.adm_lastName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="adm_email" className="form-label">Email</label>
          <input type="email" className="form-control" id="adm_email" name="adm_email" value={adminData.adm_email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="adm_phoneNumber" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="adm_phoneNumber" name="adm_phoneNumber" value={adminData.adm_phoneNumber} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="adm_dob" className="form-label">Date of Birth</label>
          <input type="date" className="form-control" id="adm_dob" name="adm_dob" value={adminData.adm_dob} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="adm_password" className="form-label">Password</label>
          <input type="password" className="form-control" id="adm_password" name="adm_password" value={adminData.adm_password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default AdminEdit;
