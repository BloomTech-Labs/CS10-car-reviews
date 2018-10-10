import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from './navbar';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Button, Alert } from 'reactstrap';
import './loginregister.css';

class LoginRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: '',
        password: ''
      },
      register: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        password2: ''
      },
      alerts: {
        login: false,
        register: false,
        passMatchErr: false,
        emailValidErr: false
      },
      redirect: false,
      type: 'login'
    };
  }

  handleUpdateText = formType => event => {
    const { name, value } = event.target;
    const newState = Object.assign({}, this.state);
    newState[formType][name] = value;
    this.setState(newState);
  };

  handleAlerts = type => {
    const newState = Object.assign({}, this.state);
    newState.alerts[type] = !this.state.alerts[type];
    this.setState(newState);
  };

  handleChangeModalType = type => {
    this.setState({
      type: type
    });
  };

  handleSubmittal = formType => event => {
    event.preventDefault();
    const deployedURL = `https://back-lambda-car-reviews.herokuapp.com/auth/${formType}`;
    const userState = Object.assign({}, this.state[formType]);

    // ** OPTIONAL: Externalize logic to a helper method
    if (formType === 'register') {
      if (!this.state.register.email.includes('@') || !this.state.register.email.includes('.')) {
        this.setState({
          alerts: {
            ...this.state.alerts,
            emailValidErr: true
          }
        });
        return;
      } else {
        this.setState({
          alerts: {
            ...this.state.alerts,
            emailValidErr: false
          }
        });
      }

      if (this.state.register.password !== this.state.register.password2) {
        this.setState({
          alerts: {
            ...this.state.alerts,
            passMatchErr: true
          }
        });
        return;
      } else {
        this.setState({
          alerts: {
            ...this.state.alerts,
            passMatchErr: false
          }
        });
      }
    }

    axios
      .post(deployedURL, userState)
      .then(res => {
        // * TODO: remove alert
        localStorage.setItem('jwt', res.data.JWT);
        this.setState({
          login: {
            email: '',
            password: ''
          },
          register: {
            fullname: '',
            username: '',
            email: '',
            password: '',
            password2: ''
          },
          redirect: true
        });
      })
      .catch(err => {
        // * TODO: Add alerts for specific errors on the backend
        if (!this.state.alerts[formType]) this.handleAlerts(formType);
        console.warn(err);
      });
  };

  handleRenderFormType = () => {
    if (this.state.redirect) {
      // * OPTIONAL: Have it redirect to whatever page the user was trying to view
      return <Redirect to="/" />;
    }
    if (this.state.type === 'login') {
      return (
        <Card className="login-card">
          <CardHeader className="login-header">
            <p>Login</p>
          </CardHeader>
          <CardBody>
            <form className="login-form">
              <input
                type="text"
                name="email"
                placeholder="Enter your email..."
                value={this.state.login.email}
                className="login-input"
                onChange={this.handleUpdateText('login')}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={this.state.login.password}
                className="login-input"
                onChange={this.handleUpdateText('login')}
              />
              <Button
                type="submit"
                color="primary"
                onClick={this.handleSubmittal('login')}
                className="login-button"
              >
                Submit
              </Button>
              <Alert isOpen={this.state.alerts.login} color="danger">
                Incorrect email and/or password, please try again
              </Alert>
            </form>
          </CardBody>
          <CardFooter className="login-footer">
            <p className="login-footer-text">Don't have an account?</p>
            <p onClick={() => this.handleChangeModalType('register')} className="login-footer-link">
              Click here
            </p>
          </CardFooter>
        </Card>
      );
    }
    if (this.state.type === 'register') {
      return (
        <Card className="login-card">
          <CardHeader className="login-header">
            <p>Register</p>
          </CardHeader>
          <CardBody>
            <form className="login-form">
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name..."
                value={this.state.register.fullname}
                className="login-input"
                onChange={this.handleUpdateText('register')}
              />
              <input
                type="text"
                name="username"
                placeholder="Enter your username..."
                value={this.state.register.username}
                className="login-input"
                onChange={this.handleUpdateText('register')}
              />
              <input
                type="text"
                name="email"
                placeholder="Enter your email..."
                value={this.state.register.email}
                className="login-input"
                onChange={this.handleUpdateText('register')}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={this.state.register.password}
                className="login-input"
                onChange={this.handleUpdateText('register')}
              />
              <input
                type="password"
                name="password2"
                placeholder="Re-enter password..."
                value={this.state.register.password2}
                className="login-input"
                onChange={this.handleUpdateText('register')}
              />
              <Button
                type="submit"
                onClick={this.handleSubmittal('register')}
                color="primary"
                className="login-button"
              >
                Submit
              </Button>
              <Alert isOpen={this.state.alerts.register} color="danger">
                There was an error registering you, please check your credentials and try again
              </Alert>
              <Alert isOpen={this.state.alerts.passMatchErr} color="danger">
                The passwords you entered don't match, please try again
              </Alert>
              <Alert isOpen={this.state.alerts.emailValidErr} color="danger">
                Please enter a valid email address
              </Alert>
            </form>
          </CardBody>
          <CardFooter className="login-footer">
            <p className="login-footer-text">Already have an account?</p>
            <p onClick={() => this.handleChangeModalType('login')} className="login-footer-link">
              Click here
            </p>
          </CardFooter>
        </Card>
      );
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        {this.handleRenderFormType()}
      </div>
    );
  }
}

export default LoginRegister;
