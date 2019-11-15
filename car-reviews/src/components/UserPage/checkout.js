import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = `pk_test_gyGeHhPwsQ6mp7K1lSleMa4c`;
const PAYMENT_SERVER_URL = 'https://back-lambda-car-reviews.herokuapp.com/payment';

const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;

const successPayment = () => {
  alert('Payment Successful: Thank you for your subscription!');
};

const errorPayment = data => {
  alert('Payment Error, Please check your card information and try again', data);
};

const onToken = (amount, description) => token =>
  axios
    .post(
      PAYMENT_SERVER_URL,
      {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromDollarToCent(amount)
      },
      {
        headers: {
          JWT: localStorage.getItem('jwt')
        }
      }
    )
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
