import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import './mainpage.css';
import SearchBar from './searchbar';
import data from '../../data';
import {DropdownToggle, DropdownMenu, DropdownItem, 
    Button, UncontrolledDropdown, Col, Container, Row} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultsModal from '../Modals/resultsmodal';
import Navbar from './navbar';
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
    this.state = {
      dropdownOpen: false,
      usernames: [],
      usernameSelected: '',
    };
  }

  filter = memoize(
    (list, filterText) => list.filter(item => item.user.username.includes(filterText))
  );
   
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
          return <SearchBar isLoggedIn={this.props.location.state.isLoggedIn}/>
      }
  }

  handleReviewerFilter(username) {
    this.setState({ usernameSelected: username });
  }

  handleResetFilter() {
    this.setState({ usernameSelected: '' });
  }

  componentDidMount() {
    const { searchResults } = this.props.location.state;
    const usernamesArr = [];
    for (let i = 0; i < searchResults.length; i++) {
        usernamesArr.push(searchResults[i].user.username);
    }
    this.setState({ usernames: [...new Set (usernamesArr)] });
  }

    render() {
        const filteredList = this.filter(this.props.location.state.searchResults, this.state.usernameSelected);
        return (
            <div>
                <Navbar 
                    isLoggedIn={this.props.location.state.isLoggedIn}
                />
                {this.handleRedirect()}
                <div className="filter-row">
                    <div className="filters"> 
                        <h5>Filter by:</h5>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Reviewer
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.handleResetFilter()}>
                                    All Users
                                </DropdownItem>
                                {this.state.usernames.map((username) => {
                                    return (
                                        <DropdownItem key={username}
                                        onClick={() => this.handleReviewerFilter(username)}>{username}
                                        </DropdownItem>
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
                <Container>
                    <Row>
                        {filteredList.map(review =>
                            <Col lg="3" md="6" key={review._id}>
                                <ResultsModal {...review.car} {...review}  {...review.user} />
                            </Col>
                        )}
                    </Row>    
                </Container>
            </div>
        );
    }
}
 
export default SearchResults;
