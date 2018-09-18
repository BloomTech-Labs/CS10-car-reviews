import React, { Component } from 'react';
import {
  Card, 
  CardTitle,
  CardText,
  CardBody,
  Label,
  Button
} from 'reactstrap';
import axios from 'axios';
import './usersettings.css';

// * TODO: Center vertically
const styles = {
  cardStyles: {
    width: "30%",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputStyles: {
    width: '80%',
    marginTop: 0,
  },
  labelStyles: {
    margin: 0,
    textAlign: 'left',
  },
  inputGroupStyles: {
    marginBottom: "5%",
  }
}

// A form component that will display the name and email of a logged in user and allow them to change them and/or their password. Renders within the Settings component.

// * TODO: Add a confirmation that the user has had their password changed successfully
class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: ''
    };

  }

  handleChange = (passType) => (event) =>{
    event.preventDefault();
    this.setState({ [passType]: event.target.value });
  }

  handleSubmit = (event) => {
    const { password } = this.state;
    const config = {
      headers: { 'jwt': localStorage.getItem('jwt') }
    };
    event.preventDefault();
    const localRequests = 'http://localhost:3001/api/users/data'
    axios.put(localRequests, { password }, config)
      .then(res => console.log(res));
    // axios.put('')
    this.setState({
      password: '',
      password2: ''
    })
  }

  handleValidation = (event) => {
    
  }

  render() {
    return (
      <div className="userinfoContainer">
        <Card style={styles.cardStyles}>
          <CardBody>
            <CardTitle>Change Your Password</CardTitle>
            <form onSubmit={this.handleSubmit}>
              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>New Password</p>
                <input
                  style={styles.inputStyles} 
                  placeholder='New password...'
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
              </div>

              <div style={styles.inputGroupStyles}>
                <p style={styles.labelStyles}>Re-Enter New Password</p>
                <input 
                  style={styles.inputStyles}
                  placeholder='Re-enter new'
                  value={this.state.password2}
                  onChange={this.handleChange('password2')}
                />
              </div>
              <Button type="submit" color="primary">Save Changes</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserSettings;
