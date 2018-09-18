import React from 'react';
import './mainpage.css';
import {DropdownToggle, DropdownMenu, DropdownItem, Button, UncontrolledDropdown} from 'reactstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

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
                    <Button className="signup">Sign Up</Button>
                    <Button className="signin">Sign In</Button>
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1 style={{textAlign: 'right'}}>Hamburger Menu Goes Here</h1>
            </div>
        )
    }
  }

  render() {
    return (
        <div className="searchbar">
            {this.handleRenderSignin()}
            <div classname="searchfields">
                <select className="dropdowns" name="car-years" id="car-years"></select>
                <select className="dropdowns" name="car-makes" id="car-makes"></select> 
                <select className="dropdowns" name="car-models" id="car-models"></select>
                <select className="dropdowns" name="car-model-trims" id="car-model-trims"></select>
            </div>
            <div className="review-and-search">
                <Link to= {
                    {
                        pathname: './'
                    }
                }>
                <Button className="review">Review</Button>
                </Link>
                <Link to= {
                    {
                        pathname: './SearchPage'
                    }
                }>
                <Button className="search">Search</Button>
                </Link>
            </div>
        </div>
    );
  }
}

const mapStateToProps = ({ isLoggedIn }) => { return { isLoggedIn } };

export default connect(mapStateToProps)(Searchbar);