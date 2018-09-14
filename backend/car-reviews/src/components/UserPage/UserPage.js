import React, { Component } from 'react';
import Billing from './billing';
import Header from './header';
import LeftNavBar from './leftnavbar';
import UserSettings from './usersettings';
import ReviewModal from '../Modals/reviewmodal';


class UserPage extends Component {

    render() { 
        return ( 
            <div>

                 <div className = "Header">
                    <Header/>
                </div>

                <Header/>
                <LeftNavBar/>
                <ReviewModal />

            </div>
         );
    }
}
 
export default UserPage;