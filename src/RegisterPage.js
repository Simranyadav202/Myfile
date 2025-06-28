import React, { useState } from 'react';
import './RegisterPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/api/users/register', {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      password: form.password,
      dob: form.dob,
      role_id: 2
    });
    if (res.status === 201) {
      alert('Registered successfully');
      navigate('/login');
    }
  } catch (err) {
    console.error('Registration failed:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Something went wrong');
  }
};

 
  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2 className="register-title">Register on TrackKit</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        <div className="register-links">
          <Link to="/login">Login</Link>
          <span>|</span>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
