import React from 'react';
import './mainpage.css';
import {DropdownToggle, DropdownMenu, DropdownItem, Button, UncontrolledDropdown} from 'reactstrap';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
        <div className="searchbar">
            <div className="login">
                <Button className="signup">Sign Up</Button>
                <Button className="signin">Sign In</Button>
            </div>
            <div className="searchfields">
                <UncontrolledDropdown className="dropdowns">
                    <DropdownToggle caret>
                        Year
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>TODO:</DropdownItem>
                        <DropdownItem disabled>map years onto here</DropdownItem>
                        <DropdownItem>2000</DropdownItem>
                        <DropdownItem>2001</DropdownItem>
                        <DropdownItem>2002</DropdownItem>
                        <DropdownItem>2003</DropdownItem>
                        <DropdownItem>2004</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Makes will be dependent on Year -> </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="dropdowns">
                    <DropdownToggle caret>
                        Make
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>TODO:</DropdownItem>
                        <DropdownItem disabled>map makes onto here</DropdownItem>
                        <DropdownItem>Ford</DropdownItem>
                        <DropdownItem>Toyota</DropdownItem>
                        <DropdownItem>Honda</DropdownItem>
                        <DropdownItem>BMW</DropdownItem>
                        <DropdownItem>Volkswagon</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Models are dependent on Make -> </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="dropdowns">
                    <DropdownToggle caret>
                        Model
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>TODO:</DropdownItem>
                        <DropdownItem disabled>map models onto here</DropdownItem>
                        <DropdownItem>Camery</DropdownItem>
                        <DropdownItem>Corolla</DropdownItem>
                        <DropdownItem>Prius</DropdownItem>
                        <DropdownItem>Rav4</DropdownItem>
                        <DropdownItem>Tundra</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>these examples are if someone picked toyota</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="dropdowns">
                    <DropdownToggle caret>
                        Trim
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>TODO:</DropdownItem>
                        <DropdownItem disabled>map trims onto here</DropdownItem>
                        <DropdownItem>One</DropdownItem>
                        <DropdownItem>Two</DropdownItem>
                        <DropdownItem>Two Eco</DropdownItem>
                        <DropdownItem>Three</DropdownItem>
                        <DropdownItem>Three Touring</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>these examples are if someone picked Prius</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
            <div className="review-and-search">
                <Button className="review">Review</Button>
                <Button className="search">Search</Button>
            </div>
        </div>
    );
  }
}
