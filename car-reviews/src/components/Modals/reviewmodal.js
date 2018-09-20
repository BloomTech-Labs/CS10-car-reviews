import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';
//import data from '../../data';
// This component is the review modal.

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount() {
    const localURL = "http://localhost:3001/api/popular/featured_reviews"
    const deployedURL = "https://back-lambda-car-reviews.herokuapp.com/api/popular/featured_reviews"
    axios 
      .get(localURL)
      .then(response => {
          console.log(response);
          this.setState({ reviews: response.data });
      })
      .catch(error => {
          console.error('Server Error', error);
      });
  }
  render() {
    const { score, createOn, title, content } = this.props;
    const { year, make, model, edition } = this.props.car;
    const { username } = this.props.user;
    return (
      <div>
        <div className="modal-button">
            <Button onClick={this.toggle} className={this.props.className}>
                <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                <p>Star Rating {review.score}</p>
                <p>{`${review.car.year} ${review.car.make} ${review.car.model}`}</p>
                <p>{review.car.edition}</p>
                <CardText className="cardText">{`Updated ${new Date(review.createOn).toString().substring(4,10)}`}</CardText>
              </Button>
            );
          })}
        </div>
        <div>
          {this.state.reviews.map(review => {
            return (
              <div key={review._id}>
              <Modal isOpen={this.state.modal} toggle={this.toggle} key={review.username}>
                <ModalHeader toggle={this.toggle}>
                  <h2>{`${review.car.year} ${review.car.make} ${review.car.model} ${review.car.edition}`}</h2>
                  <h5>{`Review by: ${review.user.username}`}</h5>
                </ModalHeader>
                <ModalBody>
                  <img src={placeholder} style={{ height: '160px', width: '320px' }} />
                  <p>Star Rating {review.score}</p>
                </ModalBody>
                <ModalFooter>
                  <p>{review.title}</p>
                  <p>{review.content}</p>
                </ModalFooter>
              </Modal>
              </div>
            );
          })} 
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h2>{`${year} ${make} ${model} ${edition}`}</h2>
            <h5>{`Review by: ${username}`}</h5>
          </ModalHeader>
          <ModalBody>
            <img src={placeholder} style={{ height: '160px', width: '320px' }} />
            <p>Star Rating {score}</p>
          </ModalBody>
          <ModalFooter>
            <p>{title}</p>
            <p>{content}</p>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ReviewModal;
