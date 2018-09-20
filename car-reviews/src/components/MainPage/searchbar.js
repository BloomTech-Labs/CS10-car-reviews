import React from 'react';
import './mainpage.css';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './hamburgerMenu.css';
import HamburgerMenu from './hamburgerMenu';

const styles = {
  buttonStylesMiddle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    width: '90%'
  },
  buttonContainerStyles: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonStylesRight: {

  },
  loginContainerStyles: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
    marginTop: 10
  }
}

// This is the Search Bar component, made up of sign-up/sign-in buttons, dropdown filters
// for search, and a review button. This file is rendered in MainPage.

class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleRenderSignin = () => {
    if (!this.props.isLoggedIn) {
      return (
        <div className="login">
          {/* <Button onClick={this.props.changeLoginStatus}>Test Sign In</Button> */}
          <Link to='/login'>
            <div style={styles.loginContainerStyles}>
            <Button className="signup">Sign Up</Button>
            <Button className="signin">Sign In</Button>
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div id="hamburgerMenu">
          <HamburgerMenu right />
        </div>
      );
    }
  };

  render() {
    return (
        <div className="searchbar">
            {this.handleRenderSignin()}
            <div className="searchfields">
                <select className="dropdowns" name="car-years" id="car-years"></select>
                <select className="dropdowns" name="car-makes" id="car-makes"></select> 
                <select className="dropdowns" name="car-models" id="car-models"></select>
                <select className="dropdowns" name="car-model-trims" id="car-model-trims"></select>
            </div>
            <div style={styles.buttonContainerStyles}>
                <Link to='/MyReviews'>
                  <Button style={styles.buttonStylesMiddle}>Review</Button>
                </Link>

                <Link to='/searchresults'>
                  <Button style={styles.buttonStylesMiddle} className="search">Search</Button>
                </Link>
            </div>
        </div>
    );
  }
}

export default Searchbar;
