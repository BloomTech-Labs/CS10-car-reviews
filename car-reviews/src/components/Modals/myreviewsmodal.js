import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';
import EditableContent from './editablecontent';

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
    this.toggle();
  };

  render() {
    console.log('props', this.props);
    let EditableInfoP = EditableContent('p');
    let EditableInfoSpan = EditableContent('span');

    return (
      <div>
        <Button className="modal-button" onClick={this.toggle}>
          <img src={placeholder} style={{ height: '60px', width: '60px' }} />
          <p>{`Star Rating: ${this.props.score}`}</p>
          <p>{`${this.props.car.year} ${this.props.car.make} ${this.props.car.model}
 ${this.props.car.edition}`}</p>
          {/* <CardText className="cardText">{`Updated ${
                  review.updated_on
                }`}</CardText> */}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modal-header">
            <EditableInfoSpan name="year" value={this.props.car.year} id={this.props._id} />
            <span> </span>
            <EditableInfoSpan name="make" value={this.props.car.make} id={this.props._id} />
            <span> </span>
            <EditableInfoSpan name="model" value={this.props.car.model} id={this.props._id} />
            <span> </span>
            <EditableInfoSpan name="edition" value={this.props.car.edition} id={this.props._id} />
            <span> </span>
            {/* <p>
              {`${this.props.car.year} ${this.props.car.make} ${this.props.car.model} ${
                this.props.car.edition
              } `} */}
            <button onClick={() => this.deleteReview(this.props._id)}>delete</button>
            {/* </p> */}
            {/* <p>{`Review by: ${this.props.user.username}`}</p> */}
            <p>{`Rating: ${this.props.score} out of 5`}</p>
          </ModalHeader>
          <ModalBody className="modal-body">
            {this.props.carImage ? (
              <img src={this.props.carImage} style={{ height: '100%', width: '100%' }} />
            ) : null}
            <hr />
            <EditableInfoP name="title" value={this.props.title} id={this.props._id} />
            <EditableInfoP name="content" value={this.props.content} id={this.props._id} />
            {/* <p>{this.props.title}</p>
            <p>{this.props.content}</p> */}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MyReviewsModal;
