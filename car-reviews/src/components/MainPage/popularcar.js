import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './mainpage.css';
import defaultImg from '../Assets/default_img.png';

const backendURL = process.env.REACT_APP_BACKEND_URL;

class PopularCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: props.imageURL[0],
      selectedValues: {
        year: props.year,
        make: props.make,
        model: props.model
      },
      searching: false,
      searchResults: []
    };
  }

  searchFunction = () => {
    const { year, make, model } = this.state.selectedValues;
    axios
      .post(`${backendURL}/api/reviews/search`, {
        year,
        make,
        model
      })
      .then(response => {
        this.setState({ searchResults: response.data, searching: true });
      })
      .catch(err => {
        console.log('ERROR: ', err.message);
      });
  };

  handleRedirect = () => {
    if (this.state.searching) {
      return (
        <Redirect
          push
          to={{
            pathname: '/searchpage',
            state: {
              isLoggedIn: this.props.isLoggedIn,
              searchResults: this.state.searchResults,
              currentPage: '/searchpage'
            }
          }}
        />
      );
    } else {
      return <Fragment />;
    }
  };

  render() {
    const { make, model } = this.props;
    const { imageURL } = this.state;
    return (
      <div>
        {this.handleRedirect()}
        <Button className="modal-button" onClick={() => this.searchFunction()}>
          <p style={{ fontSize: '1.1em' }}>{` ${make} ${model}`}</p>
          <div style={{ height: '150px' }}>
            <img
              src={imageURL ? imageURL : defaultImg}
              style={{ height: '100%', maxWidth: '100%' }}
              alt=""
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }} />
        </Button>
      </div>
    );
  }
}

export default PopularCar;
