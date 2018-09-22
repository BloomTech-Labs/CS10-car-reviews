
import React, { Fragment } from 'react';
import './mainpage.css';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './hamburgerMenu.css';
import HamburgerMenu from './hamburgerMenu';
import {CarQuery} from 'car-query';
import axios from 'axios';

const carQuery = new CarQuery();

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
      'car-edition': '',
      searching: false,
      searchResults: [],
      selectedValues: {
        year: '',
        make: '',
        model: '',
        trim: ''
      }
    };
    this.toggle = this.toggle.bind(this);
  }
  
  handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState((prevState) => {
      prevState.selectedValues[name] = value;
      if (name === 'make'){
        const searchCriteria = {
          make: prevState.selectedValues.make
        }
        if (this.state.selectedValues.year) searchCriteria.year = this.state.selectedValues.year,
        // * DO NOT DELETE THIS LOG, the function doesn't work without it.
        console.log(this.state.selectedValues.year);
        const newModels = [];
        carQuery.getModels(searchCriteria)
          .then(models => {
            models.map(model => {
              newModels.push(model);
            });
          });
          prevState.models = newModels;
      }
      return prevState;
    });
  };

  searchFunction = () => {
    const placeholder = { year: '1995', make: 'Toyota', model: 'corolla', edition: 'SE' };
    const searchCriteria = {}

    if (this.state[`car-years`]) {
      searchCriteria.year = this.state['car-years'];
      console.log(searchCriteria.year);
    } else {
      console.log('empty');
    }
    axios
      .post('http://localhost:3001/api/reviews/search', searchCriteria)
      .then(response => {
        this.setState({ searchResults: response.data }, () => {
          console.log(this.state.searchResults[0], this.state.searching);
        })
        // this.handleSearchingFlag();
      })
      .catch(err => {
        console.log("ERROR: ", err.message)
      })
  };

  handleRedirect = (results) => {
    if (this.state.searching) {
      this.setState({ searching: false });
      return <Redirect to={{
        pathname: '/searchpage',
        state: {
          isLoggedIn: this.props.isLoggedIn,
          searchResults: this.state.searchResults
        }
      }} />
    } else {
      return <Fragment />
    }
  }

  handleSearchingFlag = () => {
    this.setState({ searching: true });
  }

  componentDidMount() {
    const yearList = [];
    carQuery.getYears()
      .then(years => {
        for (let i = years.minYear; i <= years.maxYear; i++) {
          yearList.push(i);
        }
        this.setState({ years: yearList });
      })

    carQuery.getMakes()
      .then(makes => {
        this.setState({ makes });
      });
    
    const searchCriteria = {
      year: this.state.selectedValues.year,
      make: this.state.selectedValues.make
    }
    
    // carQuery.getModels(searchCriteria)
    //   .then(model => {
    //     console.log("MODELS:", model)
    //     this.setState((prevState) =>({
    //       models: [prevState.models, ...model]
    //     }));
    //   });

    // carQuery.getTrims(searchCriteria)
    //   .then(trim => {
    //       this.setState((prevState) =>({
    //         trims: [prevState.trims, ...trim]
    //       }));
    //   });
    
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

  handleSetDropdowns = (type) => {

  }

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
          {this.handleRedirect()}
            <div className="searchfields">
              <select
                className="dropdowns"
                name="year"
                // id="car-years"
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
                name="make"
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
                name="model"
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
                onChange={this.handleChange}
              >
              {this.state.trims.map((trim) => {
                console.log(trim);
              })}
              </select>
            </div> 
            <button onClick={()=>this.searchFunction()}>click me for testing</button>
            <div style={styles.buttonContainerStyles}>
                <Link to='/MyReviews'>
                  <Button style={styles.buttonStylesMiddle}>Review</Button>
                </Link>

                {/* <Link to={{
                  pathname: '/searchpage',
                  state: { isLoggedIn: this.props.isLoggedIn }
                }}> */}
                  <Button 
                    style={styles.buttonStylesMiddle} 
                    onClick={()=>this.searchFunction()}
                  >Search</Button>
                {/* </Link> */}
            </div>
        </div>
    );
  }
}

export default Searchbar;
