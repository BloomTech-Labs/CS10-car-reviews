import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './myreviewsmodal.css';
import ReactStars from 'react-stars'

class MyReviewsModal extends Component {
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

  deleteReview = id => {
    this.props.removeReview(id);
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button className="my-modal-button" onClick={this.toggle}>
          <img src={this.props.carImage} style={{ height: '100%', width: '100%' }} alt=""/>
          <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={this.props.score}
              size={36}
              color2={'#ffd700'} />
          <p>{`Star Rating: ${this.props.score}`}</p>
          <p>{`${this.props.car.year} ${this.props.car.make} ${this.props.car.model}
 ${this.props.car.edition}`}</p>
          {/* <CardText className="cardText">{`Updated ${
                  review.updated_on
                }`}</CardText> */}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="my-modal-header">
            <p>
              {`${this.props.car.year} ${this.props.car.make} ${this.props.car.model} ${
                this.props.car.edition
              } `}
              <button onClick={() => this.deleteReview(this.props._id)}>delete</button>
            </p>
            {/* <p>{`Review by: ${this.props.user.username}`}</p> */}
            <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={this.props.score}
              size={36}
              color2={'#ffd700'} />
            <p>{`Rating: ${this.props.score} out of 5`}</p>
          </ModalHeader>
          <ModalBody className="my-modal-body">
            {this.props.carImage ? (
              <img src={this.props.carImage} style={{ height: '100%', width: '100%' }} alt=""/>
            ) : null}
            <hr />
            <p>{this.props.title}</p>
            <p>{this.props.content}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MyReviewsModal;
