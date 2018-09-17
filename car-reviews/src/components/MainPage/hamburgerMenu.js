import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
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
    </Menu>
  );
};
