import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Billing from './billing';
import Header from './header';
import LeftNavBar from './leftnavbar';
import UserSettings from './usersettings';
import ReviewModal from './reviewmodal';


class UserPage extends Component {

    render() { 
        return ( 
            <div>

                 <div className = "Header">
                    <Header/>
                </div>

                <Header/>
                <LeftNavBar/>
                <div>
                    {this.props}
                </div>
                <ReviewModal />

            </div>
         );
    }
}
 
export default UserPage;