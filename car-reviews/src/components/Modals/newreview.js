import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ReactStars from 'react-stars'

class NewReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      review: {
        year: Number(''),
        make: '',
        model: '',
        edition: '',
        carImage: undefined,
        title: '',
        content: '',
        score: Number('')
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
            carImage: undefined,
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

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      formData.append('upload_preset', 'ovqvnchc'); // Replace the preset name with your own
      formData.append('api_key', '425737191539185'); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post('https://api.cloudinary.com/v1_1/autoreveiewforyou/image/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          console.log(data);
          this.setState({ review: { ...this.state.review, carImage: fileURL } });
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      console.log('request finished', uploaders);
    });
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
            Review by: {this.props.userInfo.username}
          </ModalHeader>
          <ModalBody>
            {this.state.review.carImage ? (
              <img
                src={this.state.review.carImage}
                style={{ height: '160px', width: '320px' }}
              />
            ) : null}
            <Dropzone onDrop={this.handleDrop} multiple accept="image/*">
              {/* style={styles.dropzone} */}
              <p>Click a picture to upload for your review</p>
            </Dropzone>
          </ModalBody>
          <ModalFooter>
            <form>
              <ReactStars
              count={5}
              value={this.state.review.score}
              onChange={this.handleChange('review', 'score')}
              size={24}
              color2={'#ffd700'} />
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
          <input type="submit" onClick={this.onClick} />
        </Modal>
      </div>
    );
  }
}

export default NewReviewModal;
