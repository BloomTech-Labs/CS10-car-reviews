import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';
import axios from 'axios';
// import EditableContent from './editablecontent';

class ReviewEditModal extends Component {
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


  save = () => {

            console.log('The save is being called' , this.state)
          const editedContent = {title: this.state.title , content: this.state.content, score: this.state.score, carImage: this.state.carImage};
          const config = {
            headers: {
              JWT: localStorage.getItem('jwt')
            }
          };

          axios
            .put(`https://back-lambda-car-reviews.herokuapp.com/api/reviews/${this.props.id}`, editedContent, config)
            .then(response => {
              console.log('editNote:', response);
            })
            .catch(err => {
              console.log('Error: ', err);
            });
    }

  updateReview = id => {
    // this.props.removeReview(id);
    // this.toggle();
    // save();
   //  this.props.updateReview(id, this.props.title )
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
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modal-header">
           
            <p>
              {`${this.props.car.year} ${this.props.car.make} ${this.props.car.model} ${
                this.props.car.edition
              } `}
            <button onClick={() => this.deleteReview(this.props._id)}>delete review</button>
            <button onClick={() => this.updateReview()}>edit review</button>
            </p>
            {/* <p>{`Review by: ${this.props.user.username}`}</p> */}
            <p>{`Rating: ${this.props.score} out of 5`}</p>
          </ModalHeader>
          <ModalBody className="modal-body">
            {this.props.carImage ? (
              <img src={this.props.carImage} style={{ height: '100%', width: '100%' }} />
            ) : null}
            <hr />
            {/* <EditableInfoP name="title" value={this.state.title} onChange={this.save()} id={this.props._id} /> */}
            {/* <EditableInfoP name="content" value={this.state.content} id={this.props._id} /> */}
            <p onchange = {save()}>{this.props.title}</p>
            <p>{this.props.content}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ReviewEditModal;
