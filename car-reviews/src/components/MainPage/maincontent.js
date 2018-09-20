import React, { Component } from 'react';
import SearchResults from './SearchResults';
import placeholder from '../../logo.svg';
import { Button } from 'reactstrap';
import ReviewModal from '../Modals/reviewmodal';
import axios from 'axios';

// This component generates Review and Reviewer cards. I chose to make the cards using buttons
// because they will need to be clicked on to open the review page. This is rendered in MainPage.

class MainContent extends Component {
    state = {
        popularCars: [],
        reviews: [],
        popularReviewers: []
      };

    componentWillMount() {
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

    render() { 
        return ( 
            <div className="main-content-border">
                <h3>Featured Reviews</h3>
                {this.state.reviews.map(review => {
                    return (
                        <ReviewModal {...review} />
                    );
                })}
                <h3>Popular Cars</h3>
                {this.state.popularCars.map(car => {
                    return (
                        <Button className="main-card" key={car._id}> 
                            <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                            <p>Star Rating {Math.round(car.averageScore * 100) / 100}</p>  
                            <p>{car.year} {car.make} {car.model}</p>
                            <p>{car.edition}</p>
                        </Button>
                    );
                })}
                <h3>Popular Reviewers</h3>
               {this.state.popularReviewers.map(reviewer => {
                    return (
                        <Button className="main-card" key={reviewer._id}> 
                            <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                            <p>{reviewer.username}</p>
                        </Button>
                    );
                })}
            </div>
        );
    }
}
 
export default MainContent;