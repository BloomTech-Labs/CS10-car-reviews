// importing dependencies
const express = require('express');
const JWT = require('jsonwebtoken');

// importing our user model to allow for registration
const UserModel = require('../models/UserModel');

// importing middleware

// initializing the router and adding middleware
const router = express.Router();

// creating the routes
router.get('/', (req, res) => res.send('The auth router is working!')); // test route

// * TODO: Need to issue some form of authorization after the user is saved
// ** OPTIONAL: Could externalize the form checking with a custom middleware
router.post('/register', (req, res) => { // route that handles registering a user
    const { fullname, username, email, password } = req.body;
    const newUser = new UserModel({ fullname, username, email, password });
    
    // the UserModel has a pre-save hook on it that hashes the password with Bcrypt
    newUser.save(err => {
        if (err) res.status(500).send(`There was a server error when trying to register the user--please try again.`);
        else res.status(201).send(`The user has successfully registered!`);
    });
});

// * TODO: Implement a login route
router.post('/login', (req, res) => {
    
})

// exporting the router
module.exports = router;