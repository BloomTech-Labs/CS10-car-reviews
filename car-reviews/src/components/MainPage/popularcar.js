import React, { Component } from 'react';
import ReactStars from 'react-stars';
import { Button, Row, Col, Container } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './mainpage.css';
import placeholder from '../../logo.svg';

class PopularCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: props.imageURL[0]
        };
    }

    render() {
        const { averageScore, year, make, model, edition } = this.props;
        const { imageURL } = this.state;
        return (
          <div>
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