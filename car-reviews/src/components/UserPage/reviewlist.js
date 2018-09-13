import React, { Component } from 'react';
import './reviewlist.css';
import data from '../../data.js';
import ReviewModal from '../Modals/reviewmodal';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
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
        {/* {this.state.reviews.map(review => {
          return (
            <Card key={review.username} className="review">
              <CardBody>
                <CardTitle className="cardTitle">
                  <p>{`${review.year} ${review.make} ${review.model}`}</p>
                  <p>{review.edition}</p>
                </CardTitle>
                <CardText className="cardText">{`Updated ${review.updated_on}`}</CardText>
              </CardBody>
            </Card>
          );
        })} */}
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
