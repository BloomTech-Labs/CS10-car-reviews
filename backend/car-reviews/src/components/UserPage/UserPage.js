import React, { Component } from 'react';
import Header from './header';
import LeftNavBar from './leftnavbar';

class UserPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <LeftNavBar />
      </div>
    );
  }
}

export default UserPage;
