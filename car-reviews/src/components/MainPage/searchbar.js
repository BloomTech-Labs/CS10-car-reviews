
import React, { Fragment } from 'react';
import './mainpage.css';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './hamburgermenu.css';
import HamburgerMenu from './hamburgermenu';
import Navbar from './navbar';
import LoginRegisterModal from '../Modals/loginregistermodal';
import axios from 'axios';
import SearchResults from './searchresults';

const API_KEY = process.env.REACT_APP_API_KEY;

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
      },
      displayDropdowns: {
        year: false,
        model: false,
        trim: false
      },
      modalState: {
        isOpen: false,
        type: 'login'
      }
    };
  }

  // componentWillMount(){
  //   console.log(this.props.isLoggedIn);
  //   this.setState({ localIsLoggedIn: this.props.isLoggedIn });
  // }

  componentDidMount() {
    axios.get(`https://databases.one/api/?format=json&select=make&api_key=${API_KEY}`)
      .then(res => {
        this.setState({ makes: res.data.result });
      })
      .catch(err => {
        console.warn(err);
        alert('There was an error loading the makes, please reload the page')
      })
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
          newState.years = res.data.result.reverse();
          this.setState(newState);
        })
        .catch(err => console.warn(`There was an error getting the years for that make: \n${err}`));
  }

  handleChangeYear = e => {
    const value = parseInt(e.target.value);
    const { makeId } = this.state.selectedValues.make;
    const newState = Object.assign({}, this.state);
    newState.selectedValues.year = value;
    newState.displayDropdowns.model = true;
    axios.get(`https://databases.one/api/?format=json&select=model&make_id=${makeId}&api_key=${API_KEY}`)
      .then(res => {
        newState.models = res.data.result;
        this.setState(newState, () => console.log(this.state));
      })
  }
  
  handleChangeModels = e => {
    const { value } = e.target;
    const newState = Object.assign({}, this.state);
    let modelId;
    this.state.models.map(model => {
      if (value === model.model) modelId = model.model_id;
    })

    newState.selectedValues.model = { model: value, modelId };
    newState.displayDropdowns.trim = true;
    const searchTerms = {
      makeId: this.state.selectedValues.make.makeId,
      modelId
    }
    
    axios.get(`https://databases.one/api/?format=json&select=trim&make_id=${searchTerms.makeId}&model_id=${searchTerms.modelId}&api_key=${API_KEY}`)
      .then(res => {
        newState.trims = res.data.result;
        this.setState(newState, () => console.log(this.state));
      })
  };

  handleChangeTrim = e => {
    const { value } = e.target;
    const newState = Object.assign({}, this.state);
    this.state.trims.map(trim => {
      if (trim.trim === value) newState.selectedValues.trim = {trimId: trim.trim_id, trim: trim.trim};
    })
    this.setState(newState);
  }

  searchFunction = () => {
    const searchCriteria = {}
    const { year, make, model, trim } = this.state.selectedValues;

    if (this.state.selectedValues.year) {
      searchCriteria.year = this.state.selectedValues.year;
    } 
    if (this.state.selectedValues.make) {
      searchCriteria.make = this.state.selectedValues.make.make;
    } 
    if (this.state.selectedValues.model) {
      searchCriteria.model = this.state.selectedValues.model.model;
    } 
    if (this.state.selectedValues.trim) {
      searchCriteria.edition = this.state.selectedValues.trim.trim;
    } else if (!year && !make && !model && !trim){
      console.log(`There are no selected values in the search criteria`);
    }
    axios
      .post('https://back-lambda-car-reviews.herokuapp.com/api/reviews/search', searchCriteria)
      .then(response => {
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

  handleRenderSignin = () => {
    if (!this.props.isLoggedIn) {
      return (
        <div className="login">
            <div style={styles.loginContainerStyles}>
              <Button onClick={this.handleModalState('login', true)} className="searchbar-buttons">Sign In</Button>
              <Button onClick={this.handleModalState('register', true)} className="searchbar-buttons">Register</Button>
              <Link  to='/'><Button className="searchbar-buttons">Home</Button></Link>
            </div>
        </div>
      );
    } else {
      return (
        <div style={{ height: '30px' }}>
          {/* <HamburgerMenu right /> */}
          {/* <Navbar /> */}
        </div>
      );
    }
  };

  handleModalState = (modalType, status) => () => {
    const newState = Object.assign({}, this.state);
    newState.modalState.type = modalType;
    newState.modalState.isOpen = status;
    this.setState(newState);
  }

  handleChangeModalType = modalType => {
    const newState = Object.assign({}, this.state);
    newState.modalState.type = modalType;
    this.setState(newState);
  }

  handleReviewButton = () => {
    if (this.props.isLoggedIn){
      return (
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
      )
    } else {
      return (
        <div style={styles.buttonContainerStyles}>
              <div style={styles.linkStyles}>
              <Button
                className="searchbar-buttons"
                onClick={this.handleModalState('login', true)}
              >
                Review
              </Button>
              </div>
              <div style={styles.linkStyles}>
                <Button 
                  className="searchbar-buttons"
                  onClick={()=>this.searchFunction()}
                >Search</Button>
              </div>
        </div>
      )
    }
  }

  handleSetJwtState = (type, jwt) => {
    localStorage.setItem('jwt', jwt);
    this.props.handleLogin(true);
    this.setState({ modalState: { isOpen: false, type } })
  }
  
  render() {
    return (
      <div>
        <div style={{ height: '24px' }}></div>
        <div className="searchbar">
          {this.handleRenderSignin()}
          {this.handleRedirect()}
          <LoginRegisterModal 
            isOpen={this.state.modalState.isOpen}
            type={this.state.modalState.type}
            handleModalState={this.handleModalState}
            handleChangeModalType={this.handleChangeModalType}
            handleSetJwtState={this.handleSetJwtState}
          />
            <div className="searchfields">
              <select
                className="dropdowns"
                name="make"
                onChange={this.handleChangeMake}
              >
              <option>Select a Make</option>
              {this.state.makes.map((make) => {
                return (
                  <option key={make.make_id}>{make.make}</option>
                )
              })}
              </select>

              {this.state.displayDropdowns.year ? <select
                className="dropdowns"
                name="year"
                onChange={this.handleChangeYear}
              >
              <option>Select a Year</option>
              {this.state.years.map((year) => {
                return <option key={year.year}>{year.year}</option>
              })}
              </select> : <Fragment />}

              {this.state.displayDropdowns.model ? <select
                className="dropdowns"
                name="model"
                onChange={this.handleChangeModels}
                >

                <option>Select a Model</option>
              {this.state.models.map((model) => {
                return <option key={model.model_id}>{model.model}</option>
                })}
              </select> : <Fragment />}
              
                
              {this.state.displayDropdowns.trim ? <select
                className="dropdowns"
                name="trim"
                onChange={this.handleChangeTrim}
              >
                <option>Select a Trim</option>

              {this.state.trims.map((trim) => {
                return (
                  <option key={trim.trim_id}>{trim.trim}</option>
                )
              })}
              </select> : <Fragment />}
            </div> 
            
            {this.handleReviewButton()}
        </div>
        {/* {this.state.searchResults[0] && <SearchResults searchResults={this.state.searchResults} />} */}
      </div>
    );
  }
}

export default Searchbar;
