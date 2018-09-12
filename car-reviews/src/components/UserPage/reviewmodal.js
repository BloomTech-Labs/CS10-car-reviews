import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import placeholder from '../../logo.svg';

// This component is the review modal. Currently it is a placeholder, 

class ModalExample extends Component {
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
    return (
      <div>
        <Button onClick={this.toggle} className="main-card">
            {this.props.buttonLabel}
            <img src={placeholder} style={{ height: '60px', width: '60px' }} />
            <p>Star Rating</p> 
            <p>Year, Make, Model</p>
            <p>Trim</p>
            <p>Reviewer</p>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <h2>Year, Make, Model, Trim</h2>
            <h5>Review by: Reviewer</h5>
          </ModalHeader>
          <ModalBody>
            <img src={placeholder} style={{ height: '160px', width: '320px' }} />
            <p>Star Rating</p>
          </ModalBody>
          <ModalFooter>
            <p>The 2019 Dodge Grand Caravan is the dinosaur in the minivan segment. It hasn't been fully redesigned in a decade, and as such, the base trim level is missing basic items such as Bluetooth phone connectivity and a USB port. As a result, we'd recommend upgrading to the SE Plus at a minimum. Pricing-wise, it's competitive with base trim levels of the other segment leaders and it adds the aforementioned USB port along with Bluetooth, Stow 'n Go third-row seats and a few other creature comforts. What's more, you get upgraded cloth upholstery and some leather-trimmed bits to the interior feel a bit less cheap.</p>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
