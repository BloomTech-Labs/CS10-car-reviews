import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import UserPage from './components/UserPage/UserPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainPage />
        <UserPage />
      </div>
    );
  }
}

export default App;
