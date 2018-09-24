import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import AuthService from '../Auth/AuthService';

const Auth = new AuthService();

export default props => {
  const signOut = () => {
    Auth.logout();
  };

  return (
    <Menu {...props}>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/searchpage">
        Search
      </a>

      <a className="menu-item" href="/MyReviews">
        My Reviews
      </a>

      <a className="menu-item" href="/Billing">
        Billing
      </a>
      <a className="menu-item" href="/Settings">
        Settings
      </a>
      <a className="menu-item" href="/" onClick={signOut}>
        Sign Out
      </a>
    </Menu>
  );
};
