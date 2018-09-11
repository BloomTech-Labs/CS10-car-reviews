import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import { Button } from 'reactstrap';

// This component generates Review and Reviewer cards. I chose to make the cards using buttons
// because they will need to be clicked on to open the review page. This is rendered in MainPage.

class MainContent extends Component {
    render() { 
        return ( 
            <div className="main-content-border">
                <h3>Featured Reviews</h3>
                <Button className="main-card"> 
                    <img src={placeholder} style={{ height: '60px', width: '60px' }} />
                    <p>Star Rating</p> 
                    <p>Year, Make, Model</p>
                    <p>Trim</p>
                    <p>Reviewer</p>
                </Button>
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
            </div>
        );
    }
}
 
export default MainContent;