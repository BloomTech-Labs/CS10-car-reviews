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
            My Reviews
          </a>
    
          <a className="navbar-item" href="/Billing">
            Billing
          </a>

          <a className="navbar-item" href="/Settings">
            Settings
          </a>
          {!this.props.isLoggedIn ?
            <a className='navbar-item' href="/login">Sign In</a> :
            <a className="navbar-item" href="/" onClick={this.signOut}>Sign Out</a>
          }
        </div>
      </div>
    );
  }
}
 
export default Navbar;
