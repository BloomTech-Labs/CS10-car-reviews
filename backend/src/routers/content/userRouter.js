// NOTE: This router handles requests related to the user's personal section
// importing dependencies
const express = require('express');

// importing models
const UserModel = require('../../models/UserModel');

// intializing the router
const router = express.Router();

// importing middleware
const verifyJWTMiddleware = require('../routing_middleware/verifyJWTMiddleware');

// adding the routes
router.get('/', (req, res) => res.send(`The home router is working!`)); // test router

// * TODO: Figure out how to pass review data from here
// * TODO: Decide between passing the email from the JWT or getting the username via URL
// * QUESTION: How should I look the user up from here?
// gets all of the user's information -- particularly their reviews
router.post('/data', verifyJWTMiddleware, (req, res) => {
    const { email } = req;
    
    UserModel.findOne({ email })
        .then(record => res.send(record));
});


// exporting the router
module.exports = router;