import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';
//import data from '../../data';
import axios from 'axios';

// This component is the review modal. Currently it is a placeholder,

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      reviews: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount() {
    const localURL = "http://localhost:3002/api/popular/featured_reviews"
    const deployedURL = "https://back-lambda-car-reviews.herokuapp.com/api/popular/featured_reviews"
    axios 
      .get(localURL)
      .then(response => {
          this.setState({ reviews: response.data });
      })
      .catch(error => {
          console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div>
        <div className="modal-button">
          {this.state.reviews.map(review => {
            return (
              <Button onClick={this.toggle} className={this.props.className} key={review._id}>
                <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                <p>Star Rating {review.score}</p>
                <p>{`${review.car.year} ${review.car.make} ${review.car.model}`}</p>
                <p>{review.car.edition}</p>
                <CardText className="cardText">{`Updated ${review.createOn}`}</CardText>
              </Button>
            );
          })}
        </div>
        <div>
          {this.state.reviews.map(review => {
            return (
              <Modal isOpen={this.state.modal} toggle={this.toggle} key={review.username}>
                <ModalHeader toggle={this.toggle}>
                  <h2>{`${review.car.year} ${review.car.make} ${review.car.model} ${review.car.edition}`}</h2>
                  <h5>{`Review by: ${review.user.username}`}</h5>
                </ModalHeader>
                <ModalBody>
                  <img src={placeholder} style={{ height: '160px', width: '320px' }} />
                  <p>Star Rating {review.score}</p>
                </ModalBody>
                <ModalFooter>
                  <p>{review.title}</p>
                  <p>{review.content}</p>
                </ModalFooter>
              </Modal>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ModalExample;
