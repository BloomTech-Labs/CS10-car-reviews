// importing express and our User Model
const express = require('express');
const UserModel = require('../models/UserModel');

// importing middleware

// initializing the router and adding middleware
const router = express.Router();

// creating the routes
router.get('/', (req, res) => res.send('The auth router is working!')); // test route

router.post('/register', (req, res) => { // route that handles registering a user
    const { fullname, username, email, password } = req.body;
    const newUser = new UserModel({ fullname, username, email, password });
    
    // the UserModel has a pre-save hook on it that hashes the password with Bcrypt
    newUser.save(err => {
        if (err) res.status(500).send(`There was a server error when trying to register the user--please try again.`);
        else res.status(201).send(`The user has successfully registered!`);
    });
});

// exporting the router
module.exports = router;