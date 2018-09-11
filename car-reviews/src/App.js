import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import UserPage from './components/UserPage/UserPage';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Billing from './components/UserPage/billing';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MainPage />
        <UserPage />
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
      </div>
    );
  }
}

export default App;
