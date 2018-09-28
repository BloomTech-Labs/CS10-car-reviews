import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText, Input } from 'reactstrap';
import placeholder from '../../logo.svg';
import axios from 'axios';
import EditableContent from './editablecontent';
import './myreviewsmodal.css';
import ReactStars from 'react-stars'

class MyReviewsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: this.props.title, 
      content: this.props.content,
      score: this.props.score,
      carImage: this.props.carImage
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


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  save = () => {

    console.log('The save is being called' , this.state)
  const editedContent = {title: this.state.title , content: this.state.content, score: this.state.score, carImage: this.state.carImage};
  const config = {
    headers: {
      JWT: localStorage.getItem('jwt')
    }
  };

  axios
    .put(`http://localhost:3001/api/reviews/${this.props._id}`, editedContent, config)
    .then(response => {
      console.log('editNote:', response);
    })
    .catch(err => {
      console.log('Error: ', err);
    });

    this.toggle();
}

  render() {
    console.log('props', this.props);

    return (
      <div>
        <Button className="my-modal-button" onClick={this.toggle}>
          <img src={this.props.carImage} style={{ height: '100%', width: '100%' }} />
          <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={this.props.score}
              size={36}
              color2={'#ffd700'} />
          <p>{`Star Rating: ${this.props.score}`}</p>
          <p>{`${this.props.car.year} ${this.props.car.make} ${this.props.car.model}
 ${this.props.car.edition}`}</p>
          {/* <CardText className="cardText">{`Updated ${
                  review.updated_on
                }`}</CardText> */}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="my-modal-header">
            <p>
              {`${this.props.car.year} ${this.props.car.make} ${this.props.car.model} ${
                this.props.car.edition
              } `}
            <button onClick={() => this.deleteReview(this.props._id)}>delete review</button>
            <button onClick={() => this.save()}>edit review</button>
            </p>
            {/* <p>{`Review by: ${this.props.user.username}`}</p> */}
            <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={this.props.score}
              size={36}
              color2={'#ffd700'} />
            <p>{`Rating: ${this.props.score} out of 5`}</p>
          </ModalHeader>
          <ModalBody className="my-modal-body">
            {this.props.carImage ? (
              <img src={this.props.carImage} style={{ height: '100%', width: '100%' }} />
            ) : null}
            <hr />
            <Input name='title' type='text' onChange={this.handleChange} value={this.state.title}>{this.props.title}</Input>
            <Input name='content' type='text' onChange={this.handleChange} value={this.state.content}>{this.props.content}</Input>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MyReviewsModal;
