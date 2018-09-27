// NOTE: This router handles requests related to the user's personal section
// importing dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

console.log('I am hitting this');
// importing models
const UserModel = require('../../models/UserModel');

// intializing the router
const router = express.Router();

// importing middleware
const verifyJWTMiddleware = require('../routing_middleware/verifyJWTMiddleware');
const hashPassword = require('../routing_middleware/hashPassword');

// adding the routes
router.get('/', (req, res) => res.send(`The home router is working!`)); // test router

// * TODO: Figure out how to pass review data from here
// * TODO: Decide between passing the email from the JWT or getting the username via URL
// * QUESTION: How should I look the user up from here?
// gets all of the user's information -- particularly their reviews
router.get('/data', verifyJWTMiddleware, (req, res) => {
    const { email } = req;
    
    UserModel.findOne({ email })
        .populate({
            path: 'reviews',
            model: 'reviews'
        })
        .then(record => {
            res.json(record);
        })
        .catch(err => {
            res.send(500).json({ databaseError: "There was an error getting the user data, please try again" });
        })
});

//route to change user data:
router.put('/data', verifyJWTMiddleware, hashPassword, (req, res) => {
    const oldEmail = req.email;
    // let counter = req.body.counter;
    console.log('I am being called correctly', req.body.counter)
    let objForUpdate = {};
    
    if (req.body.email) {
        objForUpdate.email = req.body.email;
    } else if (req.body.newEmail) {
        objForUpdate.email = req.body.newEmail;
    }
    if (req.body.username) objForUpdate.username = req.body.username;
    if (req.password) objForUpdate.password = req.password;
    if (req.body.counter) {
        objForUpdate.timesViewed = req.body.counter;
        UserModel.findOneAndUpdate({email: oldEmail} , objForUpdate, {new: true})
        .then(userRecord => {
            res.json(userRecord)
        })
        .catch(err => {
            res.status(500).json({ databaseError: err });
        });
    } 
    UserModel.findOneAndUpdate({email: oldEmail} , objForUpdate, {new: true})
        .then(userRecord => {
            const { fullname, username, email, _id } = userRecord;
            JWT.sign({ fullname, username, email, _id }, JWT_SECRET, { expiresIn: "1hr", algorithm: 'HS256' }, (err, token) => {
                if (err) return res.status(500).json({ registerError: `There was an error when trying to generate a JWT for the user--please try again.`});
                res.status(200).json({ JWT: token });
            })
        })
        .catch(err => {
            res.status(500).json({ databaseError: err });
        });
});


// exporting the router
module.exports = router;