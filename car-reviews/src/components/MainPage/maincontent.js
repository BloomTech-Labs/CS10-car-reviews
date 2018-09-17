import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import { Button } from 'reactstrap';
import ReviewModal from '../Modals/reviewmodal';
import CardsContainer from './CardsContainer';
import data from '../../data';

// This component generates Review and Reviewer cards. I chose to make the cards using buttons
// because they will need to be clicked on to open the review page. This is rendered in MainPage.

const styles = {
    headerStyle: {
        marginTop: '2%'
    }
}

// * TODO: We either need to make our requests to get the data here, or do it in the individual CardsContainer Components
// ** Optional: Convert the Featured Reviews section to the way the other sections are being rendered
class MainContent extends Component {
    render() { 
        return ( 
            <div className="main-content-border">
                <h3 style={styles.headerStyle}>Featured Reviews</h3>
                <ReviewModal />

                <CardsContainer 
                    header='Popular Cars'
                    cardType='popular_car'
                    content={data.cars}
                />

                <CardsContainer 
                    header='Popular Reviewers'
                    cardType='reviewer'
                    content={data.reviewers}
                />
            </div>
        );
    }
}
 
export default MainContent;

{/* <div className="main-content-border">
                <h3 style={styles.headerStyle}>Featured Reviews</h3>
                <ReviewModal />
                <h3>Popular Cars</h3>
                <Button className="main-card"> 
                    <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                    <p>Star Rating</p> 
                    <p>Year, Make, Model</p>
                    <p>Trim</p>
                </Button>
                <h3>Popular Reviewers</h3>
                <Button className="main-card"> 
                    <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                    <p>Reviewer</p>
                </Button>
            </div> */}