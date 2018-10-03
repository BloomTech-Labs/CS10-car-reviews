import React, { Component } from 'react';
import ReviewList from './reviewlist';
import Navbar from '../MainPage/navbar';
import axios from 'axios';

const dbRequests = `https://back-lambda-car-reviews.herokuapp.com/auth/verify`;

class MyReviews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  componentWillMount(){
    const localJWT = localStorage.getItem('jwt');
    if (!localJWT) this.handleLogin(false);
    else {
      axios.get(dbRequests, { headers: { jwt: localJWT } })
        .then(response => {
          const { tokenIsValid } = response.data
          if (tokenIsValid) this.handleLogin(tokenIsValid);
          else this.handleLogin(false);
        })
        .catch(err => {
          console.log(err);
          this.handleLogin(false);
        })
    }
  }

  handleLogin = (status) => {
    console.log(`JWT is ${status}`)
    this.setState({ isLoggedIn: status });
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        <div>
          <Navbar 
            isLoggedIn={isLoggedIn} 
            handleLogin={this.handleLogin}
          />
        </div>
        <div className="settingsContainer">
          <ReviewList />
        </div>
      </div>
    );
  }
}

export default MyReviews;
