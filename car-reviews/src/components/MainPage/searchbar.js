
import React, { Fragment } from 'react';
import './mainpage.css';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './hamburgermenu.css';
import HamburgerMenu from './hamburgermenu';
import {CarQuery} from 'car-query';
import axios from 'axios';

const carQuery = new CarQuery();
const API_KEY = 'b684b562f269e246688693389';

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
      models: ['test', 'also test'],
      trims: ['trim1', 'trim2'],
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
      },
      displayDropdowns: {
        year: false,
        model: false,
        trim: false
      }
    };
  }
  
  handleChangeModels = e => {
    const { value } = e.target;
    const newState = Object.assign({}, this.state);
    newState.selectedValues.model = value;
    newState.displayDropdowns.trim = true;
    this.setState(newState);
    // this.setState((prevState) => {
    //   return {selectedValues: {
    //       ...prevState.selectedValues,
    //       [name]: value
    //   }}},
    //   () => {
    //     let newTrims = [];
    //     carQuery.getTrims({make: this.state.selectedValues.make, year: this.state.selectedValues.year, 
    //                         model: this.state.selectedValues.model})
    //       .then(trims => {
    //         trims.map(trim => newTrims.push(trim.trim));
    //         this.setState({
    //             trims: newTrims
    //           },
    //           () => console.log(this.state, '81')
    //         );
    //       })
    //       .catch(err => {
    //         console.error(err);
    //       });
    //   }
    // );
  };

  handleChangeGeneral = e => {
    const { name, value } = e.target;
    const newState = Object.assign({}, this.state);
    newState.selectedValues[name] = value;
    console.log(name);
    newState.displayDropdowns[name] = true;
    console.log(newState);
    this.setState(newState);
  } 

  handleChangeYear = e => {
    const value = e.target;
    const newState = Object.assign({}, this.state);
    newState.selectedValues.year = value;
    newState.displayDropdowns.model = true;
    this.setState(newState);
  }

  handleChangeMake = e => {
    const { value } = e.target;
    const searchCriteria = { make: value };
    const newMake = {
      make: value,
      makeId: ''
    }
    this.state.makes.map(make => {
      if (make.make === value) newMake.makeId = make.make_id;
    })

    const newState = Object.assign({}, this.state);
    newState.selectedValues.make = newMake;
    newState.displayDropdowns.year = true;

    axios.get(`https://databases.one/api/?format=json&select=year&make_id=${newState.selectedValues.make.makeId}&api_key=${API_KEY}`)
        .then(res => {
          newState.years = res.data.result
          this.setState(newState);
        })
        .catch(err => console.warn(`There was an error getting the years for that make: \n${err}`));
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
    axios.get(`https://databases.one/api/?format=json&select=make&api_key=${API_KEY}`)
      .then(res => {
        this.setState({ makes: res.data.result});
      })
      .catch(err => {
        console.warn(err);
        alert('There was an error loading the makes, please reload the page')
      })

  //   const yearList = [];
  //   carQuery.getYears()
  //     .then(years => {
  //       for (let i = years.minYear; i <= years.maxYear; i++) {
  //         yearList.push(i);
  //       }
  //       this.setState({ years: yearList.reverse() });
  //     })

  //   carQuery.getMakes()
  //     .then(makes => {
  //       this.setState({ makes });
  //     });
  // } 

  // toggle() {
  //   this.setState(prevState => ({
  //     dropdownOpen: !prevState.dropdownOpen
  //   }));
  }

  handleRenderSignin = () => {
    if (!this.props.isLoggedIn) {
      return (
        <div className="login">


          <Link to="/login">
            <div style={styles.loginContainerStyles}>
              <Button className="searchbar-buttons">Sign In</Button>
              {/* <Link  to='/'><Button className="searchbar-buttons">Home</Button></Link> */}
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
          {this.handleRedirect()}
            <div className="searchfields">
              <select
                className="dropdowns"
                name="make"
                onChange={this.handleChangeMake}
              >
              {this.state.makes.map((make) => {
                return (
                  <option key={make.make_id}>{make.make}</option>
                )
              })}
              </select>

              {/* {this.state.displayDropdowns.year ? <select
                className="dropdowns"
                name="year"
                onChange={this.handleChangeYear}
              >
              {this.state.years.map((year) => {
                return (
                  <option key={year}> {year} </option>
                )
              })}
              </select> : <Fragment />}

              {this.state.displayDropdowns.model ? <select
                className="dropdowns"
                name="model"
                onChange={this.handleChangeModels}
              >
              {this.state.models.map((model) => {
                return (
                  <option key={model}>{model}</option>
                )
              })}
              </select> : <Fragment />}
              
              {this.state.displayDropdowns.trim ? <select
                className="dropdowns"
                name="trim"
                onChange={this.handleChangeGeneral}
              >
              {this.state.trims.map((trim) => {
                return (
                  <option key={trim.index}>{trim}</option>
                )
              })}
              </select> : <Fragment />}
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
                  </div> */}
            </div>
        </div>
    );
  }
}

export default Searchbar;
