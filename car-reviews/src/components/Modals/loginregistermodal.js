import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

class LoginRegisterModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: {
                email: '',
                password: '',
            },
            register: {
                fullname: '',
                username: '',
                email: '',
                password: '',
                password2: ''
            }
        }
    }

    handleUpdateText = formType => event => {
        const { name, value } = event.target;
        const newState = Object.assign({}, this.state);
        newState[formType][name] = value;
        this.setState(newState);
    }

    handleSubmittal = formType => event => {
        event.preventDefault();
        const deployedURL = `https://back-lambda-car-reviews.herokuapp.com/auth/${formType}`;
        const localURL = `http://localhost:3001/auth/${formType}`
        const userState = Object.assign({}, this.state[formType]);
        
        axios.post(deployedURL, userState)
            .then(res => {
                // * TODO: remove alert
                localStorage.setItem('jwt', res.data.JWT);
                this.setState({
                    login: {
                        email: '',
                        password: '',
                    },
                    register: {
                        fullname: '',
                        username: '',
                        email: '',
                        password: '',
                        password2: ''
                    }
                });
                this.props.handleModalState();
            })
            .catch(err => {
                // * TODO: set alert to active
                console.warn(err);
            });
    }

    handleRenderFormType = () => {
        if (this.props.type === 'login') {
            return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <form>
                            <p>Email:</p>
                            <input 
                                type='text'
                                name='email'
                                placeholder='Enter your email...'
                                value={this.state.login.email}
                                onChange={this.handleUpdateText('login')}
                            />
                            <p>Password:</p>
                            <input 
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={this.state.login.password}
                                onChange={this.handleUpdateText('login')}
                            />
                            <Button 
                                type='submit' 
                                onClick={this.handleSubmittal('login')}
                            >Submit</Button>

                        </form>
                    </ModalBody>
                </Modal>
            )
        }
    }

    render(){
        return(
            <div>
                {this.handleRenderFormType()}
            </div>
        )
    }
}

export default LoginRegisterModal;