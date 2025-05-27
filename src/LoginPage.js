import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length >= 6;

    setEmailError(!emailIsValid);
    setPasswordError(!passwordIsValid);

    if (emailIsValid && passwordIsValid) {
      console.log('Login successful!');
    }
  };

  return (
    <div className="login-container">
      <div className="video-section">
        <video autoPlay loop muted>
          <source src={`${process.env.PUBLIC_URL}/videomp4.mp4`} type="video/mp4" />
        </video>
      </div>

      <div className="form-section">
        <img
          src={`${process.env.PUBLIC_URL}/key.png`}
          alt="Logo"
          className="login-logo"
        />

        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Login to TrackKit</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? 'input-error' : ''}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? 'input-error' : ''}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="auth-links">
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
