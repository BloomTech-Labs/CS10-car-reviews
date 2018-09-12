import React, { Component } from 'react';
import '../UserPage/header.css';

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
          <a href="/">Sign Out</a>
        </div>
      </div>
    );
  }
}

export default Header;
