import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import placeholder from '../../logo.svg';
import axios from 'axios';

class NewReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      modal: false,
      review: {
        year: Number(''),
        make: '',
        model: '',
        edition: '',
        // selectedImage: undefined,
        content: '',
        score: Number('')
      }
    };
  }

  componentDidMount = () => {
    axios
      .get('https://back-lambda-car-reviews.herokuapp.com/api/users/data', {
        headers: {
          JWT: localStorage.getItem('jwt')
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({ userInfo: response.data });
      })
      .catch(console.log('Error getting user data'));
  };

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
    axios
      .post(requestURL, newReview, {
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
              type="text"
              name="year"
              value={this.state.review.year}
              onChange={this.handleChange('review', 'year')}
              placeholder="car-year"
            />
            <input
              type="text"
              name="make"
              value={this.state.review.make}
              onChange={this.handleChange('review', 'make')}
              placeholder="car-make"
            />
            <input
              type="text"
              name="model"
              value={this.state.review.model}
              onChange={this.handleChange('review', 'model')}
              placeholder="car-model"
            />
            <input
              type="text"
              name="edition"
              value={this.state.review.edition}
              onChange={this.handleChange('review', 'edition')}
              placeholder="car-edition"
            />
            {/* <div className="searchfields">
              <select className="dropdownsNR" name="car-years" id="car-years" />
              <select className="dropdownsNR" name="car-makes" id="car-makes" />
              <select className="dropdownsNR" name="car-models" id="car-models" />
              <select className="dropdownsNR" name="car-model-trims" id="car-model-trims" />
            </div> */}
            Review by: {this.state.userInfo.username}
          </ModalHeader>
          <ModalBody>
            {this.state.review.selectedImage ? (
              <img src={this.state.review.selectedImage} />
            ) : (
              <img src={placeholder} />
            )}
            {/* <img style={{ height: '160px', width: '320px' }} /> */}
            <input
              type="file"
              name="selectedImage"
              value={this.state.review.selectedImage}
              onChange={this.imageSelectedHandler}
            />
          </ModalBody>
          <ModalFooter>
            <form>
              <input
                type="text"
                name="score"
                value={this.state.review.score}
                onChange={this.handleChange('review', 'score')}
                placeholder="car-score"
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
          <input type="submit" onClick={this.onClick} />
        </Modal>
      </div>
    );
  }
}

export default NewReviewModal;
