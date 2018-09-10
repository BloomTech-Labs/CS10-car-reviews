// importing dependencies
const express = require('express');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

// ** OPTIONAL: Create a middleware that handles the issuing of a JWT
router.post('/login', (req, res) => {
    const { email, password, username } = req.body;
    // ** OPTIONAL: Find a way to structure conditional so user can enter email or username
    if (!email || !password) return res.status(400).send({loginError: 'Please provide a username or email and a password to login.'});

    UserModel.findOne({ email: email })
        .then(userRecord => {
            if (!userRecord) return res.status(404).json({ loginError: 'No user with that email address was found, please register or try re-entering your credentials.' });
            
            // ** OPTIONAL: Add a password reset feature
            if (bcrypt.compareSync(password, userRecord.password)){
                const newJWT = JWT.sign({ email, password, username }, process.env.JWT_SECRET);
                res.status(200).json({ JWT: newJWT });
            } else {
                res.status(401).json({ loginError: `The password you provided didn't match the one stored in our database, please try again`})
            }
            
        })
})

// exporting the router
module.exports = router;