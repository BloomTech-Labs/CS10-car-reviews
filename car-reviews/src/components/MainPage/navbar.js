import React, { Component, Fragment } from 'react';
import AuthService from '../Auth/authservice';
import './navbar.css';
import Media from 'react-media';
import HamburgerMenu from './hamburgermenu';

const Auth = new AuthService();

const styles = {
  hamburgerStyles: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20,
  }
}

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
    console.log(this.props.isLoggedIn);
    return (
      <div className="navbar-container">
          <Media query='(max-width: 550px)'>
            {matches => 
              matches ? 
              <div style={styles.hamburgerStyles} id='hamburger-menu'>
                <HamburgerMenu right isLoggedIn={this.props.isLoggedIn} /> 
              </div>
              :
              <div className="nc">
                <a className="navbar-item" href="/">
                  Home
                </a>

                {this.props.isLoggedIn ? 
                  <a className="navbar-item" href="/MyReviews">
                    My Reviews
                  </a>:
                  <Fragment />
                }

                {this.props.isLoggedIn ? 
                  <a className="navbar-item" href="/Billing">
                    Billing
                  </a> :
                  <Fragment />
                }

                {this.props.isLoggedIn ? 
                  <a className="navbar-item" href="/Settings">
                    Settings
                  </a>:
                  <Fragment />
                }

                {!this.props.isLoggedIn ?
                  <a className='navbar-item' href="/login">Sign In</a> :
                  <a className="navbar-item" href="/" onClick={this.signOut}>Sign Out</a>
                }
              </div>
            }
          </Media>
      </div>
    );
  }
}
 
export default Navbar;
