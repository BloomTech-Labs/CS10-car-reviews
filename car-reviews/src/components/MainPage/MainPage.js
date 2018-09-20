import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';
import { connect } from 'react-redux';

// This file contains the various components that make up the landing page
// and search results. This file is rendered in App.

class MainPage extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <div>
          <SearchBar />
        </div>
        <div className="search-container">
          <MainContent isLoggedIn={isLoggedIn} />
          <a href="https://lambdaschool.com">About The Team</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ clientStatus }) => {
  return {
    isLoggedIn: clientStatus.isLoggedIn
  }
}

export default connect(mapStateToProps)(MainPage);
