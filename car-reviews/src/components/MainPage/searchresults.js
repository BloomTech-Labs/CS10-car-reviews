import React, { Component } from 'react';
import './mainpage.css';

import {DropdownToggle, DropdownMenu, DropdownItem, 
    Button, UncontrolledDropdown, Col, Container, Row, UncontrolledCollapse} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultsModal from '../Modals/resultsmodal';
import Navbar from './navbar';
import memoize from "memoize-one";
import axios from 'axios';
import SearchFilter from './searchfilter';
import { FaCaretRight } from 'react-icons/fa';

// This is our Search Results page. Users will be brought here after clicking the 'search' button
// from the Search Bar. There are 'filter by' dropdowns and a 'sort-by' dropdown, followed by the
// search results. As with the main content, I chose to represent the result cards as Buttons. 
// This is rendered in MainPage.
const dbRequests = `https://back-lambda-car-reviews.herokuapp.com/auth/verify`;


class SearchResults extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      dropdownOpen: false,
      selectedOption: {
          years: new Set(),
          makes: new Set(),
          models: new Set(),
          users: new Set()
      }
    };
  }

  usersFilter = memoize(
    (list, filterSet) => {
        if (filterSet.size === 0) return list
        return list.filter(item => filterSet.has(item.user.username))
    }
  );

  makesFilter = memoize(
    (list, filterSet) =>  {
        if (filterSet.size === 0) return list
        return list.filter(item => filterSet.has(item.car.make))
    }
  );

  modelsFilter = memoize (
    (list, filterSet) => {
        if (filterSet.size === 0) return list 
        return list.filter(item => filterSet.has(item.car.model))
    }
  );

  yearsFilter = memoize (
    (list, filterSet) => {
        if (filterSet.size === 0) return list 
        return list.filter(item => filterSet.has(item.car.year))
    } 
  )

  sort = (list, sortBy = null) => {
    switch (sortBy) {
        case 'ratingAsc':
            return list.sort(function(a, b) {
                return a.score - b.score;
            });
        case 'ratingDsc':
            return list.sort(function(a, b) {
                return b.score - a.score;
            }); 
        case 'yearAsc':
            return list.sort(function(a, b) {
                return a.car.year - b.car.year;
            }); 
        case 'yearDsc':
            return list.sort(function(a, b) {
                return b.car.year - a.car.year;
            });
        default:
            return list.sort(function(a, b) {
                var nameA = a.car.make.toUpperCase(); 
                var nameB = b.car.make.toUpperCase(); 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
    }
  }
   
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleRedirect = () => {
      if (!this.props.location.state || !this.props.location.state.searchResults[0] 
        || this.props.location.state === undefined) {
        return <Redirect to='/' />
      } else {
          return (
            <Container>
               <Row style={{marginTop:110, marginBottom:60, marginLeft:-50}}>
                    <Col className="mt-0 p-0">
                        <Button color="primary" id="filter-toggler" style={{ marginBottom: '1rem' }} className="mt-1">
                            Filter By <FaCaretRight />
                        </Button> 
                    </Col> 
            
                    <Col>
                        <UncontrolledCollapse toggler="#filter-toggler">
                            <SearchFilter data={this.state.allYears} type={'years'}
                                handleFilter={this.handleFilter}>
                                Years
                            </SearchFilter>   
                        </UncontrolledCollapse>
                    </Col>
                    <Col>
                        <UncontrolledCollapse toggler="#filter-toggler">
                            <SearchFilter data={this.state.allMakes} type={'makes'}
                                handleFilter={this.handleFilter}>
                                Makes
                            </SearchFilter>
                        </UncontrolledCollapse>
                    </Col>    
                    <Col>
                        <UncontrolledCollapse toggler="#filter-toggler">
                            <SearchFilter data={this.state.allModels} type={'models'}
                                handleFilter={this.handleFilter}>
                                Models
                            </SearchFilter>
                        </UncontrolledCollapse>
                    </Col>
                    <Col>
                        <UncontrolledCollapse toggler="#filter-toggler">      
                            <SearchFilter data={this.state.allUsers} type={'users'}
                                handleFilter={this.handleFilter}>
                                Users   
                            </SearchFilter>
                        </UncontrolledCollapse>
                    </Col>
                </Row>
            </Container>
          )
      }
  }


  handleFilter(dataSelected, type) {
      this.setState((state) => { 
        const newData = new Set(dataSelected);
        return { [type]: newData, 
                selectedOption: {
                    ...state.selectedOption,
                    [type]: newData }
                };
      });
  }

  handleSort(sortingOption) {
    this.setState({ sortBy: sortingOption });
  }

  sortInit = (type, list) => {
    switch(type) {
        case 'number' :
            return list.sort(function(a, b) {
                return b - a;
            }); 
        case 'word':
            return list.sort(function(a, b) {
                let nameA = a.toUpperCase(); 
                let nameB = b.toUpperCase(); 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
    }
  }

  componentWillMount() {
    const { searchResults } = this.props.location.state;
    const usernamesArr = [];
    const makesArr = [];
    const modelsArr = [];
    const yearsArr = [];

    const localJWT = localStorage.getItem('jwt');

    for (let i = 0; i < searchResults.length; i++) { 
        usernamesArr.push(searchResults[i].user.username);
        makesArr.push(searchResults[i].car.make);
        modelsArr.push(searchResults[i].car.model);
        yearsArr.push(searchResults[i].car.year);
    }
    this.setState({ 
        allUsers: new Set(this.sortInit('word', usernamesArr)), 
        users: new Set(usernamesArr),
        allMakes: new Set(this.sortInit('word', makesArr)),
        makes: new Set(makesArr),
        allModels: new Set (this.sortInit('word', modelsArr)), 
        models: new Set(modelsArr),
        allYears: new Set(this.sortInit('number', (yearsArr))),
        years: new Set(yearsArr)
        });

    if (!localJWT) this.handleLogin(false);
    else {
      axios.get(dbRequests, { headers: { jwt: localJWT } })
        .then(response => {
          const { tokenIsValid } = response.data
          if (tokenIsValid) this.handleLogin(tokenIsValid);
          else this.handleLogin(false);
        })
        .catch(err => {
          console.log(err);
          this.handleLogin(false);
        })
    }
  }

  handleLogin = (status) => {
    console.log(`JWT is ${status}`)
    this.setState({ isLoggedIn: status });
  }

  resetState = () => {
    const { searchResults } = this.props.location.state;
    const yearsSize = this.state.selectedOption.years.size
    const usersSize = this.state.selectedOption.users.size
    const makesSize = this.state.selectedOption.makes.size
    const modelsSize = this.state.selectedOption.models.size
    const usernamesArr = [];
    const makesArr = [];
    const modelsArr = [];
    const yearsArr = [];
    for (let review of searchResults) {
        yearsArr.push(review.car.year)
        usernamesArr.push(review.user.username);
        makesArr.push(review.car.make)
        modelsArr.push(review.car.model)
    }
    this.setState({ filteredResults: searchResults,
        allYears: new Set(this.sortInit('number', yearsArr)),
        allUsers: new Set(this.sortInit('word', usernamesArr)), 
        allMakes: new Set(this.sortInit('word', makesArr)),
        allModels: new Set (this.sortInit('word', modelsArr)), },
            () => {
                if (yearsSize && !usersSize && !makesSize && !modelsSize) this.yearsChanged();
                if (usersSize && !yearsSize && !makesSize && !modelsSize) this.usersChanged();
                if (makesSize && !yearsSize && !usersSize && !modelsSize) this.makesChanged();
                if (modelsSize && !yearsSize && !usersSize && !makesSize) this.modelsChanged();

                if (yearsSize && usersSize && !makesSize && !modelsSize) this.yearsAndUsersChanged();
                if (yearsSize && makesSize && !usersSize && !modelsSize) this.yearsAndMakesChanged();
                if (yearsSize && modelsSize && !usersSize && !makesSize) this.yearsAndModelsChanged();

                if (yearsSize && usersSize && makesSize) this.updateOne('allModels');
                if (yearsSize && usersSize && modelsSize) this.updateOne('allMakes');
                if (yearsSize && makesSize && modelsSize) this.updateOne('allUsers');
                if (usersSize && makesSize && modelsSize) this.updateOne('allYears');

                if (makesSize && usersSize && !yearsSize && !modelsSize) this.makesAndUsersChanged();
                if (usersSize && modelsSize && !yearsSize && !makesSize) this.usersAndModelsChanged();
                if (makesSize && modelsSize && !yearsSize && !usersSize) this.makesAndModelsChanged();
            });
  }

  yearsAndUsersChanged() {
    const {years, makes, models, users} = this.state;
    const {searchResults} = this.props.location.state;
    const filter = this.yearsFilter(this.usersFilter(searchResults, users), years);
    const makesArr = [];
    const modelsArr = [];
    for (let review of filter) {
        makesArr.push(review.car.make)
        modelsArr.push(review.car.model)
    }
    this.setState({
        allModels: new Set(this.sortInit('word', modelsArr)), 
        allMakes: new Set(this.sortInit('word', makesArr))});
  }

  yearsAndMakesChanged() {
    const {years, makes, models, users} = this.state;
    const {searchResults} = this.props.location.state;
    const filter = this.yearsFilter(this.makesFilter(searchResults, makes), years);
    const usersArr = [];
    const modelsArr = [];
    for (let review of filter) {
        usersArr.push(review.user.username)
        modelsArr.push(review.car.model)
    }
    this.setState({
        allUsers: new Set(this.sortInit('word', usersArr)), 
        allModels: new Set(this.sortInit('word', modelsArr))});
  }

  yearsAndModelsChanged() {
    const {years, makes, models, users} = this.state;
    const {searchResults} = this.props.location.state;
    const filter = this.yearsFilter(this.modelsFilter(searchResults, models), years);
    const usersArr = [];
    const makesArr = [];
    for (let review of filter) {
        usersArr.push(review.user.username)
        makesArr.push(review.car.make)
    }
    this.setState({
        allUsers: new Set(this.sortInit('word', usersArr)), 
        allMakes: new Set(this.sortInit('word', makesArr))});
  }

  makesAndUsersChanged() {
    const {years, makes, models, users} = this.state;
    const {searchResults} = this.props.location.state;
    const filter = this.usersFilter(this.makesFilter(searchResults, makes), users);
    const modelsArr = [];
    const yearsArr = [];
    for (let review of filter) {
        modelsArr.push(review.car.model)
        yearsArr.push(review.car.year)
    }
    this.setState({
        allModels: new Set(this.sortInit('word', modelsArr)), 
        allYears: new Set(this.sortInit('number', yearsArr))});
  }

  usersAndModelsChanged() {
    const {years, makes, models, users} = this.state;
    const {searchResults} = this.props.location.state;
    const filter = this.usersFilter(this.modelsFilter(searchResults, models), users);
    const makesArr = [];
    const yearsArr = [];
    for (let review of filter) {
        makesArr.push(review.car.make)
        yearsArr.push(review.car.year)
    }
    this.setState({
        allMakes: new Set(this.sortInit('word', makesArr)), 
        allYears: new Set(this.sortInit('number', yearsArr))});
  }

  makesAndModelsChanged() {
    const {years, makes, models, users} = this.state;
    const {searchResults} = this.props.location.state;
    const filter = this.makesFilter(this.modelsFilter(searchResults, models), makes);
    const usersArr = [];
    const yearsArr = [];
    for (let review of filter) {
        usersArr.push(review.user.username)
        yearsArr.push(review.car.year)
    }
    this.setState({
        allUsers: new Set(this.sortInit('word', usersArr)), 
        allYears: new Set(this.sortInit('number', yearsArr))});
  }


  updateOne = type => {
    const {years, makes, models, users} = this.state;
    const {searchResults} = this.props.location.state;
    const filter = this.yearsFilter(this.modelsFilter(this.makesFilter(this.usersFilter(searchResults, users), makes), models), years)
    const usersArr = [];
    const makesArr = [];
    const modelsArr = [];
    const yearsArr = [];
    for (let review of filter) {
        usersArr.push(review.user.username);
        makesArr.push(review.car.make)
        modelsArr.push(review.car.model)
        yearsArr.push(review.car.year);
    }
    let newSet;
    switch(type) {
        case 'allYears':
            newSet = new Set(this.sortInit('number', yearsArr));
            break;
        case 'allModels':
            newSet = new Set(this.sortInit('word', modelsArr));
            break;
        case 'allMakes':
            newSet = new Set(this.sortInit('word', makesArr));
            break;
        case 'allUsers': 
            newSet = new Set(this.sortInit('word', usersArr));
            break;
    }
   
    this.setState({ [type]: newSet });
  }

  yearsChanged = () => {
    const {years, makes, models, users, filteredResults} = this.state;
    const { searchResults } = this.props.location.state;
    const filter = this.yearsFilter(searchResults, years);
    const usernamesArr = [];
    const makesArr = [];
    const modelsArr = [];
    for (let review of filter) {
        usernamesArr.push(review.user.username);
        makesArr.push(review.car.make)
        modelsArr.push(review.car.model)
    }
    this.setState({
                    allUsers: new Set(this.sortInit('word', usernamesArr)), 
                    allMakes: new Set(this.sortInit('word', makesArr)),
                    allModels: new Set (this.sortInit('word', modelsArr)), });
  }

  makesChanged = () => {
    const {years, makes, models, users, filteredResults} = this.state;
    const { searchResults } = this.props.location.state;
    const filter = this.makesFilter(searchResults, makes);
    const usernamesArr = [];
    const modelsArr = [];
    const yearsArr = []
    for (let review of filter) {
        yearsArr.push(review.car.year)
        usernamesArr.push(review.user.username);
        modelsArr.push(review.car.model)
    }
    this.setState({ 
                    allYears: new Set(this.sortInit('number', yearsArr)),
                    allUsers: new Set(this.sortInit('word', usernamesArr)), 
                    allModels: new Set (this.sortInit('word', modelsArr)), });
  }

  modelsChanged = () => {
    const {years, makes, models, users, filteredResults} = this.state;
    const { searchResults } = this.props.location.state;
    const filter = this.modelsFilter(searchResults, models);
    const usernamesArr = [];
    const makesArr = [];
    const yearsArr = [];
    for (let review of filter) {
        usernamesArr.push(review.user.username);
        makesArr.push(review.car.make)
        yearsArr.push(review.car.year)
    }
    this.setState({ 
            allUsers: new Set(this.sortInit('word', usernamesArr)),
            allYears: new Set(this.sortInit('number', yearsArr)), 
            allMakes: new Set(this.sortInit('word', makesArr))});
  }

  usersChanged = (self) => {
    const {years, makes, models, users, filteredResults} = this.state;
    const { searchResults } = this.props.location.state;
    const filter = this.usersFilter(searchResults, users);
    const usersArr = [];
    const modelsArr = [];
    const makesArr = [];
    const yearsArr = [];
    for (let review of filter) {
        usersArr.push(review.user.username)
        modelsArr.push(review.car.model);
        makesArr.push(review.car.make)
        yearsArr.push(review.car.year)
    }
    this.setState({
            allModels: new Set(this.sortInit('word', modelsArr)),
            allYears: new Set(this.sortInit('number', yearsArr)), 
            allMakes: new Set(this.sortInit('word', makesArr))});
  }

  componentDidUpdate(prevProps, prevState) {
    const {years, makes, models, users} = this.state;
    // if (years.size === 0 && prevState.years.size !== 0 || users.size === 0 && prevState.users.size !== 0 ||
    //     models.size === 0 && prevState.models.size !== 0 || makes.size == 0 && prevState.makes.size !== 0) {
        if (years != prevState.years || makes != prevState.makes || models != prevState.models || users != prevState.users) {
            this.resetState();
        }
    // } else {
        // if (years != prevState.years) this.yearsChanged();  
        // if (makes != prevState.makes) this.makesChanged()
        // if (models != prevState.models) this.modelsChanged();
        // if (users != prevState.users) this.usersChanged();
        // this.resetState();
    
  }

    render() {
        const { usernameSelected, sortBy, users, makes, models, years } = this.state;
        const { searchResults } = this.props.location.state;
        const filteredList = this.sort(
            this.yearsFilter(this.modelsFilter(this.makesFilter(this.usersFilter
                (searchResults, users), makes), models), years), sortBy);
        return (
            <div>
                <Navbar 
                    isLoggedIn={this.props.location.state.isLoggedIn}
                    handleLogin={this.handleLogin}
                />
                {this.handleRedirect()}
                <div className="filter-row">
                    {/* <div className="filters">
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret className="searchbar-buttons">
                                Filter By:
                            </DropdownToggle>
                            <DropdownMenu>
                                

                                <DropdownItem onClick={() => this.handleResetFilter('usernameSelected')}>
                                    All Users
                                </DropdownItem>
                                {this.state.usernames && <div>
                                {this.state.allUsernames.map((username) => {
                                    return (
                                        <DropdownItem key={username}
                                        onClick={() => this.handleReviewerFilter(username)}>{username}
                                        </DropdownItem>
                                    );
                                })} </div>}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div> */}
                    <div className="sort-by">
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret className="searchbar-buttons">
                                Sort By:
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.handleSort()}>
                                    Make
                                </DropdownItem>
                                <DropdownItem onClick={()=> this.handleSort('ratingAsc')}>
                                    Rating Up
                                </DropdownItem>
                                <DropdownItem onClick={()=> this.handleSort('ratingDsc')}>
                                    Rating Down
                                </DropdownItem>
                                <DropdownItem onClick={()=> this.handleSort('yearAsc')}>
                                    Year Up
                                </DropdownItem>
                                <DropdownItem onClick={()=> this.handleSort('yearDsc')}>
                                    Year Down
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                <Container style={{ marginBottom: '100px' }}>
                    <Row style = {{ marginTop: '20px' }}>                   
                        {filteredList.map(review =>
                            <ResultsModal key={review._id} {...review.car} {...review}  {...review.user} />
                        )}
                    </Row>    
                </Container>
            </div>
        );
    }
}
 
export default SearchResults;