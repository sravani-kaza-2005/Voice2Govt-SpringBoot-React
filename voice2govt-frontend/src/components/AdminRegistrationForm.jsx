import React, { useState } from 'react';
import axios from 'axios';

const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    adm_firstName: '',
    adm_lastName: '',
    adm_email: '',
    adm_phoneNumber: '',
    adm_dob: '',
    admUsername: '',
    admPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:9728/api/admins/register', formData);
      setSuccess('Admin registered successfully');
      setFormData({
        adm_firstName: '',
        adm_lastName: '',
        adm_email: '',
        adm_phoneNumber: '',
        adm_dob: '',
        admUsername: '',
        admPassword: ''
      });
    } catch (error) {
      setErrors({ form: 'Error registering admin' });
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.adm_firstName.trim()) errors.adm_firstName = 'First name is required';
    if (!formData.adm_lastName.trim()) errors.adm_lastName = 'Last name is required';
    if (!formData.adm_email) errors.adm_email = 'Email is required';
    if (!formData.adm_phoneNumber) errors.adm_phoneNumber = 'Phone number is required';
    if (!formData.admUsername) errors.admUsername = 'Username is required';
    if (!formData.admPassword) errors.admPassword = 'Password is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="container mt-5">
      {success && <div className="alert alert-success">{success}</div>}
      {errors.form && <div className="alert alert-danger">{errors.form}</div>}

      <h2>Register New Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="adm_firstName"
            value={formData.adm_firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="adm_lastName"
            value={formData.adm_lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="adm_email"
            value={formData.adm_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="adm_phoneNumber"
            value={formData.adm_phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="admUsername"
            value={formData.admUsername}
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
            value={formData.admPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
