// NOTE: This router handles requests related to the content displayed on the home page
// importing dependencies
const express = require('express');
const ReviewModel = require('../../models/ReviewModel');
const CarModel = require('../../models/CarModel')
const UserModel = require('../../models/UserModel')

// intializing the router
const router = express.Router();


// adding the routes
router.get('/', (req, res) => res.send(`The home router is working!`)); // test router

// sorts and returns popular reviews
router.get('/featured_reviews', (req, res) => {
    ReviewModel.find({}).sort({createOn: -1}).limit(4)
        .populate({
            path: 'car', 
            model: 'cars',
            select: 'make model year edition -_id'
        })
        .populate({
            path: 'user', 
            model: 'users',
            select: 'username -_id'
        })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ popRouterError: err.message }));
});

// sorts and returns popular cars
router.get('/popular_cars', (req, res) => {
    CarModel.find({}).sort({averageScore: -1}).limit(8)
    .then(car => res.status(200).json(car))
    .catch(err => res.status(500).json({ popRouterError: err.message }))
});

// sorts and returns popular reviewers
router.get('/popular_reviewers', (req, res) => {
    UserModel.find({}).select('username -_id').sort({reviews: -1}).limit(8)
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ popRouterErr: err.message }))
});


// exporting the router
module.exports = router;