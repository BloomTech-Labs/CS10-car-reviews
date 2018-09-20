import React, { Component, Fragment } from 'react';
import axios from 'axios'
import {
    Col,
    Label,
    Button,
    Alert
} from 'reactstrap'; 
import './LoginRegister.css';
import { Redirect } from 'react-router-dom';


// * TODO: Check if the user already has a valid JWT when they first visit the page and when they navigate to login/signup
// * TODO: Style login forms
// ** OPTIONAL: Create multiple alerts for all the different possible errors (no email, no password, both, etc.)
class LoginRegister extends Component {
    state = {
        login: {
            email: '',
            password: ''
        },
        register: {
            fullname: '',
            username: '',
            email: '',
            password: ''
        },
        redirect: {
            status:false
        },
        alerts: {
            login: false,
            register: false
        }
    }
    handleUpdateForms = (type, field) => (event) => {
        const newState = Object.assign({}, this.state);
        newState[type][field] = event.target.value;
        this.setState(newState);
    }
    handleSubmitForm = (formType) => (event) => {
        event.preventDefault();
        const requestURL = `https://lambda-car-reviews.herokuapp.com/auth/${formType}`;
        const localRequests = `http://localhost:3001/auth/${formType}`
        const userForm = Object.assign({}, this.state[formType]);
        console.log(userForm);
        axios.post(localRequests, userForm)
            .then(response => {
                // removes the alert if it's present
                if (this.state.alerts[formType]) this.handleAlerts(formType);
                // when the user successfully logs in/registers they are issued a JWT that is saved in storage with the key 'jwt'
                localStorage.setItem('jwt', response.data.JWT);
                // here the login status of the user is changed to 'true' when the login/register is successful
                this.setState({
                    login: {
                        email: '',
                        password: ''
                    },
                    register: {
                        fullname: '',
                        username: '',
                        email: '',
                        password: ''
                    },
                    redirect: {
                        status:true
                    }
                })
            })
            .catch(err => {
                if (!this.state.alerts[formType]) this.handleAlerts(formType);
                console.warn(err);
            });
    }

    handleAlerts = (type) => {
        const newState = Object.assign({}, this.state);
        newState.alerts[type] = !this.state.alerts[type];
        this.setState(newState);
    }

    handleRedirect =() => {
        if(this.state.redirect.status){
          return  <Redirect to='/'  />
        } else {
           return <div className="login-container">
            <Col sm="6">
                        <form onSubmit={this.handleSubmitForm('login')}>
                        <Label>Login Please!</Label>
                            <input 
                                value={this.state.login.email} 
                                placeholder='Enter your email...' 
                                onChange={this.handleUpdateForms('login', 'email')}     
                            />
                            <input 
                                // * NOTE: Hide characters
                                type='password'
                                value={this.state.login.password} 
                                placeholder='Enter your password...' 
                                onChange={this.handleUpdateForms('login', 'password')}   
                            />
                            <Button type='submit' color ="primary">Login</Button>
                            <Alert isOpen={this.state.alerts.login} color='danger'>Incorrect email and/or password, please try again</Alert>
                        </form>
                    </Col>
               
                
                
                
                <Col sm="6">
                    {/* Right pane: Login */}
                    { /* * TODO: Add logic to hide register fields until a button is clicked */}
                    <form onSubmit={this.handleSubmitForm('register')}>
                    <Label>Register if you do not have an account yet!</Label>
                        <input 
                            value={this.state.register.fullname} 
                            placeholder='Enter your fullname...' 
                            onChange={this.handleUpdateForms('register', 'fullname')}   
                        />
                        <input 
                            // * NOTE: Hide characters
                            value={this.state.register.username} 
                            placeholder='Enter your username...' 
                            onChange={this.handleUpdateForms('register', 'username')}   
                        />
                        <input 
                            value={this.state.register.email} 
                            placeholder='Enter your email...' 
                            onChange={(this.handleUpdateForms('register', 'email'))}   
                        />
                        <input 
                            // * NOTE: Hide characters
                            value={this.state.register.password} 
                            type='password'
                            placeholder='Enter your password...' 
                            onChange={this.handleUpdateForms('register', 'password')}   
                        />
                         <Button color="primary">Register</Button>
                         <Alert isOpen={this.state.alerts.register} color='danger'>There was an error registering you, please check your credentials and try again</Alert>
                    </form>
                </Col>
                </div>
        }
        
    }
    render(){
        return(
            <Fragment>
               {this.handleRedirect()} 
            </Fragment>
        )
    }
}

export default LoginRegister;