import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import defaultImg from '../Assets/default_img.png';
import axios from 'axios';
import './reviewmodal.css';
import './myreviewsmodal.css';
import ReactStars from 'react-stars';

class MyReviewsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: this.props.title,
      content: this.props.content,
      score: this.props.score,
      carImage: this.props.carImage,
      editing: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  deleteReview = id => {
    this.props.removeReview(id);
    this.toggle();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  save = () => {
    const editedContent = {
      title: this.state.title,
      content: this.state.content,
      score: this.state.score,
      carImage: this.state.carImage
    };
    const config = {
      headers: {
        JWT: localStorage.getItem('jwt')
      }
    };

    axios
      .put(
        `https://back-lambda-car-reviews.herokuapp.com/api/reviews/${this.props._id}`,
        editedContent,
        config
      )
      .then(response => {
        console.log('editNote:', response);
      })
      .catch(err => {
        console.log('Error: ', err);
      });

    this.toggleEdit();
  };

  render() {
    return (
      <Col lg="3" md="6" sm="12">
        <Button className="modal-button" onClick={this.toggle}>
          <p style={{ fontSize: '1.1em' }}>
            {`${this.props.car.year} ${this.props.car.make} ${this.props.car.model}`}
          </p>
          <div style={{ height: '150px' }}>
            <img
              src={this.props.carImage ? this.props.carImage : defaultImg}
              style={{ height: '100%', maxWidth: '100%' }}
              alt=""
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactStars
              type="number"
              name="score"
              edit={false}
              half={true}
              count={5}
              value={this.props.score}
              size={30}
              color2={'#ffd700'}
            />
          </div>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modal-header">
            <p>
              {`${this.props.year} ${this.props.make} ${this.props.model} ${
                this.props.car.edition
              }`}
            </p>

            <ReactStars
              type="number"
              name="score"
              edit={false}
              half={true}
              count={5}
              value={this.props.score}
              size={30}
              color2={'#ffd700'}
            />

            <div className="mrb-container">
              {this.state.editing ? (
                <button className="my-review-buttons" onClick={this.save}>
                  save review
                </button>
              ) : (
                <button className="my-review-buttons" onClick={this.toggleEdit}>
                  edit review
                </button>
              )}

              <div style={{ width: 10 }} />

              <button
                className="my-review-buttons"
                onClick={() => this.deleteReview(this.props._id)}
              >
                delete review
              </button>
            </div>
          </ModalHeader>
          <ModalBody className="modal-body">
            {this.props.carImage ? (
              <img src={this.props.carImage} style={{ height: '100%', width: '100%' }} alt="" />
            ) : null}
            <hr />
            {this.state.editing ? (
              <div>
                <Input
                  name="title"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
                <p />
                <textarea
                  cols="49"
                  row="50"
                  name="content"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.content}
                />
              </div>
            ) : (
              <div>
                <p>{this.state.title}</p>
                <p>{this.state.content}</p>
              </div>
            )}
          </ModalBody>
        </Modal>
      </Col>
    );
  }
}

export default MyReviewsModal;
