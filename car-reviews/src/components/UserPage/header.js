import React, { Component } from 'react';
import '../UserPage/header.css';
import AuthService from '../Auth/authservice';

const Auth = new AuthService();

class Header extends Component {
  signOut = () => {
    Auth.logout();
  };

  render() {
    return (
      <div className="headerContainer">
        <div className="idContainer">
          <a href="/" style={{ color: 'white'}}>Home</a>
          <span> > {this.props.section}</span>{' '}
          {/*Will display the section that we are currently in passed down as props from that respective Component (ie. Settings, Billing, My Reviews, etc.)*/}
        </div>
        <div className="signoutContainer">
          <a href="/" onClick={this.signOut} style={{ color: 'white'}}>
            Sign Out
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
