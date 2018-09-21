import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';
import JWT from 'jsonwebtoken';

// This file contains the various components that make up the landing page
// and search results. This file is rendered in App.

class MainPage extends Component {
  state = {
    isLoggedIn: false
  }

  componentWillMount(){
    const tokenStatus = JWT.verify(localStorage.getItem('jwt'), "supersecretsecret", (err, decoded) => {
      if (err) this.handleLogin(false);
      else this.handleLogin(true);
    })
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
