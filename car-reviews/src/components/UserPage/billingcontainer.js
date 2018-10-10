import React, { Component } from 'react';
import Billing from './billing';
import Navbar from '../MainPage/navbar';
import axios from 'axios';
import './settings.css';

const dbRequests = `https://back-lambda-car-reviews.herokuapp.com/auth/verify`;

class BillingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  componentWillMount() {
    const localJWT = localStorage.getItem('jwt');
    if (!localJWT) this.handleLogin(false);
    else {
      axios
        .get(dbRequests, { headers: { jwt: localJWT } })
        .then(response => {
          const { tokenIsValid } = response.data;
          if (tokenIsValid) this.handleLogin(tokenIsValid);
          else this.handleLogin(false);
        })
        .catch(err => {
          console.log(err);
          this.handleLogin(false);
        });
    }
  }

  handleLogin = status => {
    this.setState({ isLoggedIn: status });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        <div>
          <Navbar isLoggedIn={isLoggedIn} handleLogin={this.handleLogin} />
        </div>
        <Billing />
      </div>
    );
  }
}

export default BillingContainer;
