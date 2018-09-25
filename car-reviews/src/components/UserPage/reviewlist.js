import React, { Component } from 'react';
import './reviewlist.css';
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
      <div className="reviewCardContainer">
        <MyReviewsModal className={'review'} data={this.state.data} />

        <div className="reviewSpecial">
          <h4>New review</h4>
          <NewReviewModal
            className={'plusButton'}
            buttonLabel={'+'}
            userInfo={this.state.data.user}
          />
        </div>
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
