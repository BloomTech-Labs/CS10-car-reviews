// import dependencies
const express = require('express');

// destructuring our secret
const { JWT_SECRET } = process.env;

// importing our models
const UserModel = require('../models/UserModel');
const ReviewModel = require('../models/ReviewModel');
const CarModel = require('../models/CarModel');

// importing routers
const popularRouter = require('./content/popularRouter');
const userRouter = require('./content/userRouter');

// initializing the server
const router = express.Router();

// creating the routes
router.get('/', (req, res) => res.send(`The content router is working!`)); // test route

// using the sub-routers
router.use('/popular', popularRouter);

router.use('/users', userRouter);


// exporting the router
module.exports = router;