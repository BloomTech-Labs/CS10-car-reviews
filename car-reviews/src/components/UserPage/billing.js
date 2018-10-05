import React, { Component, Fragment } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import {
    Card, 
    CardTitle,
    CardBody,
    Alert
  } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';
import './billing.css'
import Checkout from './checkout';

const stripeKey = process.env.REACT_APP_STRIPE_KEY;

const styles = {
    successAlertStyles: {
        color: 'white',
        backgroundColor: 'rgb(47,119,243)',
        width: "40%",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    },
    failureAlertStyles: {
        color: 'white',
        backgroundColor: 'red',
        width: "40%",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    }
}

class Billing extends Component {
    constructor(props) {
        super(props);

            this.state = {
                name: '',
                description:'',
                amount: 0.00,
                subscription: 0,
                successAlert: false,
                failureAlert: false,
                redirect: false,
            };
    };

    onPriceClick(name, description, amount) {
        
        this.setState({ name, description, amount });
        
      }
    
    handlePaymentSuccess = () => {
        this.setState({ successAlert: true, failureAlert: false });
        setTimeout(() => this.setState({ redirect: true }), 2500)
    }

    handlePaymentFailure = () => {
        this.setState({ successAlert: false, failureAlert: true });
    }

    handleRedirect = () => {
        if (this.state.redirect) return <Redirect to='/' />
        else return <Fragment />
    }
    render(){
        return(
            <div className="billing-container">
                {/* <div className="BillingBox"> */}
                {/* <h3 className="element"> Billing </h3>
                <label className= "element"> payment info</label> */}
                {this.handleRedirect()}
                <Alert style={styles.successAlertStyles} isOpen={this.state.successAlert}>Payment was successful. Enjoy the site!</Alert>
                <Alert color='danger' style={styles.failureAlertStyles} isOpen={this.state.failureAlert}>There was an issue with your payment--please try again</Alert>
                <div style={{ height: '100px' }} />
                <StripeProvider apiKey={stripeKey}>
                <Elements>
                    <div>
                    <Row>
                        <Col md="4">
                            <Card >
                            <CardBody>
                              <CardTitle>1 year unlimited reviews: 40% OFF!</CardTitle>
                                <Button className="button" color="primary" onClick={() => this.onPriceClick('Trusted Car Reviews','1 year unlimited reviews',  6.99)} >1 Year Subscription = 6.99</Button>
                                <Checkout
                                    name={'Trusted Car Reviews'}
                                    description={'1 year unlimited reviews'}
                                    amount={6.99}
                                    handlePaymentSuccess={this.handlePaymentSuccess}
                                    handlePaymentFailure={this.handlePaymentFailure}
                                />
                            </CardBody>
                            </Card>
                            <Card>
                            <CardBody>
                              <CardTitle>6 month unlimited reviews: 33% OFF!</CardTitle>
                              <Button
                                className="billing-button"
                                onClick={() => this.onPriceClick('Trusted Car Reviews','6 month unlimited reviews', 3.99)}
                                >$3.99!</Button>
                              <Checkout
                                name={`Trusted Car Reviews`}
                                description={'6 month unlimited reviews'}
                                amount={3.99}
                                handlePaymentSuccess={this.handlePaymentSuccess}
                                handlePaymentFailure={this.handlePaymentFailure}
                              />  
                             
                            </CardBody>
                            </Card>
                            <Card>
                            <CardBody>
                              <CardTitle>1 month unlimited reviews Trial Level</CardTitle>
                              
                              <Button
                                className="billing-button"
                                onClick={() => this.onPriceClick('Trusted Car Reviews','1 month unlimited reviews', 0.99)}
                                >$0.99!</Button>
                              <Checkout
                                name={'Trusted Car Reviews'}
                                description={'1 month unlimited reviews'}
                                amount={0.99}
                                handlePaymentSuccess={this.handlePaymentSuccess}
                                handlePaymentFailure={this.handlePaymentFailure}
                              />
                            </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    </div>
                </Elements>
                </StripeProvider>
            </div>
        )
    }
    
  }
  
  export default (Billing);
  