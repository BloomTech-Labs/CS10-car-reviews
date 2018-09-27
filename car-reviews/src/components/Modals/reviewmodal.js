import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText } from 'reactstrap';
import placeholder from '../../logo.svg';
import f150 from '../../f150.jpg';
import ReactStars from 'react-stars'
// import '../MainPage/mainpage.css';
import './reviewmodal.css';

// This component is the review modal. It is rendered in maincontent.js

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

  
  render() {
    const { score, createOn, title, content, carImage } = this.props;
    const { year, make, model, edition } = this.props.car;
    // const { username } = this.props.user;
    return (
      <div>
        <Button className="modal-button" onClick={this.toggle} src={f150}>
            {/* <img src={placeholder} style={{ height: '60px', width: '25%' }} /> */}
            <p>{`${year} ${make} ${model} ${edition}`}</p>
            <ReactStars
              type= "number"
              name= "score"
              edit= {false}
              half={true}
              count={5}
              value={score}
              size={36}
              color2={'#ffd700'} />
            <p>Star Rating {score}</p>
            <CardText styles={{ color: '#77A6F7'}}>{`Updated ${new Date(createOn).toString().substring(4,10)}`}</CardText>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modal-header">
            <h2>{`${year} ${make} ${model} ${edition}`}</h2>
            <p>Rating: {score} out of 5</p>
            {/* <h5>{`Review by: ${username}`}</h5> */}
          </ModalHeader>
          <ModalBody className="modal-body">
            <img src={carImage} style={{ height: '100%', width: '100%' }} />
            <p>{title}</p>
            <p>{content}</p>
          </ModalBody>
          {/* <ModalFooter className="modal-footer">
            <p style={{ textAlign: 'left' }}>{title}</p>
            <p style={{ textAlign: 'left' }}>{content}</p>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;