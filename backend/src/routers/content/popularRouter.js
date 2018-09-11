// NOTE: This router handles requests related to the content displayed on the home page
// importing dependencies
const express = require('express');
const ReviewModel = require('../../models/ReviewModel.js');

// intializing the router
const router = express.Router();


// adding the routes
router.get('/', (req, res) => res.send(`The home router is working!`)); // test router

// * TODO: Implement a list of featured reviews
router.get('/featured_reviews', (req, res) => {
    ReviewModel.find({}).sort({timesViewed: -1})
    .then(review => res.json(review))
    .catch(err => res.status(500).json({ error: err.message }))
});

// * TODO: Implement popular car sorting
router.get('/popular_cars', (req, res) => {
    res.send(`popular cars go here`);
});

// * TODO: Implement popular reviewers sorting
router.get('/popular_reviewers', (req, res) => {
    res.send(`popular reviewers go here`);
});


// exporting the router
module.exports = router;