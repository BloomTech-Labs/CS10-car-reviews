
import React, { Fragment } from 'react';
import './mainpage.css';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './hamburgermenu.css';
import HamburgerMenu from './hamburgermenu';
import {CarQuery} from 'car-query';
import axios from 'axios';

const carQuery = new CarQuery();

// * TODO: Make colors for the Review and Search buttons match
const styles = {
  buttonStylesMiddle: {
    width: '100%',
    backgroundColor: 'white',
    color: '#77A6F7',
  },
  buttonContainerStyles: {
    display: 'flex',
    justifyContent: 'center'
  },
  linkStyles: {
    textDecoration: 'none',
    width: '8%',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
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
    const { value } = e.target;
    const searchCriteria = { make: value};
    this.setState((prevState) => {
      return {selectedValues: {
          ...prevState.selectedValues,
          make: value,
          model: '',
          trim: ''                  // to clear model and trim if reselecting different make
      }}},
      
      () => {
        // if year is selected, it will get all the models for that year, otherwise it will get all the models for the selected make
        if (this.state.selectedValues.year) searchCriteria.year = this.state.selectedValues.year;

        let newModels = [];
        carQuery.getModels(searchCriteria)
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
    const { year, make, model, trim } = this.state.selectedValues;

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
    } else if (!year && !make && !model && !trim){
      console.log(`There are no selected values in the search criteria`);
    }

    axios
      .post('http://localhost:3001/api/reviews/search', searchCriteria)
      .then(response => {
        console.log(response);
        this.setState({ searchResults: response.data, searching: true });
      })
      .catch(err => {
        console.log("ERROR: ", err.message)
      })
  };

  handleRedirect = (page) => {
    if (this.state.searching) {
      return <Redirect to={{
        pathname: '/searchpage',
        state: {
          isLoggedIn: this.props.isLoggedIn,
          searchResults: this.state.searchResults,
          currentPage: '/searchpage'
        }
      }} />
    } else {
      return <Fragment />
    }
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

  render() {
    return (
        <div className="searchbar">
          <div>
            <div style={styles.buttonContainerStyles}>
              <Link style={styles.linkStyles} to='/'><Button style={styles.buttonStylesMiddle}>Home</Button></Link>
            </div>
            {this.handleRenderSignin()}
            {this.handleRedirect()}
            {/* TODO: Only display the Home button when at '/searchpage' */}
          </div>
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
              {this.state.trims.map((trim) => {
                return (<option key={trim.index}>{trim}</option>)
              })}
              </select>
            </div> 
            
            <div style={styles.buttonContainerStyles}>
              <Link style={styles.linkStyles}  to='/MyReviews'>
                  <Button
                    className="searchbar-buttons"
                  >
                    Review
                  </Button>
                  </Link>
                  <div style={styles.linkStyles}>
                  <Button 
                    className="searchbar-buttons"
                    onClick={()=>this.searchFunction()}
                  >Search</Button>
                  </div>
            </div>
        </div>
    );
  }
}

export default Searchbar;
