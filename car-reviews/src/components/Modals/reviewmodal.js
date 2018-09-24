import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';
// import '../MainPage/mainpage.css';
import './reviewmodal.css';

// This component is the review modal. It is rendered in maincontent.js

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
    const { score, createOn, title, content } = this.props;
    const { year, make, model, edition } = this.props.car;
    const { username } = this.props.user;
    return (
      <div>
        <Button className="main-card" onClick={this.toggle}>
            <img src={placeholder} style={{ height: '60px', width: '25%' }} />
            <p>Star Rating {score}</p>
            <p>{`${year} ${make} ${model}`}</p>
            <p>{edition}</p>
            <CardText className="cardText">{`Updated ${new Date(createOn).toString().substring(4,10)}`}</CardText>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h2>{`${year} ${make} ${model} ${edition}`}</h2>
            <h5>{`Review by: ${username}`}</h5>
          </ModalHeader>
          <ModalBody>
            <img src={placeholder} style={{ height: '160px', width: '50%' }} />
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