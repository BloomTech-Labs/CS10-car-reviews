import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../UserPage/leftnavbar.css';
// import flSrch from '../assets/flat_car.png'
import flRev from '../Assets/flat_review.png'
import flBil from '../Assets/flat_billing.png';
import flSet from '../Assets/flat_settings.png';

class LeftNavBar extends Component {
  render() {
    return (
      <nav className="mainContainer">
        {/* <div className="hoverStyle">
          <Link to="/searchpage" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">Search</h1>
            <img 
              src={flSrch} 
              alt="search-icon" 
              className="icon"
            />
          </Link>
        </div> */}
        <div className="hoverStyle">
          <Link to="/MyReviews" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">My Reviews</h1>
            <img 
              src={flRev} 
              alt="review-icon" 
              className="icon"
            />
          </Link>
        </div>
        <div style={{ height: '50px' }}></div>
        <div className="hoverStyle">
          <Link to="/Billing" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">Billing</h1>
            <img 
              src={flBil} 
              alt="billing-icon" 
              className="icon"
            />
          </Link>
        </div>
        <div style={{ height: '50px' }}></div>
        <div className="hoverStyle">
          <Link to="/Settings" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="headerStyle">Settings</h1>
            <img 
              src={flSet} 
              alt="settings-icon" 
              className="icon"
            />
          </Link>
        </div>
      </nav>
    );
  }
}

export default LeftNavBar;
