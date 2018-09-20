import React, { Component } from 'react';
import '../UserPage/header.css';
import AuthService from '../Auth/AuthService';

const Auth = new AuthService();

class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
        <div className="idContainer">
          <a href="/">Home</a>
          <span> > {this.props.section}</span>{' '}
          {/*Will display the section that we are currently in passed down as props from that respective Component (ie. Settings, Billing, My Reviews, etc.)*/}
        </div>
        <div className="signoutContainer">
          <a href="/" onClick={Auth.logout()}>
            Sign Out
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
