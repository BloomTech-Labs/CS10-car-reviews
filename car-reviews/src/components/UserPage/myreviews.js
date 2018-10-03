import React, { Component } from 'react';
import Header from './header';
import LeftNavBar from './leftnavbar';
import ReviewList from './reviewlist';
import Navbar from '../MainPage/navbar';

class MyReviews extends Component {
  render() {
    return (
      <div>
        <div>
          {/* <Header section={'My Reviews'} />{' '} */}
          {/*Passing in the section My Reviews as props to the Header component*/}
          <Navbar />
        </div>
        <div className="settingsContainer">
          {/* <LeftNavBar /> */}
          <ReviewList />
        </div>
      </div>
    );
  }
}

export default MyReviews;
