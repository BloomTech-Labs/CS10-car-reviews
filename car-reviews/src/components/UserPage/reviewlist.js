import React, { Component } from 'react';
import './reviewlist.css';
import { Col } from 'reactstrap';
import MyReviewsModal from '../Modals/myreviewsmodal';
import NewReviewModal from '../Modals/newreview';
import axios from 'axios';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reviews: [],
        user: []
      }
    };
  }

  componentDidMount = () => {
    const config = {
      headers: {
        JWT: localStorage.getItem('jwt')
      }
    };
    // const requestURL = 'https://back-lambda-car-reviews.herokuapp.com/api/users/data';

    axios
      .all([
        axios.get('http://localhost:3001/api/users/data', config),
        axios.get('http://localhost:3001/api/reviews', config)
      ])
      .then(
        axios.spread((userRes, reviewsRes) => {
          this.setState({
            data: { ...this.state.data, reviews: reviewsRes.data, user: userRes.data }
          });
        })
      );
  };

  handleRemove = id => {
    const config = {
      headers: {
        JWT: localStorage.getItem('jwt')
      }
    };

    axios
      .delete(`http://localhost:3001/api/reviews/${id}`, config)
      .then(response => {
        console.log('deleteNote:', response);
      })
      .catch(err => {
        console.log('Error: ', err);
      });

    window.location.reload();
  };


  // handleUpdate = id => {
  //   const config = {
  //     headers: {
  //       JWT: localStorage.getItem('jwt')
  //     }
  //   };

  //   axios
  //     .put(`http://localhost:3001/api/reviews/${id}`, config)
  //     .then(response => {
  //       console.log('deleteNote:', response);
  //     })
  //     .catch(err => {
  //       console.log('Error: ', err);
  //     });

  //   window.location.reload();
  // };

  render() {
    const fullScreenReview = (
      <div className="fullScreenReview">
        <div>
          <h4>Add a new review</h4>
          <NewReviewModal
            className={'plusButton'}
            buttonLabel={'+'}
            userInfo={this.state.data.user}
          />
        </div>
      </div>
    );

    const reviewListCards = (
      <div>
        <div className="reviewSpecial">
          <h4>New review</h4>
          <NewReviewModal
            className={'plusButton'}
            buttonLabel={'+'}
            userInfo={this.state.data.user}
          />
        </div>
        <Col lg="3" md="6" className="reviewCardContainer">
          {this.state.data.reviews.map(review => {
            return (
              <MyReviewsModal
                key={review._id}
                className={'review'}
                {...review}
                removeReview={this.handleRemove}
                updateReview={this.handleUpdate}
              />
            );
          })}
        </Col>
      </div>
    );

    return (
      <div className="wrapperContainer">
        {this.state.data.reviews.length === 0 ? fullScreenReview : reviewListCards}
      </div>
    );
  }
}

export default ReviewList;
