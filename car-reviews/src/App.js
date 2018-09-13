import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import UserPage from './components/UserPage/UserPage';
import {Switch, Route} from 'react-router-dom';
import Billing from './components/UserPage/billing'


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/' component = {MainPage}/>
          {/* <Route exact path='/searchpage' component = {SearchPage}/> */}
        <Route exact path='/UserPage' component = {UserPage}/>
        <Route exact path='/UserPage/Billing'/>
        <Route exact path='/UserPage/MyReviews'/>
        <Route exact path='/UserPage/Settings'/>
      </Switch>  
      </div>
    );
  }
}

export default App;
