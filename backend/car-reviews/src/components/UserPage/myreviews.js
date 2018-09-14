import React, { Component } from 'react';
import Header from './header';
import LeftNavBar from './leftnavbar';
import ReviewList from './reviewlist';

class MyReviews extends Component {
  render() {
    return (
      <div>
        <div>
          <Header section={'My Reviews'} />{' '}
          {/*Passing in the section My Reviews as props to the Header component*/}
        </div>
        <div className="settingsContainer">
          <LeftNavBar />
          <ReviewList />
        </div>
      </div>
    );
  }
}

export default MyReviews;
