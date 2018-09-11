// NOTE: This router handles requests related to the user's personal section
// importing dependencies
const express = require('express');

// importing models
const UserModel = require('../../models/UserModel');

// intializing the router
const router = express.Router();

// importing middleware
const loginMiddleware = require('../routing_middleware/loginMiddleware');

// adding the routes
router.get('/', (req, res) => res.send(`The home router is working!`)); // test router

// * TODO: Change to a get and allow for the JWT to be passed via URL or HTML headers
// * QUESTION: How should I look the user up from here?
// gets all of the user's information -- particularly their reviews
router.post('/data/:username', loginMiddleware, (req, res) => {
    res.send(`welcome`);
});


// exporting the router
module.exports = router;