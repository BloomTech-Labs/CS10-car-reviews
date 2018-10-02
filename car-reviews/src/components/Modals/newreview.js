import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
        edition: '',
        carImage: '',
        title: '',
        content: '',
        score: ''
      },
      selectedValues: {
        year: '',
        make: '',
        model: '',
        trim: ''
      },
      displayDropdowns: {
        year: false,
        model: false,
        trim: false
      },
      years: [],
      makes: [],
      models: [],
      trims: []
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
    console.log(' CURRENT STATE: ', newState);
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
        this.setState(newState, () => console.log(this.state));
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
    newState.displayDropdowns.trim = true;
    const searchTerms = {
      makeId: this.state.selectedValues.make.makeId,
      modelId
    };

    axios
      .get(
        `https://databases.one/api/?format=json&select=trim&make_id=${
          searchTerms.makeId
        }&model_id=${searchTerms.modelId}&api_key=${API_KEY}`
      )
      .then(res => {
        newState.trims = res.data.result;
        this.setState(newState, () => console.log(this.state));
      });
  };

  handleChangeTrim = e => {
    const { value } = e.target;
    const newState = Object.assign({}, this.state);
    this.state.trims.map(trim => {
      if (trim.trim === value)
        newState.selectedValues.trim = { trimId: trim.trim_id, trim: trim.trim };
      newState.review.edition = trim.trim;
    });
    this.setState(newState);
  };

  submitNewReview = () => {
    const newReview = this.state['review'];
    console.log('THE WHOLE STATE: ', this.state);
    console.log('CHCK FOR REVIEW: ', newReview);
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
            carImage: '',
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
          console.log('Cloudinary URL', fileURL);
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

              {this.state.displayDropdowns.trim ? (
                <select className="dropdowns" name="trim" onChange={this.handleChangeTrim}>
                  <option>Select a Trim</option>

                  {this.state.trims.map(trim => {
                    return <option key={trim.trim_id}>{trim.trim}</option>;
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
                style={{ height: '100%', width: '100%' }}
                alt=""
              />
            ) : (
              <Dropzone onDrop={this.handleDrop} multiple accept="image/*">
                <p>Click a picture to upload for your review</p>
              </Dropzone>
            )}
          </ModalBody>

          <ModalFooter className="new-review-footer">
            <form>
              <ReactStars
                type="number"
                name="score"
                edit={true}
                half={true}
                count={5}
                value={this.state.review.score}
                // this.state.review.score
                onChange={this.ratingChanged('review', 'score')}
                size={36}
                color2={'#ffd700'}
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
          <button className="submit-button" onClick={this.onClick}>
            Submit
          </button>
        </Modal>
      </div>
    );
  }
}

export default NewReviewModal;
