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
import { CarQuery, Years } from 'car-query';
import axios from 'axios';
// This is the Search Bar component, made up of sign-up/sign-in buttons, dropdown filters
// for search, and a review button. This file is rendered in MainPage.
const carQuery = new CarQuery();
// console.log("Car Query Object: ", carQuery);
// const years = carQuery.getYears();
// console.log("Years: ", years);
// carQuery.getYears()
//     .then(years => {
//       this.setState(() => ({ years: [...years.data] }));
//     })
//     .catch(err => {
//       console.error("error: ", err);
//     })
class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dropdownOpen: false,
      years: [1990, 2002, 2015, 2060],
      makes: [],
      models: [],
      make: 'ford',
      model: ''
    };
    this.toggle = this.toggle.bind(this);
  }
  
  componentDidMount() {
  //   carQuery.getYears()
  //   .then(years => {
  //     console.log("the year is" + years)
  //     // this.setState(() => ({ years }));
  //   })
  //   .catch(err => {
  //     console.error("error: ", err);
  //   })
    carQuery.getMakes()
    .then(make => {
      // console.log("MAKES:", make)
         this.setState((prevState) =>({
          // makes: [...makes]
          makes:  [prevState.makes, ...make]

          
         }));
    });

    const searchCriteria = {
      // year: 2018,
      make: this.state.make
  }

    carQuery.getModels(
      searchCriteria
     )
    .then(model => {
      console.log("MODELS:", model)
         this.setState((prevState) =>({
          // makes: [...makes]
          models:  [prevState.models, ...model]
         }));
    });
  }
  
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  carChoice = (car) => {
    console.log(car);
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
            <select className="dropdowns" name="car-years" id="car-years">
            {this.state.years.map((year) => {
              return (
              <option> {year} </option>
              )
            })}
            </select>
            <select className="dropdowns" name="car-makes" id="car-makes">
            {this.state.makes.map((make) => {

              
              return (
                
              <option> {make.display}</option>
              
              
              )
            })}
            </select>
            <select className="dropdowns" name="car-models" id="car-models">
            {this.state.models.map((model) => {
              return (
              <option>{model.makeId} {model.name} </option>
              )
            })}
            </select>
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
const mapStateToProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};
export default connect(mapStateToProps)(Searchbar);