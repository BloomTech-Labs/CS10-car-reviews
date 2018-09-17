import React, { Fragment } from 'react';
import './ContentCard.css';
import { 
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg,
    CardFooter
} from 'reactstrap';

// * TODO: Handle dynamic image sizing
// * TODO: Link out to reviewer's page under review
// * TODO: Add the actual star rating
// * TODO: Distinguish between clicking to view the review vs clicking to view the reviewer. All clicks open the review modal at present
const ContentCard = ({ content, cardType }) => {
    console.log(cardType);
    return(
        <Card className='contentCard'>
            <CardImg 
                // className='contentCard__image'
                top
                width="100%"
                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" 
            />
            <CardBody>
                { /* here the cardType determines what is conditionally rendered */ }
                { cardType !==  'reviewer' ?  <CardTitle>star rating</CardTitle> : <Fragment /> }
                { cardType !==  'reviewer' ?  <CardTitle>{`${content.year} ${content.make} ${content.model}`}</CardTitle> : <Fragment /> }
                { cardType !==  'reviewer' ?  <CardText>{content.edition}</CardText> : <Fragment /> }
                { cardType === 'featured_review' || 'reviewer' ?  <CardText>{content.username}</CardText> : <Fragment /> }
            </CardBody>
        </Card>
    )
}

export default ContentCard;

// { // here if the type is either a featured review or a popular car it will render the star rating
//     cardType === 'featured_review' || 'popular_car' ?  <p>star rating</p> : <Fragment /> 
// }
// {
//     cardType === 'featured_review' || 'popular_car' ?  <p>car model</p> : <Fragment /> 
// }
// {
//     cardType === 'featured_review' || 'popular_car' ?  <p>car edition</p> : <Fragment /> 
// }
// {
//     cardType === 'featured_review' || 'reviewer' ?  <p>reviewer username</p> : <Fragment /> 
// }