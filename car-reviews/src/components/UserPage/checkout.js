import React, {Component} from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';


const STRIPE_PUBLISHABLE = `pk_test_gyGeHhPwsQ6mp7K1lSleMa4c`;
const PAYMENT_SERVER_URL = 'http://localhost:3001/Payment';
const stripe = require("stripe")(STRIPE_PUBLISHABLE);


const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;
console.log(this.props);

const successPayment = data => {
  alert('Payment Successful');
  console.log('data is:' ,data);
  const customer = stripe.customers.create({
    email: data.email,
    // source: 'src_18eYalAHEMiOZZp1l9ZTjSU0',
  });
};

const errorPayment = data => {
  alert('Payment Error, Please check your numbers and try again');
};


const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    }, {
      headers: {
        JWT: localStorage.getItem('jwt')
      }
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;