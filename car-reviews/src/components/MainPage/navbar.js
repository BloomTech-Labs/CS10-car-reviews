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

  signOut = () => {
    Auth.logout();
  };


  render() { 
    return (
      <div className="navbar-container">
        <div className="nc">
          <a className="navbar-item" href="/">
            {/* <img 
              src={home} 
              alt="home-icon" 
              className="icon"
            /> */}
            Home
          </a>

          {this.props.isLoggedIn && 
            <a className="navbar-item" href="/MyReviews">
              <img 
                src={flRev} 
                alt="review-icon" 
                className="icon"
              />
              My Reviews
            </a> 
          }

          {this.props.isLoggedIn && 
            <a className="navbar-item" href="/Billing">
              <img 
                src={flBil} 
                alt="billing-icon" 
                className="icon"
              />
              Billing
            </a>
          }

          {this.props.isLoggedIn && 
            <a className="navbar-item" href="/Settings">
              <img 
                src={flSet} 
                alt="settings-icon" 
                className="icon"
              />
              Settings
            </a>
          }

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
