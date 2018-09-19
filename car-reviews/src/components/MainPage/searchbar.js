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
import './hamburgerMenu.css';
import HamburgerMenu from './hamburgerMenu';
import { CarQuery } from 'car-query';
import axios from 'axios';

// This is the Search Bar component, made up of sign-up/sign-in buttons, dropdown filters
// for search, and a review button. This file is rendered in MainPage.

const carQuery = new CarQuery();

// console.log("Car Query Object: ", carQuery);

// const years = carQuery.getYears();

// console.log("Years: ", years);

// carQuery.getYears()
//     .then(years => {
//       // this.setState(() => ({ years: [...years.data] }));
//       console.log(years.minYear)
//       console.log(years.maxYear)
//       return years;
//     })
//     .catch(err => {
//       console.error("error: ", err);
//     })

// carQuery.getMakes(2000)
//   .then(makes => {
//     console.log(makes)
//     return makes;
//   })


class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dropdownOpen: false,
      years: []
    };
    this.toggle = this.toggle.bind(this);
  }
  
  componentDidMount() {
    carQuery.getYears()
    .then(years => {
      console.log("YEARS: ", years)
      this.setState(() => ({ years }));
    })
    .catch(err => {
      console.error("error: ", err);
    })
    // carQuery.getMakes(2018)
    // .then(makes => {
    //   console.log("MAKES:", makes)
    //     this.setState(()=> ({ makes }));
    // });
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
          <Link to="/login">
            <Button className="signup">Sign Up</Button>
            <Button className="signin">Sign In</Button>
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
            <div classname="searchfields">
                <select className="dropdowns" name="car-years" id="car-years"></select>
                <select className="dropdowns" name="car-makes" id="car-makes"></select> 
                <select className="dropdowns" name="car-models" id="car-models"></select>
                <select className="dropdowns" name="car-model-trims" id="car-model-trims"></select>
            </div>
            <div className="review-and-search">
                <Link to= {
                    {
                        pathname: './MyReviews'
                    }
                }>
                <Button className="review">Review</Button>
                </Link>
                <Link to= {
                    {
                        pathname: './SearchPage'
                    }
                }>
                <Button className="search" id="cq-search-btn" value="Search CarQuery">Search</Button>
                </Link>
            </div>
        </div>
    );
  }
}

const mapStateToProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default connect(mapStateToProps)(Searchbar);
