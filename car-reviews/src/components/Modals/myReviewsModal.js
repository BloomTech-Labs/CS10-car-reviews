import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';

class MyReviewsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <div className="modal-button">
          {this.props.data.reviews.map(review => {
            return (
              <Button onClick={this.toggle} className={this.props.className} key={review._id}>
                <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                <p>{`Star Rating: ${review.score}`}</p>
                <p>{`${review.car.year} ${review.car.make} ${review.car.model}`}</p>
                <p>{review.car.edition}</p>
                {/* <CardText className="cardText">{`Updated ${
                  review.updated_on
                }`}</CardText> */}
              </Button>
            );
          })}
        </div>
        <div>
          {this.props.data.reviews.map(review => {
            return (
              <Modal isOpen={this.state.modal} toggle={this.toggle} key={review._id}>
                <ModalHeader toggle={this.toggle}>
                  <p>{`${review.car.year} ${review.car.make} ${review.car.model} ${
                    review.car.edition
                  }`}</p>
                  <p>{`Review by: ${this.props.data.user.username}`}</p>
                </ModalHeader>
                <ModalBody>
                  <img src={placeholder} style={{ height: '160px', width: '320px' }} />
                  <p>{`Star Rating: ${review.score}`}</p>
                </ModalBody>
                <ModalFooter>
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

export default MyReviewsModal;
