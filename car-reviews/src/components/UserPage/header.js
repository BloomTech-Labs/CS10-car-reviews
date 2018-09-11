import React, { Component } from 'react';
import '../UserPage/header.css';

class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
        <div className="idContainer">
          <a href="/">Home</a>
          <span> > Settings</span>
        </div>
        <div className="signoutContainer">
          <a href="/">Sign Out</a>
        </div>
      </div>
    );
  }
}

export default Header;
