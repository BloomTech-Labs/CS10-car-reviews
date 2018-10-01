import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import { Button, Row, Col, Container } from 'reactstrap';
import ReviewModal from '../Modals/reviewmodal';
import axios from 'axios';
import ReactStars from 'react-stars';
import './mainpage.css';

// This component generates Review and Reviewer cards. I chose to make the cards using buttons
// because they will need to be clicked on to open the review page. This is rendered in MainPage.

class MainContent extends Component {
    state = {
        popularCars: [],
        reviews: [],
        popularReviewers: [],
        count: 0
      };

    componentDidMount() {
        this.getUserCounter();
        const localcarsURL = "http://localhost:3001/api/popular/popular_cars";
        const localreviewsURL = "http://localhost:3001/api/popular/featured_reviews";
        const popularReviewersURL = "http://localhost:3001/api/popular/popular_reviewers"
        const deployedURL = "https://back-lambda-car-reviews.herokuapp.com/api/popular/popular_cars";
        axios.all([
            axios.get(localcarsURL),
            axios.get(localreviewsURL),
            axios.get(popularReviewersURL)
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
        // this.getUserCounter();
        console.log('the counter is ',counter);
        const config = {
          headers: { 'jwt': localStorage.getItem('jwt') }
        };
        axios.put('http://localhost:3001/api/users/data', { counter }, config)
          .then(response => {
            console.log(response);
            const newstate = {counter: counter + 1}
            console.log('new response', newstate)
            this.setState(newstate);

          })
          .catch(err => {
            console.warn(err);
          });

          
        }


        // if(this.state.counter > 3 && !this.state.paid) {
        //     alert('Please pay for a subscription or come back tommorow for more free reviews!')
        //     return console.log('to many views');
        //   } else if(this.state.counter <= 3 || this.state.paid) {


        getUserCounter = () => {
            axios
              .get('http://localhost:3001/api/users/data', {
                headers: {
                  JWT: localStorage.getItem('jwt')
                }
              })
              .then(response => {
                const newstate = {counter: response.data.timesViewed}
                this.setState(newstate)
                
              })
              .catch(err => console.warn(err));
          };

    

    render() {
        return (
            
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
                                    <Button className="main-card"> 
                                        <img src={car.imageURL} style={{ height: '60px' }} alt="" />
                                        <ReactStars
                                        type= "number"
                                        name= "score"
                                        edit= {false}
                                        half={true}
                                        count={5}
                                        value={Math.round(car.averageScore * 100) / 100}
                                        size={36}
                                        color2={'#ffd700'} />
                                        <p>Star Rating {Math.round(car.averageScore * 100) / 100}</p>  
                                        <p>{car.year} {car.make} {car.model}</p>
                                        <p>{car.edition}</p>
                                    </Button>
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
                                    <Button className="main-card"> 
                                        <p>{reviewer.username}</p>
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
                <div style={{ height: '100px'}}></div>
            </div>
        );
    }
}
 
export default MainContent;