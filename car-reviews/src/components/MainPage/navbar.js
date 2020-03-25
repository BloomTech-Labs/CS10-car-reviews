import React, { Component, Fragment } from 'react';
import AuthService from '../Auth/authservice';
import axios from 'axios';
import './navbar.css';
import Media from 'react-media';
import HamburgerMenu from './hamburgermenu';

const Auth = new AuthService();
const backendURL = process.env.REACT_APP_BACKEND_URL;

const styles = {
  hamburgerStyles: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: {
        isOpen: false,
        type: 'login'
      },
      login: {
        email: 'guest@guest.com',
        password: 'guest123!'
      },
      register: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        password2: ''
      },
      alerts: {
        login: false,
        register: false,
        passMatchErr: false,
        emailValidErr: false
      },
      redirect: false,
      type: 'login'
    };
  }

  signOut = () => {
    Auth.logout();
  };

  handleAlerts = type => {
    const newState = Object.assign({}, this.state);
    newState.alerts[type] = !this.state.alerts[type];
    this.setState(newState);
  };

  guestSignIn = formType => event => {
    event.preventDefault();
    const deployedURL = `${backendURL}/auth/${formType}`;
    const userState = Object.assign({}, this.state[formType]);

    axios
      .post(deployedURL, userState)
      .then(res => {
        // * TODO: remove alert
        localStorage.setItem('jwt', res.data.JWT);
        this.setState({
          login: {
            email: 'Guest@guest.com',
            password: 'guest123!'
          },
          register: {
            fullname: '',
            username: '',
            email: '',
            password: '',
            password2: ''
          },
          redirect: true
        });
      })
      .catch(err => {
        // * TODO: Add alerts for specific errors on the backend
        if (!this.state.alerts[formType]) this.handleAlerts(formType);
        console.warn(err);
      });
  };

  render() {
    if (this.state.redirect) {
      // * OPTIONAL: Have it redirect to whatever page the user was trying to view
      return window.location.reload();
    }
    return (
      <div className="navbar-container">
        <Media query="(max-width: 550px)">
          {matches =>
            matches ? (
              <div style={styles.hamburgerStyles} id="hamburger-menu">
                <HamburgerMenu right isLoggedIn={this.props.isLoggedIn} />
              </div>
            ) : (
              <div className="nc">
                <a className="navbar-item" href="/">
                  Home
                </a>

                {this.props.isLoggedIn ? (
                  <a className="navbar-item" href="/MyReviews">
                    My Reviews
                  </a>
                ) : (
                  <Fragment />
                )}

                {this.props.isLoggedIn ? (
                  <a className="navbar-item" href="/Billing">
                    Billing
                  </a>
                ) : (
                  <Fragment />
                )}

                {this.props.isLoggedIn ? (
                  <a className="navbar-item" href="/Settings">
                    Settings
                  </a>
                ) : (
                  <Fragment />
                )}

                {this.props.isLoggedIn ? (
                  <Fragment />
                ) : (
                  <a className="navbar-item" href="/" onClick={this.guestSignIn('login')}>
                    Guest Sign In
                  </a>
                )}

                {!this.props.isLoggedIn ? (
                  <a className="navbar-item" href="/login">
                    Sign In
                  </a>
                ) : (
                  <a className="navbar-item" href="/" onClick={this.signOut}>
                    Sign Out
                  </a>
                )}
              </div>
            )
          }
        </Media>
      </div>
    );
  }
}

export default Navbar;
