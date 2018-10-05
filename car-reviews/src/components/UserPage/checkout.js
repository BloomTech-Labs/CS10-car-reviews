import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = `pk_test_gyGeHhPwsQ6mp7K1lSleMa4c`;
const PAYMENT_SERVER_URL = 'http://localhost:3001/payment';
const DEPLOYED_PAYMENT_URL = `http://back-lambda-car-reviews.herokuapp.com/payment`;

const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful Thank you for your buisness');
  console.log('data is:', data);
};

const errorPayment = data => {
  alert('Payment Error, Please check your numbers and try again', data);
};

class Checkout extends React.Component {
  state = {
    redirect: false,
  }

  onToken = (amount, description) => token =>
    axios
      .post(
        DEPLOYED_PAYMENT_URL,
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
      .then((successPayment) => {
        this.props.handlePaymentSuccess();
        console.log(successPayment)
      })
      .catch((errorPayment) => {
        this.props.handlePaymentFailure();
        console.log(errorPayment);
  });

  render(){
    const { name, description, amount } = this.props;
    return (
      <div>
      <StripeCheckout
        name={name}
        description={description}
        amount={fromDollarToCent(amount)}
        token={this.onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        // email= {email} you could set an email to auto populate from the user here
      />
      </div>
    )
  }
};

export default Checkout;
