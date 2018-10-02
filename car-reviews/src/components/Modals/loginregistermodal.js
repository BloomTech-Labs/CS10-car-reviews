import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom'

const styles = {
    modalStyles: {
        width: '20%',
        marginTop: '10%'
    },
    headerStyles: {
        display: 'flex',
    },
    formStyles: {
        width: '100%',
        marginBottom: 0
    },
    closeButtonStyles: {
        position: 'absolute',
        right: '6%',
    },
    inputStyles: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%'
    },
    submitButtonStyles: {
        marginLeft: '33%',
    },
    footerStyles: {
        display: 'flex',
        justifyContent: 'center',
        // flexDirection: 'column',
    },
    footerTextStyles: {
        textAlign: 'center'
    },
    footerLinkStyles: {
        cursor: 'pointer',
        color: 'blue',
        textDecoration: 'underline',
        textAlign: 'center'
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
                this.props.handleSetJwtState(formType, res.data.JWT);
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
                    <Modal style={styles.modalStyles} isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
                        <ModalHeader style={styles.headerStyles}>
                            <Button style={styles.closeButtonStyles} color="danger" onClick={this.props.handleModalState('login', false)}>X</Button>
                            <p>Login</p>
                        </ModalHeader>
                        <ModalBody>
                            <form style={styles.formStyles}>
                                <input 
                                    type='text'
                                    name='email'
                                    placeholder='Enter your email...'
                                    value={this.state.login.email}
                                    style={styles.inputStyles}
                                    onChange={this.handleUpdateText('login')}
                                />
                                <input 
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password...'
                                    value={this.state.login.password}
                                    style={styles.inputStyles}
                                    onChange={this.handleUpdateText('login')}
                                />
                                <Button 
                                    type='submit' 
                                    onClick={this.handleSubmittal('login')}
                                    color='primary'
                                    style={styles.submitButtonStyles}
                                >Submit</Button>
                            </form>
                        </ModalBody>
                        <ModalFooter style={styles.footerStyles}>
                            <p style={styles.footerTextStyles}>Already have an account?</p>
                            <p onClick={() => this.props.handleChangeModalType('register')} style={styles.footerLinkStyles}>Click here</p>
                    </ModalFooter>
                    </Modal>
                </div>
            )
        }
        if (this.props.type === 'register'){
            return(
                <Modal style={styles.modalStyles} isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
                    <ModalHeader style={styles.headerStyles}>
                            <Button style={styles.closeButtonStyles} color="danger" onClick={this.props.handleModalState('register', false)}>X</Button>
                            <p>Register</p>
                        </ModalHeader>
                    <ModalBody>
                        <form style={styles.formStyles}>
                            <input 
                                type='text'
                                name='fullname'
                                placeholder='Enter your full name...'
                                value={this.state.register.fullname}
                                style={styles.inputStyles}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='text'
                                name='username'
                                placeholder='Enter your username...'
                                value={this.state.register.username}
                                style={styles.inputStyles}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='text'
                                name='email'
                                placeholder='Enter your email...'
                                value={this.state.register.email}
                                style={styles.inputStyles}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={this.state.register.password}
                                style={styles.inputStyles}
                                onChange={this.handleUpdateText('register')}
                            />
                            <input 
                                type='password'
                                name='password2'
                                placeholder='Re-enter password...'
                                value={this.state.register.password2}
                                style={styles.inputStyles}
                                onChange={this.handleUpdateText('register')}
                            />
                            <Button 
                                type='submit' 
                                onClick={this.handleSubmittal('register')}
                                color='primary'
                                style={styles.submitButtonStyles}
                            >Submit</Button>
                        </form>
                    </ModalBody>
                    <ModalFooter style={styles.footerStyles}>
                            <p style={styles.footerTextStyles}>Already have an account?</p>
                            <p onClick={() => this.props.handleChangeModalType('login')} style={styles.footerLinkStyles}>Click here</p>
                    </ModalFooter>
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