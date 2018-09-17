import React, { Component, Fragment } from 'react';
import './CardsContainer.css';
import ContentCard from './ContentCard';

class CardsContainer extends Component {
    handleMappingContent = () => {
        return this.props.content.map(card => {
            return <ContentCard content={card} cardType={this.props.cardType}/>
        })
    }

    render(){
        const { header } = this.props;
        return(
            <div className='cardsContainer__main'>
                <h3>{header}</h3>

                <div className='cardsContainer'>
                    {this.handleMappingContent()}
                </div>
            </div>
        )
    }
}

export default CardsContainer;