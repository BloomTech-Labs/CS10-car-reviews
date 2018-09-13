import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import UserPage from './components/UserPage/UserPage';
import MyReviews from './components/UserPage/myreviews';
import {Switch, Route} from 'react-router-dom';
import Billing from './components/UserPage/billing'
import Login from './components/MainPage/loginRegister';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/' component = {MainPage}/> 
          {/* <Route path='/searchpage' component = {SearchPage}/> */}
        <Route path='/UserPage' component = {UserPage}/>
        <Route path='/UserPage/Billing'/>
        {/* I removed /UserPage before /MyReviews because something is bugged in UserPage in this build */}
        <Route path='/MyReviews' component = {MyReviews}/>
        <Route path='/UserPage/Settings'/>
        <Route path='/Login' component = {Login}/>
      </Switch>  
      </div> 
    );
  }
}

export default App;
