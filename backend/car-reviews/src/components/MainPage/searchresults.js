import React, { Component } from 'react';
import './mainpage.css';
import ResultsSearchbar from './resultssearchbar';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Container,
  Row
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultsModal from '../Modals/resultsmodal';
import Navbar from './navbar';
import memoize from 'memoize-one';
import axios from 'axios';

// This is our Search Results page. Users will be brought here after clicking the 'search' button
// from the Search Bar. There are 'filter by' dropdowns and a 'sort-by' dropdown, followed by the
// search results. As with the main content, I chose to represent the result cards as Buttons.
// This is rendered in MainPage.
const dbRequests = `https://back-lambda-car-reviews.herokuapp.com/auth/verify`;

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      usernames: [],
      usernameSelected: '',
      sortBy: ''
    };
  }

  filter = memoize((list, filterText) =>
    list.filter(item => item.user.username.includes(filterText))
  );

  sort = (list, sortBy) => {
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
          var nameA = a.user.username.toUpperCase();
          var nameB = b.user.username.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
    }
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleRedirect = () => {
    if (
      !this.props.location.state ||
      !this.props.location.state.searchResults[0] ||
      this.props.location.state === undefined
    ) {
      return <Redirect to="/" />;
    } else {
      return (
        <ResultsSearchbar
          isLoggedIn={this.props.location.state.isLoggedIn}
          handleLogin={this.handleLogin}
        />
      );
    }
  };

  handleReviewerFilter(username) {
    this.setState({ usernameSelected: username });
  }

  handleSortFilter(sortingOption) {
    this.setState({ sortBy: sortingOption });
  }

  handleResetFilter() {
    this.setState({ usernameSelected: '' });
  }

  componentDidMount() {
    const { searchResults } = this.props.location.state;
    const usernamesArr = [];
    const localJWT = localStorage.getItem('jwt');

    for (let i = 0; i < searchResults.length; i++) {
      usernamesArr.push(searchResults[i].user.username);
    }
    this.setState({ usernames: [...new Set(usernamesArr)] });

    if (!localJWT) this.handleLogin(false);
    else {
      axios
        .get(dbRequests, { headers: { jwt: localJWT } })
        .then(response => {
          const { tokenIsValid } = response.data;
          if (tokenIsValid) this.handleLogin(tokenIsValid);
          else this.handleLogin(false);
        })
        .catch(err => {
          console.log(err);
          this.handleLogin(false);
        });
    }
  }

  handleLogin = status => {
    this.setState({ isLoggedIn: status });
  };

  render() {
    const { usernameSelected, sortBy } = this.state;
    const filteredList = this.sort(
      this.filter(this.props.location.state.searchResults, usernameSelected),
      sortBy
    );
    return (
      <div>
        {this.handleRedirect()}
        <Navbar isLoggedIn={this.props.location.state.isLoggedIn} handleLogin={this.handleLogin} />
        <div className="filter-row">
          <div className="filters">
            <UncontrolledDropdown className="dropdowns">
              <DropdownToggle caret className="searchbar-buttons">
                Filter By:
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.handleResetFilter()}>All Users</DropdownItem>
                {this.state.usernames.map(username => {
                  return (
                    <DropdownItem
                      key={username}
                      onClick={() => this.handleReviewerFilter(username)}
                    >
                      {username}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="sort-by">
            <UncontrolledDropdown className="dropdowns">
              <DropdownToggle caret className="searchbar-buttons">
                Sort By:
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.handleSortFilter('ratingAsc')}>
                  Rating Up
                </DropdownItem>
                <DropdownItem onClick={() => this.handleSortFilter('ratingDsc')}>
                  Rating Down
                </DropdownItem>
                <DropdownItem onClick={() => this.handleSortFilter('yearAsc')}>
                  Year Up
                </DropdownItem>
                <DropdownItem onClick={() => this.handleSortFilter('yearDsc')}>
                  Year Down
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <Container style={{ marginBottom: '100px' }}>
          <Row style={{ marginTop: '20px' }}>
            {filteredList.map(review => (
              <ResultsModal key={review._id} {...review.car} {...review} {...review.user} />
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default SearchResults;
