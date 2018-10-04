import React, { Component } from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import ReviewModal from '../Modals/reviewmodal';
import PopularCar from './popularcar';
import './mainpage.css';

// This component generates Review and Reviewer cards. I chose to make the cards using buttons
// because they will need to be clicked on to open the review page. This is rendered in MainPage.

const currentDate = new Date();

const date = currentDate.getDate();
const month = currentDate.getMonth(); 
const year = currentDate.getFullYear()
const dateString = date + "-" +(month + 1) + "-" + year;

class MainContent extends Component {
    state = {
        popularCars: [],
        reviews: [],
        popularReviewers: [],
        counter: 0,
        newdate: dateString,
        olddate:  dateString,
        searchResults: [],
        searching: false
      };

    componentDidMount() {

        //conditional rendering based on that date
        
        this.getUserCounter();
        const localcarsURL = "http://localhost:3001/api/popular/popular_cars";
        const localreviewsURL = "http://localhost:3001/api/popular/featured_reviews";
        const popularReviewersURL = "http://localhost:3001/api/popular/popular_reviewers"

        const deployedPopCars = "https://back-lambda-car-reviews.herokuapp.com/api/popular/popular_cars";
        const deployedFeatReviews = "https://back-lambda-car-reviews.herokuapp.com/api/popular/featured_reviews";
        const deployedPopReviewers = "https://back-lambda-car-reviews.herokuapp.com/api/popular/popular_reviewers";
        axios.all([
            axios.get(deployedPopCars),
            axios.get(deployedFeatReviews),
            axios.get(deployedPopReviewers)
        ])
        .then(axios.spread((carsRes, reviewsRes, reviewersRes) => {
            this.setState({ popularCars: carsRes.data, 
                reviews: reviewsRes.data, 
                popularReviewers: reviewersRes.data
            });
        }))
        .catch(error => {
            console.error('Server Error', error)
        });
    }

    updateUserCounter = () => {
        const counter = this.state.counter;

        const newDate = this.state.newdate;
        const oldDate = this.state.olddate;




        console.log('the new date is', newDate);
        console.log('the ols date is', oldDate);

        // this.getUserCounter();
        // console.log('the counter is ',counter);
        const config = {
          headers: { 'jwt': localStorage.getItem('jwt') }
        };
        axios.put('http://localhost:3001/api/users/data', { counter, newDate }, config)
          .then(response => {
            console.log(response);
            const newstate = {counter: counter + 1}
             console.log('you haven ', newstate, ' reviews left')
            this.setState(newstate);
            
            if((this.state.counter > 3 && !response.data.paid) || (oldDate === newDate &&  this.state.counter > 3 && !response.data.paid )) {
                alert('Please pay for a subscription or come back tommorow for more free reviews!')
                window.location = '/';
                // return console.log('to many views');
            } else if(this.state.counter <= 3 || response.data.paid) {
                //do nothing until its time.
            }

          })
          .catch(err => {
            console.warn(err);
          });

          
        }


    getUserCounter = () => {
        axios
            .get('http://localhost:3001/api/users/data', {
            headers: {
                JWT: localStorage.getItem('jwt')
            }
            })
            .then(response => {
            

            if(this.state.olddate !== this.state.newdate){ 
                console.log('The dates do not match!')
                const newstate = {counter: 0, olddate: response.data.date}
                this.setState(newstate)
            } else {
                const newstate = {counter: response.data.timesViewed, olddate: response.data.date}
                this.setState(newstate)
            }
            
            
            })
            .catch(err => console.warn(err));
        };

    userToSearch = (reviewer) => {
      axios
          .post('https://back-lambda-car-reviews.herokuapp.com/api/reviews/search', { reviewer })
          .then(response => {
              console.log(response);
              this.setState({ searchResults: response.data });
          })
          .catch(err => {
              console.log("ERROR: ", err.message)
          });
    }

    componentDidUpdate() {
        if (this.state.searchResults[0]) {
            this.setState({ searching: true })
        }
    }

    handleRedirect = () => {
        if (this.state.searching) {
          return <Redirect to={{
            pathname: '/searchpage',
            state: {
              isLoggedIn: this.props.isLoggedIn,
              searchResults: this.state.searchResults,
              currentPage: '/searchpage'
            }
          }} />
        }
    }

    render() { 
        return (
            <div className="main-content-container" >
            {this.handleRedirect()}
            <div className="main-content">
            <div style={{ height: '20px'}}></div>
                <Container>
                    <h3 className="header">Featured Reviews</h3>
                    <Row>
                        {this.state.reviews.map(review => {
                            return (
                                <Col lg="3" md="6" key={review._id} onClick ={this.updateUserCounter}>
                                    <ReviewModal {...review}/>
                                </Col>
                            );
                        })}
                    </Row>
                    <h3 className="header">Popular Cars</h3>
                    <Row>
                        {this.state.popularCars.map(car => {
                            return (
                                <Col lg="3" md="6" key={car._id}>
                                    <PopularCar {...car} isLoggedIn={this.props.isLoggedIn}/>
                                </Col>
                            );
                        })}
                    </Row>
                    <div style={{ height: '50px'}}></div>
                    <h3 className="header">Popular Reviewers</h3>
                    <Row>
                        {this.state.popularReviewers.map(reviewer => {
                            return (
                                <Col lg="3" md="6" key={reviewer._id}>
                                    <Button className="main-card" 
                                    onClick={()=>this.userToSearch(reviewer.username)}> 
                                        <p>{reviewer.username}</p>
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
                <div style={{ height: '100px'}}></div>
                </div>
            </div>
        );
    }
}
 
export default MainContent;