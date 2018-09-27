import React, { Component } from 'react';
import {
  Card, 
  CardTitle,
  CardBody,
  Button,
  Alert
} from 'reactstrap';
import axios from 'axios';
import './usersettings.css';

// * TODO: Center vertically
const styles = {
  cardStyles: {
    width: "30%",
    height: "28%",
    marginTop: '10%'
  },
  inputStyles: {
    width: '60%',
    marginTop: 0,
  },
  labelStyles: {
    margin: 0,
    textAlign: 'left',
  },
  inputGroupStyles: {
    marginBottom: "5%",
  },
  // containerStyles: {
  //   display: 'flex',
  //   justifyContent: 'space-around',
  //   width: '100%',
  // }
}

// A form component that will display the name and email of a logged in user and allow them to change them and/or their password. Renders within the Settings component.

// * TODO: Add a confirmation that the user has had their password changed successfully
// * TODO: Add a warning that the passwords don't match
// * TODO: Add better form validation
// * TODO: Add support for chaning other values
// ** OPTIONAL: Add a more general submittal method
class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwords: {
        password: '',
        password2: ''
      },
      usernames: {
        username: '',
        username2: ''
      },
      emails: {
        email: '',
        email2: ''
      },
      alerts: {
        password: false,
        username: false,
        email: false,
        passwordSuccess: false,
        usernameSuccess: false,
        emailSuccess: false,
      }
    };

  }

  handleChange = (type1, type2) => (event) =>{
    event.preventDefault();
    const newState = Object.assign({}, this.state);
    newState[type1][type2] = event.target.value;
    this.setState(newState);
  }

  handleSubmitPassword = (event) => {
    event.preventDefault();
    const { password, password2 } = this.state.passwords;
    const config = {
      headers: { 'jwt': localStorage.getItem('jwt') }
    };
    const localRequests = 'http://localhost:3001/api/users/data'
    if (password2 !== password || !password || !password2) {
      if (!this.state.alerts.password) this.handleAlerts('password');
      return console.warn(`Passwords do not match`);
    }
    axios.put(localRequests, { password }, config)
      .then(res => {
        console.log(res);
        if (this.state.alerts.password) this.handleAlerts('password');
        if (!this.state.alerts.passwordSuccess) this.handleAlerts('passwordSuccess');
        localStorage.setItem('jwt', res.data.JWT);
      })
      .catch(err => {
        if (!this.state.alerts.password) this.handleAlerts('password');
        if (this.state.alerts.passwordSuccess) this.handleAlerts('passwordSuccess');
        console.warn(err);
      });
    this.setState({
      passwords: {
        password: '',
        password2: ''
      }
    })
  }

  handleSubmitUsername = (event) => {
    event.preventDefault();
    const { username, username2 } = this.state.usernames;
    const config = {
      headers: { 'jwt': localStorage.getItem('jwt') }
    };
    const localRequests = 'http://localhost:3001/api/users/data'
    if (username2 !== username || !username || !username2) {
      if (!this.state.alerts.username) this.handleAlerts('username');
      return console.warn(`Usernames do not match`)
    }
    axios.put(localRequests, { username }, config)
      .then(res => {
        console.log(res);
        if (this.state.alerts.username) this.handleAlerts('username');
        if (!this.state.alerts.usernameSuccess) this.handleAlerts('usernameSuccess');
        localStorage.setItem('jwt', res.data.JWT);
      })
      .catch(err => {
        if (!this.state.alerts.username) this.handleAlerts('username');
        if (this.state.alerts.usernameSuccess) this.handleAlerts('usernameSuccess');
        console.warn(err);
      });
    this.setState({
      usernames: {
        username: '',
        username2: ''
      }
    })
  }

  handleSubmitEmail = (event) => {
    event.preventDefault();
    const { email, email2 } = this.state.emails;
    const config = {
      headers: { 'jwt': localStorage.getItem('jwt') }
    };
    const localRequests = 'http://localhost:3001/api/users/data'
    if (email2 !== email || !email || !email2) {
      if (!this.state.alerts.email) this.handleAlerts('email');
      return console.warn(`Email addresses do not match`);
    }
    axios.put(localRequests, { newEmail: email }, config)
      .then(res => {
        console.log(res)
        if (this.state.alerts.email) this.handleAlerts('email');
        if (!this.state.alerts.emailSuccess) this.handleAlerts('emailSuccess');
        localStorage.setItem('jwt', res.data.JWT);
      })
      .catch(err => {
        console.log(err)
        if (!this.state.alerts.email) this.handleAlerts('email');
        if (this.state.alerts.emailSuccess) this.handleAlerts('emailSuccess');
        console.warn(err);
      });
    this.setState({
      emails: {
        email: '',
        email2: ''
      }
    })
  }

  handleAlerts = (type) => {
    const newState = Object.assign({}, this.state);
    newState.alerts[type] = !this.state.alerts[type];
    this.setState(newState);
  }

  render() {
    return (
      <div className="user-settings-container">
      {/* <div style={styles.containerStyles}> */}
        <Card style={styles.cardStyles}>
          <CardBody>
            <CardTitle>Change Your Password</CardTitle>
            <form onSubmit={this.handleSubmitPassword}>
              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>New Password</p>
                <input
                  type='password'
                  style={styles.inputStyles} 
                  placeholder='New password...'
                  value={this.state.passwords.password}
                  onChange={this.handleChange('passwords', 'password')}
                />
              </div>

              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>Re-Enter New Password</p>
                <input 
                  type='password'
                  style={styles.inputStyles}
                  placeholder='Re-enter new password...'
                  value={this.state.passwords.password2}
                  onChange={this.handleChange('passwords', 'password2')}
                />
              </div>
              <Button type="submit" color="primary">Save Changes</Button>
              <Alert isOpen={this.state.alerts.password} color='danger'>There was an issue changing your password, please try again</Alert>
              <Alert isOpen={this.state.alerts.passwordSuccess} color='primary'>Your password has successfully been changed!</Alert>
            </form>
          </CardBody>
        </Card>

        <Card style={styles.cardStyles}>
          <CardBody>
            <CardTitle>Change Your Username</CardTitle>
            <form onSubmit={this.handleSubmitUsername}>
              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>New Username</p>
                <input
                  style={styles.inputStyles} 
                  placeholder='New username...'
                  value={this.state.usernames.username}
                  onChange={this.handleChange('usernames', 'username')}
                />
              </div>

              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>Re-Enter New Username</p>
                <input 
                  style={styles.inputStyles}
                  placeholder='Re-enter new username'
                  value={this.state.usernames.username2}
                  onChange={this.handleChange('usernames', 'username2')}
                />
              </div>
              <Button type="submit" color="primary">Save Changes</Button>
              <Alert isOpen={this.state.alerts.username} color='danger'>There was an issue changing your username, please try again</Alert>
              <Alert isOpen={this.state.alerts.usernameSuccess} color='primary'>Your username has successfully been changed!</Alert>
            </form>
          </CardBody>
        </Card>

        <Card style={styles.cardStyles}>
          <CardBody>
            <CardTitle>Change Your Email Address</CardTitle>
            <form onSubmit={this.handleSubmitEmail}>
              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>New Email Address</p>
                <input
                  style={styles.inputStyles} 
                  placeholder='New email...'
                  value={this.state.password}
                  onChange={this.handleChange('emails', 'email')}
                />
              </div>

              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>Re-Enter New Email</p>
                <input 
                  style={styles.inputStyles}
                  placeholder='Re-enter new email'
                  value={this.state.password2}
                  onChange={this.handleChange('emails', 'email2')}
                />
              </div>
              <Button type="submit" color="primary">Save Changes</Button>
              <Alert isOpen={this.state.alerts.email} color='danger'>There was an issue changing your email, please try again</Alert>
              <Alert isOpen={this.state.alerts.emailSuccess} color='primary'>Your email has successfully been changed!</Alert>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserSettings;
