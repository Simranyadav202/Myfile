import React from 'react';
import './RegisterPage.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2 className="register-title">Register on TrackKit</h2>

        <form className="register-form">
          <div className="name-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="date" placeholder="Fill Your Age" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
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
