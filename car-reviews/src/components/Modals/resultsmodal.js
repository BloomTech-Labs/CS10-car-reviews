import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText, Alert } from 'reactstrap';
import axios from 'axios';
import ReactStars from 'react-stars'
// import '../MainPage/mainpage.css';
import './reviewmodal.css';

// This component is the review modal. It is rendered in maincontent.js

class ResultsModal extends Component {
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
    
    if(this.state.modal == true) {
      this.getUserCounter();
      this.updateUserCounter();
    }
  }


  



  getUserCounter = () => {
    // const newReview = this.state['review'];
    // const requestURL = 'https://back-lambda-car-reviews.herokuapp.com/api/reviews';
    // const localRequests = 'http://localhost:3001/api/reviews';
    const counter = this.state.counter;
    axios
      .get('http://localhost:3001/api/users/data', {
        headers: {
          JWT: localStorage.getItem('jwt')
        }
      })
      .then(response => {
        // console.log(response);
        console.log(response.data.timesViewed);
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
    axios.put('http://localhost:3001/api/users/data', { counter }, config)
      .then(response => {
        console.log(response);
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
    ///////////////////////////////////////////////
  
  render() {
    // ** NOTE: You shouldn't try and destructure values that may or may not be on the object, as it will crash the whole app (carImage, for example)
      const { year, make, model, edition } = this.props;
      const { title, content, score, user } = this.props.reviews[0];
      console.log("RESULTS MODAL PROPS: ", this.props);
      
    return (
      <div>
        <Button className='modal-button' onClick={this.toggle}>
            { /*this.props.reviews[0].carImage ? <img src={carImage} style={{ height: '100%', width: '100%' }} /> : <Fragment /> */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}>
              <p style={{marginRight: 5, marginBottom: 2}}>{year}</p>
              <p style={{marginRight: 5, marginBottom: 2}}> {make} </p>
              <p style={{marginRight: 5, marginBottom: 2}}> {model} </p>
              <p style={{marginRight: 5, marginBottom: 2}}> {edition} </p>
            </div>
            <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={score}
              size={36}
              color2={'#ffd700'} />
            <p>Star Rating {score}</p>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modal-header">
            <h2>{`${year} ${make} ${model} ${edition}`}</h2>
            <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={score}
              size={36}
              color2={'#ffd700'} />
            <h5>{`Review by: ${user}`}</h5>
          </ModalHeader>
          <ModalBody className="modal-body">
            {/* <img src={carImage} style={{ height: '100%', width: '100%' }} /> */}
            <p>{title}</p>
            <p>{content}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ResultsModal;

