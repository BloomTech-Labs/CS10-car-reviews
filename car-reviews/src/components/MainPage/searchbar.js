
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
import './hamburgerMenu.css';
import HamburgerMenu from './hamburgerMenu';
import { CarQuery }from 'car-query';
import axios from 'axios';

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
      years: [],
      makes: [],
      models: [],
      trims: [],
      'car-years': '',
      'car-models': '',
      'car-makes': '',
      'car-edition': ''
    };
    this.toggle = this.toggle.bind(this);
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchFunction = () => {
    const placeholder = { year: '1995', make: 'Toyota', model: 'corolla', edition: 'SE' };
    axios
      .post('http://localhost:3001/api/reviews/search', placeholder)
      .then(response => {
        console.log("RESPONSE: ", response.config.data)
      })
      .catch(err => {
        console.log("ERROR: ", err.message)
      })
  };

  componentDidMount() {
    carQuery.getMakes()
      .then(make => {
        this.setState((prevState) =>({
          makes: [prevState.makes, ...make]
        }));
      });
    
    const searchCriteria = {
      year: this.state.selectedYear,
      make: this.state.selectedMake
    }
    
    carQuery.getModels(searchCriteria)
      .then(model => {
        console.log("MODELS:", model)
        this.setState((prevState) =>({
          models: [prevState.models, ...model]
        }));
      });

    carQuery.getTrims(searchCriteria)
      .then(trim => {
          this.setState((prevState) =>({
            trims: [prevState.trims, ...trim]
          }));
      });
    // For-Loop to populate years array in state
    for (let i = 1974; i<2018; i++) {
      this.state.years.push(i);
    }
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

  // * TODO: pass search results to the Search Results Component
  handleSearch = () => {
    carQuery.getModels({
      year: this.state['car-years'],
      make: this.state['car-makes'],
      model: this.state['car-models'],
      edition: this.state['car-trims']
    })
    .then(res => console.log(res));
  }
  render() {
    return (
        <div className="searchbar">
          {this.handleRenderSignin()}
            <div classname="searchfields">
              <select
                className="dropdowns"
                name="car-years"
                id="car-years"
                onChange={this.handleChange}
              >
              {this.state.years.map((year) => {
                return (
                  <option> {year} </option>
                )
              })}
              </select>
              <select
                className="dropdowns"
                name="car-makes"
                id="car-makes"
                onChange={this.handleChange}
              >
              {this.state.makes.map((make) => {
                return (
                  <option> {make.display}</option>
                )
              })}
              </select>
              <select
                className="dropdowns"
                name="car-models"
                id="car-models"
                onChange={this.handleChange}
              >
              {this.state.models.map((model) => {
                return (
                  <option>{model.makeId} {model.name}</option>
                )
              })}
              </select>
              <select
                className="dropdowns"
                name="car-model-trims"
                id="car-model-trims"
                onChange={this.handleChange}
              >
              {this.state.trims.map((trim) => {
                return (
                  null
                )
              })}
              </select>
            </div> 
            <button onClick={()=>this.searchFunction()}>click me for testing</button>
            <div className="review-and-search">
                <Link to='/MyReviews'>
                  <Button style={styles.buttonStylesMiddle}>Review</Button>
                </Link>

                <Link to='/SearchPage'>
                  <Button style={styles.buttonStylesMiddle} className="search">Search</Button>
                </Link>
            </div>
        </div>
    );
  }
}

export default Searchbar;
