import React, { Component, Fragment } from 'react';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ReactStars from 'react-stars';
import './newreview.css';

const API_KEY = process.env.REACT_APP_API_KEY;

class NewReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      modal: false,
      review: {
        year: '',
        make: '',
        model: '',
        carImage: '',
        title: '',
        content: '',
        score: '',
        testEntry: false,
      },
      selectedValues: {
        year: '',
        make: '',
        model: ''
      },
      displayDropdowns: {
        year: false,
        model: false
      },
      alerts: {
        carInputErr: false,
        reviewInputErr: false,
        scoreInputErr: false
      },
      years: [],
      makes: [],
      models: [],
      success: false
    };
  }

  componentDidMount() {
    axios
      .get(`https://databases.one/api/?format=json&select=make&api_key=${API_KEY}`)
      .then(res => {
        this.setState({ makes: res.data.result });
      })
      .catch(err => {
        console.warn(err);
        alert('There was an error, please reload the page');
      });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  ratingChanged = (type, field) => event => {
    const newState = Object.assign({}, this.state);
    newState[type][field] = event;
    this.setState(newState);
  };

  handleChange = (type, field) => event => {
    const newState = Object.assign({}, this.state);
    newState[type][field] = event.target.value;
    this.setState(newState);
  };

  handleChangeMake = e => {
    const { value } = e.target;
    const newMake = {
      make: value,
      makeId: ''
    };
    this.state.makes.map(make => {
      if (make.make === value) newMake.makeId = make.make_id;
    });

    const newState = Object.assign({}, this.state);
    newState.selectedValues.make = newMake;
    newState.review.make = newMake.make;
    newState.displayDropdowns.year = true;

    axios
      .get(
        `https://databases.one/api/?format=json&select=year&make_id=${
          newState.selectedValues.make.makeId
        }&api_key=${API_KEY}`
      )
      .then(res => {
        newState.years = res.data.result.reverse();
        this.setState(newState);
      })
      .catch(err => console.warn(`There was an error getting the years for that make: \n${err}`));
  };

  handleChangeYear = e => {
    const value = parseInt(e.target.value, 10);
    const { makeId } = this.state.selectedValues.make;
    const newState = Object.assign({}, this.state);
    newState.selectedValues.year = value;
    newState.review.year = value;
    newState.displayDropdowns.model = true;
    axios
      .get(
        `https://databases.one/api/?format=json&select=model&make_id=${makeId}&api_key=${API_KEY}`
      )
      .then(res => {
        newState.models = res.data.result;
        this.setState(newState);
      });
  };

  handleChangeModels = e => {
    const { value } = e.target;
    const newState = Object.assign({}, this.state);
    let modelId;
    this.state.models.map(model => {
      if (value === model.model) modelId = model.model_id;
    });

    newState.selectedValues.model = { model: value, modelId };
    newState.review.model = value;
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
            carImage: '',
            title: '',
            content: '',
            score: '', 
            testEntry: false,
          },
          alerts: {
            carInputErr: false,
            reviewInputErr: false,
            scoreInputErr: false
          },
          success: true
        });

        if (this.state.success) {
          this.props.addReview();
          this.toggle();
        }
      })
      .catch(err => {
        this.setState({ success: false });
        this.reviewValidation(newReview);
        console.warn(err);
      });
  };

  reviewValidation = review => {
    const { year, make, model, title, content, score } = review;

    if (year.length === 0 || make.length === 0 || model.length === 0) {
      this.setState({
        alerts: {
          ...this.state.alerts,
          carInputErr: true
        }
      });
    } else {
      this.setState({
        alerts: {
          ...this.state.alerts,
          carInputErr: false
        }
      });
    }

    if (title.length === 0 || content.length === 0) {
      this.setState({
        alerts: {
          ...this.state.alerts,
          reviewInputErr: true
        }
      });
    } else {
      this.setState({
        alerts: {
          ...this.state.alerts,
          reviewInputErr: false
        }
      });
    }

    if (score.length === 0) {
      this.setState({
        alerts: {
          ...this.state.alerts,
          scoreInputErr: true
        }
      });
    } else {
      this.setState({
        alerts: {
          ...this.state.alerts,
          scoreInputErr: false
        }
      });
    }
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
            <div style={{}}>
              <select className="dropdowns" name="make" onChange={this.handleChangeMake}>
                <option>Select a Make</option>
                {this.state.makes.map(make => {
                  return <option key={make.make_id}>{make.make}</option>;
                })}
              </select>

              {this.state.displayDropdowns.year ? (
                <select className="dropdowns" name="year" onChange={this.handleChangeYear}>
                  <option>Select a Year</option>
                  {this.state.years.map(year => {
                    return <option key={year.year}>{year.year}</option>;
                  })}
                </select>
              ) : (
                <Fragment />
              )}

              {this.state.displayDropdowns.model ? (
                <select className="dropdowns" name="model" onChange={this.handleChangeModels}>
                  <option>Select a Model</option>
                  {this.state.models.map(model => {
                    return <option key={model.model_id}>{model.model}</option>;
                  })}
                </select>
              ) : (
                <Fragment />
              )}
            </div>
          </ModalHeader>

          <ModalBody className="drop-zone">
            {this.state.review.carImage ? (
              <img
                src={this.state.review.carImage}
                style={{ height: '100%', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
                alt=""
              />
            ) : (
              <Dropzone onDrop={this.handleDrop} multiple accept="image/*">
                <p>Click a picture to upload for your review</p>
              </Dropzone>
            )}
          </ModalBody>

          <ModalFooter className="new-review-footer">
            <form style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <ReactStars
                type="number"
                name="score"
                edit={true}
                half={true}
                count={5}
                value={Number(this.state.review.score)}
                onChange={this.ratingChanged('review', 'score')}
                size={30}
                color2={'#ffd700'}
              />

              <input
                type="text"
                name="title"
                className='content-input'
                value={this.state.review.title}
                onChange={this.handleChange('review', 'title')}
                placeholder="Write the title here..."
              />
              <p>
                <textarea
                  className="content-input"
                  row="50"
                  cols="50"
                  placeholder="Write your review here..."
                  name="content"
                  value={this.state.review.content}
                  onChange={this.handleChange('review', 'content')}
                />
              </p>
              <Alert isOpen={this.state.alerts.carInputErr} color="danger">
                Please select a car make, year, and model to create a car review
              </Alert>
              <Alert isOpen={this.state.alerts.reviewInputErr} color="danger">
                Please provide a title and content to create a car review
              </Alert>
              <Alert isOpen={this.state.alerts.scoreInputErr} color="danger">
                Please provide a rating for the car you are reviewing
              </Alert>
            </form>
          </ModalFooter>
          <button className="submit-button" onClick={this.submitNewReview}>
            Submit
          </button>
        </Modal>
      </div>
    );
  }
}

export default NewReviewModal;
