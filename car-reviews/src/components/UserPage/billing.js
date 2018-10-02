import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import {
    Card, 
    CardTitle,
    CardBody,
    Alert
  } from 'reactstrap';
import {Elements, StripeProvider} from 'react-stripe-elements';
import './billing.css'
import Checkout from './checkout';


class Billing extends Component {
    constructor(props) {
        super(props);

            this.state = {
                name: '',
                description:'',
                amount: 0.00,
                subscription: 0
            };
    };

    onPriceClick(name, description, amount) {
        
        this.setState({ name, description, amount });
        
      }
    render(){
        return(
            <Container className="billing-container">
                <div className="BillingBox">
                <h3> Billing </h3>
                <label> payment info</label>
                <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <Elements>
                    <div className="PurchaseCard">
    {/*             
                    <CardNumberElement/>
                    <CardExpiryElement/>
                    <CardCVCElement/>
                    <PostalCodeElement/> */}
                    <Row> 
                        <Col md="4">
                        <Card>
                        <CardBody>
                          <CardTitle>1 year unlimited reviews: 40% OFF!</CardTitle>
                          <form onSubmit={this.handleSubmitPassword}>
                          
                            <Button className="button" color="primary" onClick={() => this.onPriceClick('Trusted Car Reviews','1 year unlimited reviews',  6.99)} >1 Year Subscription = 6.99</Button>
                            <Checkout
                            name={this.state.name}
                            description={this.state.description}
                            amount={this.state.amount}
                            />
                            </form>
                        </CardBody>
                        </Card>
                        </Col>   
                    </Row> 
                    <Row> 
                        <Col md="4">
                        <Card>
                        <CardBody>
                          <CardTitle>6 month unlimited reviews: 33% OFF!</CardTitle>
                          <form onSubmit={this.handleSubmitPassword}>
                          
                          <Button className="button" color="primary" onClick={() => this.onPriceClick('Trusted Car Reviews','6 month unlimited reviews', 3.99)} >6 month Subscription = 3.99</Button>
                          <Checkout
                            name={this.state.name}
                            description={this.state.description}
                            amount={this.state.amount}
                          />  
                            </form>
                        </CardBody>
                        </Card>
                        </Col>
                    </Row> 
                    <Row> 
                    <Col md="4">
                        <Card>
                        <CardBody>
                          <CardTitle>1 month unlimited reviews</CardTitle>
                          <form onSubmit={this.handleSubmitPassword}>
                          
                          <Button className="button" color="primary" onClick={() => this.onPriceClick('Trusted Car Reviews','1 month unlimited reviews', 0.99)} >1 month Subscription = 0.99</Button>
                          <Checkout
                            name={this.state.name}
                            description={this.state.description}
                            amount={this.state.amount}
                          />
                            </form>
                        </CardBody>
                        </Card>
                        </Col>
                              
                    </Row> 
                    </div>
                </Elements>
                </StripeProvider>
                </div>
            </Container>
        )
    }
    
  }
  
  export default (Billing);
  