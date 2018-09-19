import React, { Component } from 'react';
import './reviewlist.css';
import ReviewModal from '../Modals/reviewmodal';
import NewReviewModal from '../Modals/newreview';
import axios from 'axios';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
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
        this.setState({ reviews: response.data.reviews });
      })
      .catch(console.log('Error getting user data'));
  };

  render() {
    const fullScreenReview = (
      <div className="fullScreenReview">
        <div>
          <h4>Add a new review</h4>
          <NewReviewModal className={'plusButton'} buttonLabel={'+'} />
        </div>
      </div>
    );

    const reviewListCards = (
      <div className="reviewCardContainer">
        {/* <ReviewModal className={'review'} /> */}

        <div className="reviewSpecial">
          <h4>New review</h4>
          <NewReviewModal className={'plusButton'} buttonLabel={'+'} />
        </div>
      </div>
    );

    return (
      <div className="wrapperContainer">
        {this.state.reviews.length === 0 ? fullScreenReview : reviewListCards}
      </div>
    );
  }
}

export default ReviewList;
