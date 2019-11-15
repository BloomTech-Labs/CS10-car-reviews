import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import ReactStars from 'react-stars';
import './reviewmodal.css';
import defaultImg from '../Assets/default_img.png';

// This component is the review modal. It is rendered in maincontent.js

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      counter: 0,
      paid: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if (this.state.counter > 3 && !this.state.paid) {
      alert('Please pay for a subscription or come back tomorrow for more free reviews!');
      return;
    } else if (this.state.counter <= 3 || this.state.paid) {
      this.modelOpen();
      this.setState({
        modal: !this.state.modal
      });
    } else {
      console.log('there was a problem');
    }
  }

  modelOpen() {
    if (this.state.modal === true) {
      this.getUserCounter();
      this.updateUserCounter();
    }
  }

  getUserCounter = () => {
    axios
      .get('https://back-lambda-car-reviews.herokuapp.com/api/users/data', {
        headers: {
          JWT: localStorage.getItem('jwt')
        }
      })
      .then(response => {
        const newstate = { counter: response.data.timesViewed };
        this.setState(newstate);
      })
      .catch(err => console.warn(err));
  };

  updateUserCounter = () => {
    const counter = this.state.counter;

    const config = {
      headers: { jwt: localStorage.getItem('jwt') }
    };
    axios
      .put('https://back-lambda-car-reviews.herokuapp.com/api/users/data', { counter }, config)
      .then(response => {
        const newstate = { counter: counter + 1, paid: response.data.paid };
        this.setState(newstate);
      })
      .catch(err => {
        console.warn(err);
      });
  };

  render() {
    const { score, title, content, carImage } = this.props;
    const { year, make, model } = this.props.car;
    return (
      <div className="button-container">
        <Button className="modal-button" onClick={this.toggle}>
          <p style={{ fontSize: '1.1em' }}>{`${year} ${make} ${model}`}</p>
          <div style={{ height: '150px' }}>
            <img
              src={carImage ? carImage : defaultImg}
              style={{ maxHeight: '100%', maxWidth: '100%' }}
              alt=""
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactStars
              type="number"
              name="score"
              edit={false}
              half={true}
              count={5}
              value={score}
              size={30}
              color2={'#ffd700'}
            />
          </div>
          <p style={{ fontSize: '.8em' }}>{`Review by: ${this.props.user.username}`}</p>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modal-header">
            <p style={{ fontSize: '1.7em' }}>{`${year} ${make} ${model}`}</p>
            <ReactStars
              type="number"
              name="score"
              edit={false}
              half={true}
              count={5}
              value={score}
              size={30}
              color2={'#ffd700'}
            />
          </ModalHeader>
          <ModalBody className="modal-body">
            {carImage ? (
              <img src={carImage} style={{ height: '100%', width: '100%' }} alt="" />
            ) : (
              <img src={defaultImg} style={{ height: '50%', width: '50%' }} alt="" />
            )}
            <p>{title}</p>
            <p>{content}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;
