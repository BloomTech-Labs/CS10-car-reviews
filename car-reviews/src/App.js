import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Billing from './components/UserPage/billing';
import Searchbar from './components/MainPage/searchbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <Elements>
            <Billing />
          </Elements>
        </div>
      </StripeProvider>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Searchbar />
      </div>
    );
  }
}

export default App;
