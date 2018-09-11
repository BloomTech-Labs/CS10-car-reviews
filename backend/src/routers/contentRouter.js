// import dependencies
const express = require('express');

// destructuring our secret
const { JWT_SECRET } = process.env;

// importing our models
const UserModel = require('../models/UserModel');
const ReviewModel = require('../models/ReviewModel');
const CarModel = require('../models/CarModel');

const homeRouter = require('./content/homeRouter');

// initializing the server
const router = express.Router();

// creating the routes
router.get('/', (req, res) => res.send(`The content router is working!`)); // test route

// using the sub-routers
router.use('/homepage', homeRouter);


// exporting the router
module.exports = router;