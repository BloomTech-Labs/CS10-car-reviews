import React, { Component } from 'react';
import AuthService from '../Auth/authservice';
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

  signOut = () => {
    Auth.logout();
  };

  render() { 
    return (
      <div className="navbar-container">
          <div className="nc">
          <a className="navbar-item" href="/">
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
          {this.props.isLoggedIn ? 
            <a className="navbar-item" href="/" onClick={this.signOut}>
              Sign Out
            </a> : 
            <p className="navbar-item" onClick={this.props.handleModalState('login', true)}>
              Sign In
            </p> 
        }
        </div>
      </div>
    );
  }
}
 
export default Navbar;
