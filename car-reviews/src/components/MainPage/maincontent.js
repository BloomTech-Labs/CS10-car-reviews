import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import { Button } from 'reactstrap';

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