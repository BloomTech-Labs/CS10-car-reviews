import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';
import SearchResults from './searchresults';

// This file contains the various components that make up the landing page 
// and search results. This file is rendered in App.

class MainPage extends Component {

    render() { 
        return ( 
            <div className="search-container">
                <SearchBar />
                <MainContent />
                <SearchResults />
                <a href="https://lambdaschool.com">About The Team</a>
            </div>
         );
    }
}
 
export default MainPage;
