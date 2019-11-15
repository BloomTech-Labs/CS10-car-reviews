import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { Elements, StripeProvider } from 'react-stripe-elements';
import './billing.css';
import Checkout from './checkout';

const stripeKey = process.env.REACT_APP_STRIPE_KEY;

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      amount: 0.0,
      subscription: 0
    };
  }

  onPriceClick(name, description, amount) {
    this.setState({ name, description, amount });
  }
  render() {
    return (
      <div className="billing-container">
        <StripeProvider apiKey={stripeKey}>
          <Elements>
            <div>
              <Row>
                <Col>
                  <Card style={{ border: 'none' }}>
                    <CardBody>
                      <CardTitle>1 year unlimited reviews: 40% OFF!</CardTitle>
                      <Button
                        className="billing-button"
                        onClick={() =>
                          this.onPriceClick('Trusted Car Reviews', '1 year unlimited reviews', 6.99)
                        }
                      >
                        $6.99!
                      </Button>
                      <Checkout
                        name={'Trusted Car Reviews'}
                        description={'1 year unlimited reviews'}
                        amount={6.99}
                      />
                    </CardBody>
                  </Card>
                  <Card style={{ border: 'none' }}>
                    <CardBody>
                      <CardTitle>6 month unlimited reviews: 33% OFF!</CardTitle>
                      <Button
                        className="billing-button"
                        onClick={() =>
                          this.onPriceClick(
                            'Trusted Car Reviews',
                            '6 month unlimited reviews',
                            3.99
                          )
                        }
                      >
                        $3.99!
                      </Button>
                      <Checkout
                        name={`Trusted Car Reviews`}
                        description={'6 month unlimited reviews'}
                        amount={3.99}
                      />
                    </CardBody>
                  </Card>
                  <Card style={{ border: 'none' }}>
                    <CardBody>
                      <CardTitle>1 month unlimited reviews Trial Level</CardTitle>

                      <Button
                        className="billing-button"
                        onClick={() =>
                          this.onPriceClick(
                            'Trusted Car Reviews',
                            '1 month unlimited reviews',
                            0.99
                          )
                        }
                      >
                        $0.99!
                      </Button>
                      <Checkout
                        name={'Trusted Car Reviews'}
                        description={'1 month unlimited reviews'}
                        amount={0.99}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
