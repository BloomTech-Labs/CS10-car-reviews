import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';
import SearchResults from './searchresults';
// This file contains the various components that make up the landing page 
// and search results. This file is rendered in App.

class MainPage extends Component {

    render() { 
        return ( 
            <div>
                <div>
                    <SearchBar/>
                </div>
                <div className="search-container">
                    <MainContent/>
                    <a href="https://lambdaschool.com">About The Team</a>
                </div>
            </div>
         );
    }
}
 
export default MainPage;
