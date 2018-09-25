import React, { Component } from 'react';
import {CardElement, injectStripe, CardNumberElement} from 'react-stripe-elements';
import { Button} from 'reactstrap';
import {Elements, 
        StripeProvider, 
        CardExpiryElement,
        CardCVCElement,
        PostalCodeElement,
        PaymentRequestButtonElement} from 'react-stripe-elements';
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

    onPriceClick(name, description, price) {
        console.log(name, description, price);

        this.setState({ name, description, price });
      }
    render(){
        return(
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
                <Button color="primary" onClick={() => this.onPriceClick('Trusted Car Reviews','1 year unlimited reviews: 40% OFF!',  6.99)} >1 Year Subscription = 6.99</Button>
                <Button color="primary" onClick={() => this.onPriceClick('Trusted Car Reviews','6 month unlimited reviews: 33% OFF!', 3.99)} >6 month Subscription = 3.99</Button>
                <Button color="primary" onClick={() => this.onPriceClick('Trusted Car Reviews','1 month unlimited reviews', 0.99)} >1 month Subscription = 0.99</Button>
                <Checkout
                    name={this.state.name}
                    description={this.state.description}
                    amount={this.state.amount}
                />
                </div>
            </Elements>
            </StripeProvider>
            </div>
        )
    }
    
  }
  
  export default (Billing);
  