import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/page.jpg)`,
      }}
    >
      <div className="overlay">
        <div className="content">
          <div className="logo-title">
            <img
              src={`${process.env.PUBLIC_URL}/image.png`}
              alt="Logo"
              className="logo"
            />
            <h1 className="title">TrackKit</h1>
          </div>
          <button className="login-button" onClick={handleLoginClick}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
