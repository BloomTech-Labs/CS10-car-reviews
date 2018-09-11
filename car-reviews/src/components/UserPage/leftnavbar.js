import React, { Component } from 'react';
import '../UserPage/leftnavbar.css';

class LeftNavBar extends Component {
  render() {
    return (
      <nav className="mainContainer">
        <div className="hoverStyle">
          <h1 className="headerStyle">Search</h1>
        </div>
        <div className="hoverStyle">
          <h1 className="headerStyle">My Reviews</h1>
        </div>
        <div className="hoverStyle">
          <h1 className="headerStyle">Billing</h1>
        </div>
        <div className="hoverStyle">
          <h1 className="headerStyle">Settings</h1>
        </div>
      </nav>
    );
  }
}

export default LeftNavBar;
