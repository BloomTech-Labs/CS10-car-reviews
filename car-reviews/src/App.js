import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Billing from './components/UserPage/billing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
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
      </div>
    );
  }
}

export default App;
