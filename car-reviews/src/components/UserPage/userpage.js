import React, { Component } from 'react';
import Navbar from '../MainPage/navbar';
import ReviewList from './reviewlist';
import Billing from './billing';
import Settings from './usersettings';

// console.log("AM i Logged in here? ", isLoggedin)
class UserPage extends Component {
  render() {
    return (
      <div>
        {/* <Navbar 
        isLoggedin={this.props.isLoggedin}
        />
        <ReviewList />
        <Billing />
        <Settings /> */}
      </div>
    );
  }
}

export default UserPage;
