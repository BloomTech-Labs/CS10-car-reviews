import React, { Component } from 'react';
import './reviewlist.css';
import { Container, Row } from 'reactstrap';
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
    const requestUserURL = 'https://back-lambda-car-reviews.herokuapp.com/api/users/data';
    const requestReviewsURL = 'https://back-lambda-car-reviews.herokuapp.com/api/reviews';

    axios.all([axios.get(requestUserURL, config), axios.get(requestReviewsURL, config)]).then(
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
      .delete(`https://back-lambda-car-reviews.herokuapp.com/api/reviews/${id}`, config)
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
        <Container style={{ marginBottom: '100px' }}>
          <Row style = {{ marginTop: '20px' }}>
          {this.state.data.reviews.map(review => {
            return (
              <MyReviewsModal
                key={review._id}
                className={'review'}
                {...review} {...review.car}
                removeReview={this.handleRemove}
                updateReview={this.handleUpdate}
              />
            );
          })}
          </Row>
        </Container>
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
