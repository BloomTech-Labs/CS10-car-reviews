import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class Billing extends Component {
    render(){
        return(
        <div>
            <h3> Billing </h3>
            <label> payment info</label>
            <CardElement/>
            <input type="checkbox" name="oneyear" value="oneyear"></input> 1 Year Subscription  = $9.99<br>
            </br>
            <input type="checkbox" name="onemonth" value="onemonth"></input>  1 Month Subscription  = $0.99< br>
            </br>
            <button> Buy Now</button>
        </div>
        )
    }
    
  }
  
  export default injectStripe(Billing);
  