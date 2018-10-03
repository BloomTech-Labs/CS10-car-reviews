import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import './mainpage.css';
import SearchBar from './searchbar';
import data from '../../data';
import {DropdownToggle, DropdownMenu, DropdownItem, Button, UncontrolledDropdown, Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultsModal from '../Modals/resultsmodal';
import memoize from "memoize-one";

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
    // this.handleReviewerFilter = this.handleReviewerFilter.bind(this);
    this.state = {
      dropdownOpen: false,
      usernames: [],
      usernameSelected: '',
    };
  }

  filter = memoize((list, filterText) => {
      const newList = list.slice();
      for (let i = newList.length - 1; i >= 0; i--) {
        newList[i].reviews = newList[i].reviews.filter(review => review.user.username.includes(filterText));
        if (list[i].reviews.length === 0) {
            newList.splice(i, 1);
        }
      }
      return newList;
    }
  );
   
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleRenderSearchResults = () => {
    console.log(this.state);
    console.log(this.props);
    const { searchResults, usernameSelected } = this.state; 
    const searchArr = [];
      if (usernameSelected) {
          for (let i = 0; i < searchResults.length; i ++) {
              searchArr.push(searchResults[i])
              searchArr[i].reviews = searchArr[i].reviews.filter(review => review.user.username === this.state.usernameSelected);
          }
          console.log(searchArr);
          return ( searchArr.map((car) => {
            console.log("CAR DATA: ", car);
            return (
            <Col lg="3" md="6" key={car._id}>
                <div style={styles.resultCardStyles}>
                    {car.reviews.map((review) => 
                        <ResultsModal key={review._id} {...car} {...review} 
                    />)}
                </div>
            </Col>
            );
        }));
      } else {
        return (searchResults.map((car) => {
            console.log("CAR DATA: ", car);
            return (
            <Col lg="3" md="6" key={car._id}>
                <div style={styles.resultCardStyles}>
                    {car.reviews.map((review) => 
                        <ResultsModal  key={review._id} {...car} {...review} 
                    />)}
                </div>
            </Col>
            );
        }));
      }
     
  }

//   handleRedirect = () => {
//       if (!this.props.location.state || !this.props.location.state.searchResults[0] 
//         || this.props.location.state === undefined) {
//         return <Redirect to='/' />
//       } else {
//           return <SearchBar isLoggedIn={this.props.location.state.isLoggedIn}/>
//       }
//   }

  handleReviewerFilter(username) {
    this.setState({ usernameSelected: username });
  }

//   handleChange = event => {
//     this.setState({ usernameSelected: event.target.value });
//   };

  componentDidMount() {
    // if (this.props.searchResults[0]) {
        const { searchResults } = this.props;
        const usernamesArr = [];
        for (let i = 0; i < searchResults.length; i++) {
            for(let j = 0; j < searchResults[i].reviews.length; j++) {
                usernamesArr.push(searchResults[i].reviews[j].user.username);
            }
        }
        this.setState({ usernames: [...new Set (usernamesArr)] });
    // } 
  }

    render() {
        const filteredList = this.filter(this.props.searchResults, this.state.usernameSelected);
        return (
            <div>
                {/* {this.handleRedirect()} */}
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
                {/* <input onChange={this.handleChange} value={this.state.usernameSelected} /> */}
                <div style={styles.resultStyles}>
                    {/* {this.handleRenderSearchResults()} */}
                    {filteredList.map(car => {
                        const reviews = car.reviews.map(review => <ResultsModal key={review._id} {...car} {...review} />)
                        return reviews
                    })}
                </div>
            </div>
        );
    }
}
 
export default SearchResults;
