import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import placeholder from '../../logo.svg';

class NewReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedImage: undefined,
      content: ''
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  imageSelectedHandler = event => {
    this.setState({
      selectedImage: event.target.files[0]
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {};

  render() {
    return (
      <div>
        <button onClick={this.toggle} className={this.props.className}>
          {this.props.buttonLabel}
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <div className="searchfields">
              <UncontrolledDropdown className="dropdownsModal">
                <DropdownToggle caret>Year</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>TODO:</DropdownItem>
                  <DropdownItem disabled>map years onto here</DropdownItem>
                  <DropdownItem>2000</DropdownItem>
                  <DropdownItem>2001</DropdownItem>
                  <DropdownItem>2002</DropdownItem>
                  <DropdownItem>2003</DropdownItem>
                  <DropdownItem>2004</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Makes will be dependent on Year -> </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="dropdownsModal">
                <DropdownToggle caret>Make</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>TODO:</DropdownItem>
                  <DropdownItem disabled>map makes onto here</DropdownItem>
                  <DropdownItem>Ford</DropdownItem>
                  <DropdownItem>Toyota</DropdownItem>
                  <DropdownItem>Honda</DropdownItem>
                  <DropdownItem>BMW</DropdownItem>
                  <DropdownItem>Volkswagon</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Models are dependent on Make -> </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="dropdownsModal">
                <DropdownToggle caret>Model</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>TODO:</DropdownItem>
                  <DropdownItem disabled>map models onto here</DropdownItem>
                  <DropdownItem>Camery</DropdownItem>
                  <DropdownItem>Corolla</DropdownItem>
                  <DropdownItem>Prius</DropdownItem>
                  <DropdownItem>Rav4</DropdownItem>
                  <DropdownItem>Tundra</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>these examples are if someone picked toyota</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="dropdownsModal">
                <DropdownToggle caret>Trim</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>TODO:</DropdownItem>
                  <DropdownItem disabled>map trims onto here</DropdownItem>
                  <DropdownItem>One</DropdownItem>
                  <DropdownItem>Two</DropdownItem>
                  <DropdownItem>Two Eco</DropdownItem>
                  <DropdownItem>Three</DropdownItem>
                  <DropdownItem>Three Touring</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>these examples are if someone picked Prius</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            Review by: Reviewer
          </ModalHeader>
          <ModalBody>
            {this.selectedImage ? <img src={this.selectedImage} /> : <img src={placeholder} />}
            {/* <img style={{ height: '160px', width: '320px' }} /> */}
            <input
              type="file"
              name="selectedImage"
              value={this.selectedImage}
              onChange={this.imageSelectedHandler}
            />
          </ModalBody>
          <ModalFooter>
            <form>
              <p>
                <textarea
                  className="contentInput"
                  row="50"
                  cols="50"
                  placeholder="Write your review here..."
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </p>
              <input type="submit" />
            </form>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NewReviewModal;
