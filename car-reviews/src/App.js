import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage/mainpage';
import MyReviews from './components/UserPage/myreviews';
import { Switch, Route, Redirect } from 'react-router-dom';
import BillingContainer from './components/UserPage/billingcontainer';
import Settings from './components/UserPage/settings';
import SearchResults from './components/MainPage/searchresults';
import Login from './components/MainPage/loginregister';
import AuthService from './components/Auth/authservice';

const Auth = new AuthService();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.loggedIn() === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/searchpage" component={SearchResults} />
          <PrivateRoute path="/Billing" component={BillingContainer} />
          <PrivateRoute path="/MyReviews" component={MyReviews} />
          <PrivateRoute path="/Settings" component={Settings} />
          <Route path="/Login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
