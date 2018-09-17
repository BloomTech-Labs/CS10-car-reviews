import React, { Component, Fragment } from 'react';
import axios from 'axios'
import {
    Col,
    Label,
    Button,
} from 'reactstrap'; 
import './LoginRegister.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLoginStatus } from '../../redux/actions/actionCreators';

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
        }
    }
    handleUpdateForms = (type, field) => (event) => {
        const newState = Object.assign({}, this.state);
        newState[type][field] = event.target.value;
        this.setState(newState);
    }
    handleSubmitForm = (formType) => (event) => {
        // * TODO: Add a redirect here
        event.preventDefault();
        const requestURL = `https://lambda-car-reviews.herokuapp.com/auth/${formType}`;
        const localRequests = `http://localhost:3001/auth/${formType}`
        const userForm = Object.assign({}, this.state[formType]);
        axios.post(localRequests, userForm)
            .then(response => {
                localStorage.setItem('jwt', response.data.JWT);
                this.props.changeLoginStatus();
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
            .catch(err => console.warn(err));
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
                         <Button color ="primary">Register</Button>
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

export default connect(null, { changeLoginStatus })(LoginRegister);