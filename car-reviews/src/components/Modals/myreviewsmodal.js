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

  deleteReview = id => {
    this.props.removeReview(id);
  };

  render() {
    console.log('props', this.props);
    return (
      <div>
        <Button className="modal-button" onClick={this.toggle} className={this.props.className}>
          <img src={placeholder} style={{ height: '60px', width: '60px' }} />
          <p>{`Star Rating: ${this.props.score}`}</p>
          <p>{`${this.props.car.year} ${this.props.car.make} ${this.props.car.model}
 ${this.props.car.edition}`}</p>
          {/* <CardText className="cardText">{`Updated ${
                  review.updated_on
                }`}</CardText> */}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-header">
          <ModalHeader toggle={this.toggle}>
            <p>
              {`${this.props.car.year} ${this.props.car.make} ${this.props.car.model} ${
                this.props.car.edition
              }`}
              <button onClick={() => this.deleteReview(this.props._id)}>delete</button>
            </p>
            {/* <p>{`Review by: ${this.props.user.username}`}</p> */}
          </ModalHeader>
          <ModalBody className="modal-body">
            {this.props.carImage ? (
              <img src={this.props.carImage} style={{ height: '160px', width: '320px' }} />
            ) : null}
            <p>{`Star Rating: ${this.props.score}`}</p>
            <hr />
            <p>{this.props.title}</p>
            <p>{this.props.content}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MyReviewsModal;
