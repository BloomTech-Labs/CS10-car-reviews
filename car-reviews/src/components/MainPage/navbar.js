import React from 'react';
import AuthService from '../Auth/authservice';
import './navbar.css';

const Auth = new AuthService();

export default props => {
  const signOut = () => {
    Auth.logout();
  };

  return (
    <div {...props} className="navbar-container">
      <a className="navbar-item" href="/">
        Home
      </a>

      {/* <a className="navbar-item" href="/searchpage">
        Search
      </a> */}

      <a className="navbar-item" href="/MyReviews">
        My Reviews
      </a>

      <a className="navbar-item" href="/Billing">
        Billing
      </a>
      <a className="navbar-item" href="/Settings">
        Settings
      </a>
      <a className="navbar-item" href="/" onClick={signOut}>
        Sign Out
      </a>
    </div>
  );
};