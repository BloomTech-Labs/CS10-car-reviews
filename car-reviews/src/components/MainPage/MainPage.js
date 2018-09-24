import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';
import axios from 'axios';

const dbRequests = `https://lambda-car-reviews.herokuapp.com/auth/verify`;
const localRequests = `http://localhost:3001/auth/verify`

// This file contains the various components that make up the landing page
// and search results. This file is rendered in App.

class MainPage extends Component {
  state = {
    isLoggedIn: false
  }

  componentWillMount(){
    const localJWT = localStorage.getItem('jwt');
    if (!localJWT) this.handleLogin(false);
    else {
      axios.get(localRequests, { headers: { jwt: localJWT } })
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
          <SearchBar isLoggedIn={isLoggedIn} />
        </div>
        <div className="search-container">
          <MainContent />
          <a href="https://lambdaschool.com" style={{ paddingBottom: '30px' }}>About The Team</a>
        </div>
      </div>
    );
  }
}

export default MainPage;
