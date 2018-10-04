import React, { Component, Fragment } from 'react';
import ReactStars from 'react-stars';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './mainpage.css';
import defaultImg from '../Assets/default_img.png';

class PopularCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: props.imageURL[0],
            selectedValues: {
                year: props.year,
                make: props.make,
                model: props.model,
                trim: props.edition
            },
            searching: false,
            searchResults: []
        };
    }

    searchFunction = () => {
        console.log(this.state.selectedValues);
        const { year, make, model, trim } = this.state.selectedValues
        axios
            .post('https://back-lambda-car-reviews.herokuapp.com/api/reviews/search', 
                {year, make, model, trim})
            .then(response => {
                this.setState({ searchResults: response.data, searching: true });
            })
            .catch(err => {
                console.log("ERROR: ", err.message)
            });
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
        } else {
          return <Fragment />
        }
    }

    render() {
        const { averageScore, year, make, model, edition } = this.props;
        const { imageURL } = this.state;
        return (
          <div>
            {this.handleRedirect()}
            <Button className="modal-button" onClick={()=>this.searchFunction()}>
                <div>
                    <img src={imageURL? imageURL : defaultImg} 
                    style={{ height: '50%', width: '50%' }} alt=""/>
                </div>
                <ReactStars
                  type= "number"
                  name= "score"
                  edit= {false}
                  half={true}
                  count={5}
                  value={Math.round(averageScore * 100) / 100}
                  size={36}
                  color2={'#ffd700'} />
                <div>{year} {make} {model}</div>
                <p>{edition}</p>
            </Button>
          </div>
        );
    }
}

export default PopularCar;