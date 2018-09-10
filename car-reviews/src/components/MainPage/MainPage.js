import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';

class MainPage extends Component {

    render() { 
        return ( 
            <div className="search-container">
                <SearchBar />
                <MainContent />
                <a href="https://lambdaschool.com">About The Team</a>
            </div>
         );
    }
}
 
export default MainPage;
