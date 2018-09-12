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
                <Header/>
                <LeftNavBar/>
                <UserSettings/>
                <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <div className="example">
                  <Elements>
                    <Billing />
                  </Elements>
                </div>
                </StripeProvider>
            </div>
         );
    }
}
 
export default UserPage;