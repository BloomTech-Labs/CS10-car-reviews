import React, { Component, Fragment } from 'react';
import ReactStars from 'react-stars';
import { Button, Row, Col, Container } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './mainpage.css';
import placeholder from '../../logo.svg';


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

    componentDidMount() {
        const { searchCriteria } = this.state.selectedValues;
        console.log(searchCriteria);
    }

    searchFunction = () => {
        const { searchCriteria } = this.state.selectedValues;
        axios
            .post('http://localhost:3001/api/reviews/search', searchCriteria)
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
            <Button className="main-card">
                <img src={imageURL? imageURL : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/%2717_Acura_MDX.jpg/280px-%2717_Acura_MDX.jpg"} 
                  style={{ height: '60px' }} alt=""/>
                <ReactStars
                  type= "number"
                  name= "score"
                  edit= {false}
                  half={true}
                  count={5}
                  value={Math.round(averageScore * 100) / 100}
                  size={36}
                  color2={'#ffd700'} />
                <p>{year} {make} {model}</p>
                <p>{edition}</p>
            </Button>
          </div>
        );
    }
}

export default PopularCar;