import React, { Component } from 'react';
import Header from './header';
import LeftNavBar from './leftnavbar';
import Billing from './billing';
import './settings.css';
import Navbar from '../MainPage/navbar';

class BillingContainer extends Component {
  render() {
    return (
      <div>
        <div>
          {/* <Header section={'Billing'} />{' '} */}
          {/*Passing in the section Billing as props to the Header component*/}
          <Navbar />
        </div>
        <div className="settingsContainer">
          {/* <LeftNavBar /> */}
          <Billing />
        </div>
      </div>
    );
  }
}

export default BillingContainer;
