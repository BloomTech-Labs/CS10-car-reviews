import React, { Component } from 'react';
import SearchBar from './searchbar';

class MainPage extends Component {

    render() { 
        return ( 
            <div className="search-container">
                <SearchBar />
            </div>
         );
    }
}
 
export default MainPage;
