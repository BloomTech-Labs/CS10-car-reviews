import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';

// This file contains the various components that make up the landing page
// and search results. This file is rendered in App.

class MainPage extends Component {
  state = {
    isLoggedIn: false
  }

  componentWillMount(){
    if (localStorage.getItem('jwt')) this.handleChangeLogin();
  }

  handleChangeLogin = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
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
          <a href="https://lambdaschool.com">About The Team</a>
        </div>
      </div>
    );
  }
}

export default MainPage;
