import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailIsValid = email.includes('@');
    setEmailError(!emailIsValid);
    setLoginError('');

    if (!emailIsValid) return;

    try {
      setIsLoading(true);
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true } // if your backend uses cookies
      );

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        console.log('Login successful');
        navigate('/MaterialDashboard');
      } else {
        setLoginError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Try again.';
      setLoginError(message);
    } finally {
      setIsLoading(false);
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
            required
          />

          {loginError && <p className="error-message">{loginError}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
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
