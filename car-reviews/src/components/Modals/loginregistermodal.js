import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

const styles = {
    headerStyles: {
        // display: 'flex',
        // justifyContent: 'center'
    },
    closeButtonStyles: {
        display: 'inline-block',
        marginLeft: 320
    },
    headerTextStyles: {
        display: 'inline-block',
        marginLeft: 10
    }
}

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
                <div>
                    <Button color="danger" onClick={this.props.toggleModal}>{this.props.buttonLabel}</Button>
                    <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
                        <ModalHeader style={styles.headerStyles}>
                            <p style={styles.headerTextStyles}>Login</p>
                            <Button style={styles.closeButtonStyles} color="danger" onClick={this.props.handleModalState}>X</Button>
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <input 
                                    type='text'
                                    name='email'
                                    placeholder='Enter your email...'
                                    value={this.state.login.email}
                                    onChange={this.handleUpdateText('login')}
                                />
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
                                    color='primary'
                                >Submit</Button>
                                <p>Don't have an account?</p>
                                <Button onClick={() => this.props.handleChangeModalType('register')}>Register</Button>
                            </form>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }
        if (this.props.type === 'register'){
            return(
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
                    <ModalHeader style={styles.headerStyles}>
                            <p style={styles.headerTextStyles}>Register</p>
                            <Button style={styles.closeButtonStyles} color="danger" onClick={this.props.handleModalState}>X</Button>
                        </ModalHeader>
                    <ModalBody>
                        <form>
                            <input 
                                type='text'
                                name='fullname'
                                placeholder='Enter your full name...'
                                value={this.state.register.fullname}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='text'
                                name='username'
                                placeholder='Enter your username...'
                                value={this.state.register.username}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='text'
                                name='email'
                                placeholder='Enter your email...'
                                value={this.state.register.email}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={this.state.register.password}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='password'
                                name='password2'
                                placeholder='Re-enter password...'
                                value={this.state.register.password2}
                                onChange={this.handleUpdateText('register')}
                            />
                            <Button 
                                type='submit' 
                                onClick={this.handleSubmittal('register')}
                                color='primary'
                            >Submit</Button>
                            {/* TODO: Change the login and register switches */}
                            <p>Already have an account?</p>
                            <Button onClick={() => this.props.handleChangeModalType('login')}>Login</Button>
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