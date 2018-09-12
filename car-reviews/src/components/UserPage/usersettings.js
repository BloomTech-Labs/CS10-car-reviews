import React, { Component } from 'react';
import './usersettings.css';

// A form component that will display the name and email of a logged in user and allow them to change them and/or their password. Renders within the Settings component.

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', // should be set to the username of the logged in user
      email: '', // should be set to the email of the logged in user
      oldpassword: '', // should be set to the password on file for logged in user
      newpassword: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {}

  render() {
    return (
      <div className="userinfoContainer">
        <form className="formContainer">
          <label>
            Name:
            <span className="inputBox1">
              <input
                type="text"
                name="name" // changed this to name from username so that handleChange() can work properly
                placeholder="Logged in user Name here"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </span>
          </label>
          <label>
            Email:
            <span className="inputBox4">
              <input
                type="text"
                name="email"
                placeholder="Logged in user Email here"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </span>
          </label>
          <label>
            Old Password:
            <span className="inputBox2">
              <input
                // will need to check the entered password with the old password we have on file, if they do not match -> deny ability to change it (tell user the password entered is incorrect)
                type="text"
                name="oldpassword"
                placeholder="********"
                value={this.state.oldpassword}
                onChange={this.handleChange}
              />
            </span>
          </label>
          <label>
            New Password:
            <span className="inputBox3">
              <input
                // will need to check the entered password to see that it passes the criteria for passwords we made in our user model, otherwise prompt user to meet the required criteria
                type="text"
                name="newpassword"
                placeholder="********"
                value={this.state.newpassword}
                onChange={this.handleChange}
              />
            </span>
          </label>
        </form>
        <button /*onClick={this.handleSubmit}*/ className="saveButton">Save</button>
      </div>
    );
  }
}

export default UserSettings;
