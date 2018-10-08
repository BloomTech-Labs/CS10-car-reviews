import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import AuthService from '../Auth/authservice';

const Auth = new AuthService();

class HamburgerMenu extends Component {
  handleSignOut = () => {
    Auth.signOut();
  }

  render(){
    return (
      <Menu {...this.props}>
        <a className="menu-item" href="/">
          Home
        </a>
  
        <a className="menu-item" href="/searchpage">
          Search
        </a>
  
        <a className="menu-item" href="/MyReviews">
          My Reviews
        </a>
  
        <a className="menu-item" href="/Billing">
          Billing
        </a>
        <a className="menu-item" href="/Settings">
          Settings
        </a>
        {!this.props.isLoggedIn ?
          <a className='navbar-item' href="/login">Sign In</a> :
          <a className="navbar-item" href="/" onClick={this.signOut}>Sign Out</a>
        }
      </Menu>
    );
  }
};

export default HamburgerMenu;
