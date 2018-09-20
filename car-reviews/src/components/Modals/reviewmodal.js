import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';
//import data from '../../data';
// This component is the review modal.

class ReviewModal extends Component {
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
    const { score, year, make, model, edition, user, createOn, title, content } = this.props;
    return (
      <div>
        <div className="modal-button">
            <Button onClick={this.toggle} className={this.props.className}>
                <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                <p>Star Rating {score}</p>
                <p>{`${year} ${make} ${model}`}</p>
                <p>{edition}</p>
                <CardText className="cardText">{`Updated ${new Date(createOn).toString().substring(4,10)}`}</CardText>
            </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h2>{`${year} ${make} ${model} ${edition}`}</h2>
            <h5>{`Review by: ${user}`}</h5>
          </ModalHeader>
          <ModalBody>
            <img src={placeholder} style={{ height: '160px', width: '320px' }} />
            <p>Star Rating {score}</p>
          </ModalBody>
          <ModalFooter>
            <p>{title}</p>
            <p>{content}</p>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;