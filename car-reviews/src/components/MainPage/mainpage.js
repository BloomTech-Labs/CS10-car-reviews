import React, { Component } from 'react';
import SearchBar from './searchbar';
import MainContent from './maincontent';
import axios from 'axios';
import Navbar from './navbar';

const dbRequests = `https://back-lambda-car-reviews.herokuapp.com/auth/verify`;
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
          <SearchBar 
            isLoggedIn={isLoggedIn} 
            handleLogin={this.handleLogin}
          />
        </div>
        <MainContent isLoggedIn={isLoggedIn} />
        <div className="team-link">
          <a
            href="https://lambdaschool.com"
            className="team-link"
            target="_blank"
          >
            Click here to learn about The Team!
          </a>
          {/* <div style={{ width: '10px' }} />
          Graphics from  <a 
                          href="https://pngtree.com/freepng/blue-flat-car_1154079.html"
                          style={{ color: 'white'}}
                          >pngtree.com</a> */}
        </div>
      </div>
    );
  }
}

export default MainPage;
