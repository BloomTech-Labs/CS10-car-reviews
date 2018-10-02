import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import './mainpage.css';
import SearchBar from './searchbar';
import data from '../../data';
import {DropdownToggle, DropdownMenu, DropdownItem, Button, UncontrolledDropdown, Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultsModal from '../Modals/resultsmodal';

// This is our Search Results page. Users will be brought here after clicking the 'search' button
// from the Search Bar. There are 'filter by' dropdowns and a 'sort-by' dropdown, followed by the
// search results. As with the main content, I chose to represent the result cards as Buttons. 
// This is rendered in MainPage.

const styles = {
    resultCardStyles: {


    },
    resultStyles: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    }
}

class SearchResults extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.handleReviewerFilter = this.handleReviewerFilter.bind(this);
    this.state = {
      dropdownOpen: false,
      usernames: [],
      usernameSelected: ''
    };
  }
   
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleRenderSearchResults = () => {
    const searchArr = [];
      if (this.state.usernameSelected) {
          for (let i = 0; i < this.props.location.state.searchResults.length; i ++) {
              searchArr.push(this.props.location.state.searchResults[i])
              searchArr[i].reviews = searchArr[i].reviews.filter(review => review.user.username === this.state.usernameSelected);
          }
          console.log(searchArr);
          return ( searchArr.map((car) => {
            console.log("CAR DATA: ", car);
            return (
            <Col lg="3" md="6" key={car._id}>
                <div style={styles.resultCardStyles}>
                    {car.reviews.map((review) => 
                        <ResultsModal {...car} {...review} 
                    />)}
                </div>
            </Col>
            );
        }));
      } else {
        return ( this.props.location.state.searchResults.map((car) => {
            console.log("CAR DATA: ", car);
            return (
            <Col lg="3" md="6" key={car._id}>
                <div style={styles.resultCardStyles}>
                    {car.reviews.map((review) => 
                        <ResultsModal {...car} {...review} 
                    />)}
                </div>
            </Col>
            );
        }));
      }
     
  }

  handleRedirect = () => {
      if (!this.props.location.state || !this.props.location.state.searchResults[0] 
        || this.props.location.state === undefined) {
        return <Redirect to='/' />
      } else {
          return <SearchBar isLoggedIn={this.props.location.state.isLoggedIn}/>
      }
  }

  handleReviewerFilter(username) {
    this.setState({ usernameSelected: username });
    this.handleRenderSearchResults();
  }

  componentDidMount() {
    if (this.props.location.state.searchResults[0]) {
        const usernamesArr = [];
        for (let i = 0; i < this.props.location.state.searchResults.length; i++) {
            for(let j = 0; j < this.props.location.state.searchResults[i].reviews.length; j++) {
                usernamesArr.push(this.props.location.state.searchResults[i].reviews[j].user.username);
            }
        }
        this.setState({ usernames: [...new Set (usernamesArr)] });
    } 
  }

    render() {
        return (
            <div>
                {this.handleRedirect()}
                <div className="filter-row">
                    <div className="filters"> 
                        <h5>Filter by:</h5>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Reviewer
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.state.usernames.map((username) => {
                                    return (
                                        <DropdownItem onClick={() => this.handleReviewerFilter(username)}>{username}</DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Owned
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Rented</DropdownItem>
                                <DropdownItem>Driven</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    <div className="sort-by">
                        <h5>Sort by:</h5>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Reviewer
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Rating Up</DropdownItem>
                                <DropdownItem>Rating Down</DropdownItem>
                                <DropdownItem>Year Up</DropdownItem>
                                <DropdownItem>Year Down</DropdownItem>
                                <DropdownItem>Date of Review</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                <div style={styles.resultStyles}>
                    {this.handleRenderSearchResults()}
                </div>
            </div>
        );
    }
}
 
export default SearchResults;
