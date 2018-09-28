import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = `pk_test_gyGeHhPwsQ6mp7K1lSleMa4c`;
const PAYMENT_SERVER_URL = 'http://localhost:3001/Payment';

const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;
console.log('this is props: ', this.props);

const successPayment = data => {
  alert('Payment Successful Thank you for your buisness');
  console.log('data is:' ,data);
};

const errorPayment = data => {
  alert('Payment Error, Please check your numbers and try again', data);
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
    // email= {email} you could set an email to auto populate from the user here
  />

export default Checkout;