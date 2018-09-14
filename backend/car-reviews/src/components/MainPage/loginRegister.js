import React, { Component } from 'react';
import {
    Col,
    Form,
    Input,
    Label,
    FormGroup,
    Button,
    Container,
    Row,
} from 'reactstrap'; 
import './LoginRegister.css';

class Login extends Component {
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
        }
    }

    handleUpdateForms = (type, field) => (event) => {
        const newState = Object.assign({}, this.state);
        newState[type][field] = event.target.value;
        this.setState(newState);
    }

    handleSubmitForm = (formType) => {
        // * TODO: Submit form with axios
        console.log(formType);
    }

    render(){
        return(
            <div className="login-container">
                {/* Left pane: Login */}
                    <Col sm="6">
                        <form onSubmit={this.handleSubmitForm}>
                        <Label>Login Please!</Label>
                            <input 
                                value={this.state.login.email} 
                                placeholder='Enter your email...' 
                                onChange={this.handleUpdateForms('login', 'email')}     
                            />
                            <input 
                                // * NOTE: Hide characters
                                value={this.state.login.password} 
                                placeholder='Enter your password...' 
                                onChange={this.handleUpdateForms('login', 'password')}   
                            />
                            <Button color ="primary" onClick={() => {this.handleSubmitForm('login')}}>Login</Button>
                        </form>
                    </Col>
               
                
                
                
                <Col sm="6">
                    {/* Right pane: Login */}
                    { /* * TODO: Add logic to hide register fields until a button is clicked */}
                    <form onSubmit={this.handleSubmitForm}>
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
                            placeholder='Enter your password...' 
                            onChange={this.handleUpdateForms('register', 'password')}   
                        />
                         <Button color ="primary" onClick={() => {this.handleSubmitForm('register')}}>Register</Button>
                    </form>
                </Col>
                
            </div>
        )
    }
}

export default Login;