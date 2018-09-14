import React, { Component } from 'react';
import './reviewlist.css';
import data from '../../data.js';
import ReviewModal from '../Modals/reviewmodal';
import NewReviewModal from '../Modals/newreview';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: data
    };
  }

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
        <ReviewModal className={'review'} />
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
