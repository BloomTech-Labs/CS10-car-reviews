import React, { Component } from 'react';
import {CardElement, injectStripe, CardNumberElement} from 'react-stripe-elements';
import {Elements, 
        StripeProvider, 
        CardExpiryElement,
        CardCVCElement,
        PostalCodeElement,
        PaymentRequestButtonElement} from 'react-stripe-elements';
import './billing.css'
import Checkout from './checkout';

class Billing extends Component {
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
                <input type="checkbox" name="oneyear" value="oneyear"></input> 1 Year Subscription = $9.99<br>
                </br>
                <input type="checkbox" name="onemonth" value="onemonth"></input>  1 Month Subscriptio = $0.99< br>
                </br>
                <Checkout
                    name={'oneyear'}
                    description={'1 year subscription'}
                    amount={9.99}
                />
                </div>
            </Elements>
            </StripeProvider>
            </div>
        )
    }
    
  }
  
  export default (Billing);
  