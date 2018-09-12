import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import UserPage from './components/UserPage/UserPage';
import {Switch, Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/' component = {MainPage}/>
        <Route exact path='/UserPage' component = {UserPage}/>
      </Switch>  
      </div>
    );
  }
}

export default App;
