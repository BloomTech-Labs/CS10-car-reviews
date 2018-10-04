import React, { Component } from 'react';
import AuthService from '../Auth/authservice';
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
            Home
          </a>
    
          <a className="navbar-item" href="/MyReviews">
            My Reviews
          </a>
    
          <a className="navbar-item" href="/Billing">
            Billing
          </a>

          <a className="navbar-item" href="/Settings">
            Settings
          </a>
        </div>
      );
    } else {
      return (
        <div className="nc">
          <a className="navbar-item" href="/">
            Home
          </a>
    
          <a className="navbar-item" href="/MyReviews">
            My Reviews
          </a>
    
          <a className="navbar-item" href="/Billing">
            Billing
          </a>
          
          <a className="navbar-item" href="/Settings">
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
