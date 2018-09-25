import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import placeholder from '../../logo.svg';
import axios from 'axios';
import './newreview.css'

class NewReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      review: {
        year: '',
        make: '',
        model: '',
        edition: '',
        // selectedImage: undefined,
        title: '',
        content: '',
        score: ''
      }
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  imageSelectedHandler = event => {
    // this.setState({
    //   selectedImage: event.target.files[0]
    // });
  };

  handleChange = (type, field) => event => {
    const newState = Object.assign({}, this.state);
    newState[type][field] = event.target.value;
    this.setState(newState);
  };

  submitNewReview = () => {
    const newReview = this.state['review'];
    const requestURL = 'https://back-lambda-car-reviews.herokuapp.com/api/reviews';
    const localRequests = 'http://localhost:3001/api/reviews';
    axios
      .post(localRequests, newReview, {
        headers: {
          JWT: localStorage.getItem('jwt')
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          review: {
            year: '',
            make: '',
            model: '',
            edition: '',
            // selectedImage: undefined,
            title: '',
            content: '',
            score: ''
          }
        });
      })
      .catch(err => console.warn(err));
  };

  onClick = event => {
    this.submitNewReview();
    this.toggle();
    window.location.reload(); // Need a way for the screen to rerender the changes without me doing it explicitly.
  };

  render() {
    return (
      <div>
        <button onClick={this.toggle} className={this.props.className}>
          {this.props.buttonLabel}
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <input
              type="number"
              name="year"
              min="1940"
              max="2019"
              value={this.state.review.year}
              onChange={this.handleChange('review', 'year')}
              placeholder="Year"
              className="review-input"
            />
            <input
              type="text"
              name="make"
              value={this.state.review.make}
              onChange={this.handleChange('review', 'make')}
              placeholder="Make"
              className="review-input"
            />
            <input
              type="text"
              name="model"
              value={this.state.review.model}
              onChange={this.handleChange('review', 'model')}
              placeholder="Model"
              className="review-input"
            />
            <input
              type="text"
              name="edition"
              value={this.state.review.edition}
              onChange={this.handleChange('review', 'edition')}
              placeholder="Edition"
              className="review-input"
            />
            {/* <div className="searchfields">
              <select className="dropdownsNR" name="car-years" id="car-years" />
              <select className="dropdownsNR" name="car-makes" id="car-makes" />
              <select className="dropdownsNR" name="car-models" id="car-models" />
              <select className="dropdownsNR" name="car-model-trims" id="car-model-trims" />
            </div> */}
            {/* Review by: {this.props.userInfo.username} */}
          </ModalHeader>
          <ModalBody>
            {/* {this.state.review.selectedImage ? (
              <img src={this.state.review.selectedImage} />
            ) : (
              <img src={placeholder} />
            )} */}
            {/* <img style={{ height: '160px', width: '320px' }} /> */}
            <input
              type="file"
              name="selectedImage"
              value={this.state.review.selectedImage}
              onChange={this.imageSelectedHandler}
            />
          </ModalBody>
          <ModalFooter className="new-review-footer">
            <form>
              <input
                type="number"
                min='0'
                max='5'
                name="score"
                value={this.state.review.score}
                onChange={this.handleChange('review', 'score')}
                placeholder="Please give a rating between 0-5"
                className="review-input"
              />
              <input
                type="text"
                name="title"
                value={this.state.review.title}
                onChange={this.handleChange('review', 'title')}
                placeholder="Write the title here..."
              />
              <p>
                <textarea
                  className="contentInput"
                  row="50"
                  cols="50"
                  placeholder="Write your review here..."
                  name="content"
                  value={this.state.review.content}
                  onChange={this.handleChange('review', 'content')}
                />
              </p>
            </form>
          </ModalFooter>
          <button className="submit-button" onClick={this.onClick} >
            Submit
          </button>
        </Modal>
      </div>
    );
  }
}

export default NewReviewModal;
