import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Billing from './billing';
import Header from './header';
import LeftNavBar from './leftnavbar';
import UserSettings from './usersettings';

class UserPage extends Component {

    render() { 
        return ( 
            <div>
                 <div className = "Header">
                    <Header/>
                </div>
                <LeftNavBar/>
                <div>
                    {this.props}
                </div>
            </div>
         );
    }
}
 
export default UserPage;