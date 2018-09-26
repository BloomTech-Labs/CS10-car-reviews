
import React, { Fragment } from 'react';
import './mainpage.css';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './hamburgermenu.css';
import HamburgerMenu from './hamburgermenu';
import {CarQuery} from 'car-query';
import axios from 'axios';

const carQuery = new CarQuery();

const styles = {
  // buttonStylesMiddle: {
  //   marginLeft: 10,
  //   marginRight: 10,
  //   marginBottom: 15,
  //   width: '90%',
  //   backgroundColor: 'white',
  //   color: '#77A6F7',
  // },
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
  
  handleChangeModels = e => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return {selectedValues: {
          ...prevState.selectedValues,
          [name]: value
      }}},
      () => {
        let newTrims = [];
        carQuery.getTrims({make: this.state.selectedValues.make, year: this.state.selectedValues.year, 
                            model: this.state.selectedValues.model})
          .then(trims => {
            trims.map(trim => newTrims.push(trim.trim));
            this.setState({
                trims: newTrims
              },
              () => console.log(this.state, '81')
            );
          })
          .catch(err => {
            console.error(err);
          });
      }
    );
  };

  handleChangeGeneral = e => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return {selectedValues: {
          ...prevState.selectedValues,
          [name]: value
      }}},
      () => console.log(this.state)
    )
  } 

  handleChangeMake = e => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return {selectedValues: {
          ...prevState.selectedValues,
          [name]: value,
          model: '',
          trim: ''                  // to clear model and trim if reselecting different make
      }}},
      () => {
        let newModels = [];
        carQuery.getModels({make: this.state.selectedValues.make, year: this.state.selectedValues.year})
          .then(models => {
            models.map(model => newModels.push(model.name));
            this.setState({
                models: newModels
              },
              () => console.log(this.state, '121')
            );
          })
          .catch(err => {
            console.error(err);
          });
      }
    );
  }


  searchFunction = () => {
    const searchCriteria = {}

    if (this.state.selectedValues.year) {
      searchCriteria.year = this.state.selectedValues.year;
    } 
    if (this.state.selectedValues.make) {
      searchCriteria.make = this.state.selectedValues.make;
    } 
    if (this.state.selectedValues.model) {
      searchCriteria.model = this.state.selectedValues.model;
    } 
    if (this.state.selectedValues.trim) {
      searchCriteria.edition = this.state.selectedValues.trim;
    } else {
      return console.log(`Search criteria is empty!`);
    }
    axios
      .post('http://localhost:3001/api/reviews/search', searchCriteria)
      .then(response => {
        console.log(response);
        this.setState({ searchResults: response.data, searching: true })
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
        this.setState({ years: yearList.reverse() });
      })

    carQuery.getMakes()
      .then(makes => {
        this.setState({ makes });
      });
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
              <Button className="searchbar-buttons">Sign Up</Button>
              <Button className="searchbar-buttons">Sign In</Button>
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
                onChange={this.handleChangeGeneral}
              >
              {this.state.years.map((year) => {
                return (
                  <option key={year}> {year} </option>
                )
              })}
              </select>
              <select
                className="dropdowns"
                name="make"
                onChange={this.handleChangeMake}
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
                onChange={this.handleChangeModels}
              >
              {/* TODO: Figure out how to make this re-render when the models have loaded */}
              {this.state.models.map((model) => {
                return (
                  <option key={model.index}>{model}</option>
                )
              })}
              </select>
              <select
                className="dropdowns"
                name="trim"
                onChange={this.handleChangeGeneral}
              >
              {/* TODO: Figure out how to make this re-render when the trims have loaded */}
              {this.state.trims.map((trim) => {
                // console.log(trim);
                return (<option key={trim.index}>{trim}</option>)
              })}
              </select>
            </div> 
            <button onClick={()=>this.searchFunction()}>click me for testing</button>
            <div style={styles.buttonContainerStyles}>
                <Link to='/MyReviews'>
                  <Button
                    className="searchbar-buttons"
                  >
                  Review
                  </Button>
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
