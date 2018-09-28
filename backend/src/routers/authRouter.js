// importing dependencies
const express = require('express');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// destructuring our secret
const { JWT_SECRET } = process.env;

// importing our user model to allow for registration
const UserModel = require('../models/UserModel');

// importing middleware

// initializing the router and adding middleware
const router = express.Router();

// creating the routes
router.get('/', (req, res) => res.send('The auth router is working!')); // test route

// route for verifying the client's JWT
router.get('/verify', (req, res) => {
    const { jwt } = req.headers;
    JWT.verify(jwt, JWT_SECRET, (err, decoded) => {
        console.log(err);
        if (err) res.status(500).json({ tokenIsValid: false });
        if (decoded) res.status(200).json({ tokenIsValid: true })
    })
})

// route registers a user
// * TODO: Need to check that email is in the correct format
// ** OPTIONAL: Externalize the form checking with a custom middleware
router.post('/register', (req, res) => { // route that handles registering a user
    const { fullname, username, email, password, testEntry } = req.body;
    const newUser = new UserModel({ fullname, username, email, password, testEntry });
    const { _id } = newUser;
    
    // the UserModel has a pre-save hook on it that hashes the password with Bcrypt
    newUser.save(err => {
        if (err) return res.status(500).json({ registerError: `An account with those credentials already exists, please sign in.` });
        
        // NOTE: JWTs are signed with the fullname, username, and email as the payload
        JWT.sign({ fullname, username, email, _id }, JWT_SECRET, { expiresIn: "1hr", algorithm: 'HS256' }, (err, token) => {
            if (err) return res.status(500).json({ registerError: `There was an error when trying to generate a JWT for the user--please try again.`});
            res.status(200).json({ JWT: token });
        })
    });
});

// route logs in a user
// ** OPTIONAL: Externalize the form checking with a custom middleware
router.post('/login', (req, res) => {
    const credentials = req.body;
    // ** OPTIONAL: Find a way to structure conditional so user can enter email or username
    if (!credentials.email || !credentials.password) return res.status(400).send({ loginError: 'Please provide a username or email and a password to login.' });

    UserModel.findOne({ email: credentials.email })
        .then(userRecord => {
            if (!userRecord || !userRecord.password) return res.status(404).json({ loginError: 'No user with that email address was found, please register or try re-entering your credentials.' });
            const { fullname, username, email, _id } = userRecord;
        
            // ** OPTIONAL: Add a password reset feature
            if (bcrypt.compareSync(credentials.password, userRecord.password)){
                JWT.sign({ fullname, username, email, _id }, JWT_SECRET, { expiresIn: "1hr", algorithm: 'HS256' }, (err, decoded) => {
                    if (err) return res.status(500).json({ loginError: `There was an error when trying to generate a JWT for the user--please try again.` });
                    res.status(200).json({ JWT: decoded });
                });
            } else res.status(401).json({ loginError: `The password you provided didn't match the one stored in our database, please try again` });
        })
        .catch(err => {    
            console.warn(err);
            res.status(500).json({ loginError: `There was an error when trying to generate a JWT for the user--please try again. authRouter: 63` });
        });
})


// exporting the router
module.exports = router;