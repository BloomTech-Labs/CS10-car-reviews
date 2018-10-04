import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText, Alert } from 'reactstrap';
import axios from 'axios';
import ReactStars from 'react-stars'
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
    // this.modelOpen();
    if(this.state.counter > 3 && !this.state.paid) {
      alert('Please pay for a subscription or come back tommorow for more free reviews!')
      return console.log('to many views');
    } else if(this.state.counter <= 3 || this.state.paid) {

      this.modelOpen();
      this.setState({
        modal: !this.state.modal
      });
    } else {
      console.log('there was a problem');
    }
    
  }

  modelOpen() {
    if(this.state.modal === true) {
      this.getUserCounter();
      this.updateUserCounter();
    }
  }


  



  getUserCounter = () => {
    // const newReview = this.state['review'];
    // const requestURL = 'https://back-lambda-car-reviews.herokuapp.com/api/reviews';
    // const localRequests = 'http://localhost:3001/api/reviews';
    // const counter = this.state.counter;
    axios
      .get('https://back-lambda-car-reviews.herokuapp.com/api/users/data', {
        headers: {
          JWT: localStorage.getItem('jwt')
        }
      })
      .then(response => {
        // console.log(response);
        console.log("Times Viewed:", response.data.timesViewed);
        const newstate = {counter: response.data.timesViewed}
        this.setState(newstate)
        
      })
      .catch(err => console.warn(err));
  };
  
  updateUserCounter = () => {
    const counter = this.state.counter;
    
    console.log('the counter is ',counter);
    const config = {
      headers: { 'jwt': localStorage.getItem('jwt') }
    };
    axios.put('https://back-lambda-car-reviews.herokuapp.com/api/users/data', { counter }, config)
      .then(response => {
        console.log("USER view count", response);
        const newstate = {counter: counter + 1, paid: response.data.paid}
        this.setState(newstate)
        // if (this.state.alerts.password) this.handleAlerts('password');
        // if (!this.state.alerts.passwordSuccess) this.handleAlerts('passwordSuccess');
         //localStorage.setItem('jwt', response.data.JWT);
      })
      .catch(err => {
        // if (!this.state.alerts.password) this.handleAlerts('password');
        // if (this.state.alerts.passwordSuccess) this.handleAlerts('passwordSuccess');
        console.warn(err);
      });
    }
  
  render() {
    const { score, createOn, title, content, carImage } = this.props;
    const { year, make, model, edition } = this.props.car;
    return (
      <div>
        <Button className="modal-button" onClick={this.toggle}>
            <p>{`${year} ${make} ${model}`}</p>
            <p>{`Review by: ${this.props.user.username}`}</p>
            <div style={{ height: '150px' }}>
              <img src={carImage ? carImage : defaultImg} style={{ height: '100%', maxWidth: '100%' }} alt=""/>
            </div>
            {/* <p>{edition}</p> */}
            <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={score}
              size={30}
              color2={'#ffd700'} />
            {/* <p>Star Rating {score}</p> */}
            {/* <CardText style={{ color: '#77A6F7'}}>{`Updated ${new Date(createOn).toString().substring(4,10)}`}</CardText> */}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modal-header">
            <p style={{ fontSize: '1.7em' }}>{`${year} ${make} ${model} ${edition}`}</p>
            <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={score}
              size={30}
              color2={'#ffd700'} />
            <p>Rating: {score} out of 5</p>
            {/* <h5>{`Review by: ${username}`}</h5> */}
          </ModalHeader>
          <ModalBody className="modal-body">
            {carImage ? <img src={carImage} style={{ height: '100%', width: '100%' }} alt=""/> : 
              <img src={defaultImg} style={{ height: '50%', width: '50%' }} alt=""/>}
            <p>{title}</p>
            <p>{content}</p>
          </ModalBody>
          {/* <ModalFooter className="modal-footer">
            <p style={{ textAlign: 'left' }}>{title}</p>
            <p style={{ textAlign: 'left' }}>{content}</p>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;