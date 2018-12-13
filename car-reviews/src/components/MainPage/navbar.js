import React, { Component, Fragment } from 'react';
import AuthService from '../Auth/authservice';
import './navbar.css';
import Media from 'react-media';
import HamburgerMenu from './hamburgermenu';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse
} from 'reactstrap';

const Auth = new AuthService();

// const styles = {
//   hamburgerStyles: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     marginBottom: 20,
//   }
// }

class MainNavbar extends Component {
  state = {
    isLoggedIn: false,
    isNavOpen: false,
  }

  signOut = () => {
    Auth.logout();
  };

  navToggle =  () => {
      this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  render() { 
    console.log(this.props);
    return (
      // <div className="navbar-container">
      //     <Media query='(max-width: 550px)'>
      //       {matches => 
      //         matches ? 
      //         <div style={styles.hamburgerStyles} id='hamburger-menu'>
      //           <HamburgerMenu right isLoggedIn={this.props.isLoggedIn} /> 
      //         </div>
      //         :
      //         <div className="nc">
      //           <a className="navbar-item" href="/">
      //             Home
      //           </a>
          
      //           {this.props.isLoggedIn ?
      //           <a className="navbar-item" href="/MyReviews">
      //             My Reviews
      //           </a> : <Fragment />
      //           }

      //           {this.props.isLoggedIn ?
      //           <a className="navbar-item" href="/Billing">
      //             Billing
      //           </a> : <Fragment />
      //           }

      //           {this.props.isLoggedIn ?
      //           <a className="navbar-item" href="/Settings">
      //             Settings
      //           </a> : <Fragment />
      //           }

      //           {!this.props.isLoggedIn ?
      //             <a className='navbar-item' href="/login">Sign In</a> :
      //             <a className="navbar-item" href="/" onClick={this.signOut}>Sign Out</a>
      //           }
      //         </div>
      //       }
      //     </Media>
      // </div>

      <header>
        <Navbar className="main-navbar" dark expand="lg">
            <NavbarBrand className="text-white" href="/"><span className="main-navbar__title">Auto Review For You</span></NavbarBrand>
            <NavbarToggler onClick={this.navToggle} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
                    {!this.props.isLoggedIn ? 
                    <Nav navbar className="ml-auto">
                        <NavItem onClick={this.isLoggedIn}>
                            <NavLink className="text-white mr-4 main-navbar__links" href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-white mr-4 main-navbar__links" href="/login">Sign In</NavLink>
                        </NavItem>
                    </Nav> :
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink className="text-white mr-4 main-navbar__links" href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-white mr-4 main-navbar__links" href="/MyReviews">My Reviews</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-white mr-4 main-navbar__links" href="/billing">Billing</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-white mr-4 main-navbar__links" href="/settings">Settings</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-white mr-4 main-navbar__links" href="/" onClick={this.signOut}>Sign Out</NavLink>
                        </NavItem>
                    </Nav>
                    }
            </Collapse>
        </Navbar>
      </header>
    );
  }
}
 
export default MainNavbar;
