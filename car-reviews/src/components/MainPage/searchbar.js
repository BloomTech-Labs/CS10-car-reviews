
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
        // * TODO: Don't display model and edition until year and make are set
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

      if (name === 'model'){
        prevState.selectedValues.model = value;

        const searchCriteria = {
          year: prevState.selectedValues.year,
          make: prevState.selectedValues.make,
          model: prevState.selectedValues.model,
        }
        
        const newTrims = [];
        carQuery.getTrims(searchCriteria)
          .then(trims => {
            trims.map(trim => newTrims.push(trim));
            prevState.trims = newTrims;
          })
      }

      return prevState;
    });
    console.log(this.state);
  };

  searchFunction = () => {
    const placeholder = { year: '1995', make: 'Toyota', model: 'corolla', edition: 'SE' };
    const searchCriteria = {}

    if (this.state.selectedValues.year) {
      searchCriteria.year = this.state.selectedValues.year;
      console.log(searchCriteria.year);
    } else if (this.state.selectedValues.make){
      searchCriteria.make = this.state.selectedValues.make;
    } else if (this.state.selectedValues.model) {
      searchCriteria.model = this.state.selectedValues.model;
    } else if (this.state.selectedValues.trim) {
      searchCriteria.edition = this.state.selectedValues.trim;
    } else {
      return console.log(`Search criteria is empty!`);
    }
    axios
      .post('http://localhost:3001/api/reviews/search', searchCriteria)
      .then(response => {
        console.log(response);
        this.setState({ searchResults: response.data })
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
              {/* TODO: Figure out how to make this re-render when the models have loaded */}
              {this.state.models.map((model) => {
                return (
                  <option key={`${model.makeId}_${model.name}`}>{model.name}</option>
                )
              })}
              </select>
              <select
                className="dropdowns"
                name="trims"
                onChange={this.handleChange}
              >
              {/* TODO: Figure out how to make this re-render when the trims have loaded */}
              {this.state.trims.map((trim) => {
                console.log(trim);
                return (<option key={`${trim.modelId}_${trim.trim}`}>{trim.trim}</option>)
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
