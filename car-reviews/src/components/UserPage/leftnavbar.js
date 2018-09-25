import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../UserPage/leftnavbar.css';
import { ReviewIcon } from './assets/review.png';

class LeftNavBar extends Component {
  render() {
    return (
      <nav className="mainContainer">
        <div className="hoverStyle">
          <Link to="/searchpage" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">Search</h1>
          </Link>
        </div>
        <div className="hoverStyle">
          <Link to="/MyReviews" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">My Reviews</h1>
          </Link>
        </div>
        <div className="hoverStyle">
          <Link to="/Billing" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">Billing</h1>
          </Link>
        </div>
        <div className="hoverStyle">
          <Link to="/Settings" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">Settings</h1>
          </Link>
        </div>
      </nav>
    );
  }
}

export default LeftNavBar;
