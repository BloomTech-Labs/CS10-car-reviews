import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import placeholder from '../../logo.svg';
import data from '../../data';
import ContentCard from '../MainPage/ContentCard';
import "./ReviewModal.css";

// This component is the review modal. Currently it is a placeholder,

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      reviews: data.reviews
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className='reviewModal'>
        <div className="cardsContainer">
          {this.state.reviews.map(review => {
            return (
              <div onClick={this.toggle}>
                <ContentCard 
                  content={review} 
                  cardType='featured_review'
                />
              </div>
            );
          })}
        </div>
        <div>
          {this.state.reviews.map(review => {
            return (
              <div>
              <Modal isOpen={this.state.modal} toggle={this.toggle} key={review.username}>
                <ModalHeader toggle={this.toggle}>
                  <h2>{`${review.year} ${review.make} ${review.model} ${review.edition}`}</h2>
                  <h5>{`Review by: ${review.username}`}</h5>
                </ModalHeader>
                <ModalBody>
                  <img src={placeholder} style={{ height: '160px', width: '320px' }} />
                  <p>Star Rating</p>
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
      </div>
    );
  }
}

export default ModalExample;
