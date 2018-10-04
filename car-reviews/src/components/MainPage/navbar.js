import React, { Component } from 'react';
import AuthService from '../Auth/authservice';
// import home from '../Assets/home.png';
import flRev from '../Assets/flat_review.png'
import flBil from '../Assets/flat_billing.png';
import flSet from '../Assets/flat_settings.png';
import './navbar.css';


const Auth = new AuthService();

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalState: {
        isOpen: false,
        type: 'login'
      },

     }
  }

  renderSignout = () => {
    if (!this.props.isLoggedIn) {
      return (
        <div className="nc">
          <a className="navbar-item" href="/">
            {/* <img 
              src={home} 
              alt="home-icon" 
              className="icon"
            /> */}
            Home
          </a>
    
          <a className="navbar-item" href="/MyReviews">
            <img 
              src={flRev} 
              alt="review-icon" 
              className="icon"
            />
            My Reviews
          </a>
    
          <a className="navbar-item" href="/Billing">
            <img 
              src={flBil} 
              alt="billing-icon" 
              className="icon"
            />
            Billing
          </a>
          <a className="navbar-item" href="/Settings">
            <img 
              src={flSet} 
              alt="settings-icon" 
              className="icon"
            />
            Settings
          </a>
        </div>
      );
    } else {
      return (
        <div className="nc">
          <a className="navbar-item" href="/">
            {/* <img 
              src={home} 
              alt="home-icon" 
              className="icon"
            /> */}
            Home
          </a>
    
          <a className="navbar-item" href="/MyReviews">
            <img 
              src={flRev} 
              alt="review-icon" 
              className="icon"
            />
            My Reviews
          </a>
    
          <a className="navbar-item" href="/Billing">
            <img 
              src={flBil} 
              alt="billing-icon" 
              className="icon"
            />
            Billing
          </a>
          <a className="navbar-item" href="/Settings">
            <img 
              src={flSet} 
              alt="settings-icon" 
              className="icon"
            />
            Settings
          </a>
          <a className="navbar-item" href="/" onClick={this.signOut}>
            Sign Out
          </a>
        </div>
      );
    }
  }

  signOut = () => {
    Auth.logout();
  };

  render() { 
    return (
      <div className="navbar-container">
          {this.renderSignout()}
      </div>
    );
  }
}
 
export default Navbar;
