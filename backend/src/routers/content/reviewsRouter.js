// NOTE: This router handles requests related to reviews

const checkIfCar = require('../routing_middleware/verifyJWTMiddleware');

// importing dependencies
const express = require('express');
const ReviewModel = require('../../models/ReviewModel');
const UserModel = require('../../models/UserModel');
const CarModel = require('../../models/CarModel');

// intializing the router
const router = express.Router();


// adding the routes
router.get('/', (req, res) => res.send(`The reviews router is working!`)); // test router

router.post('/', checkIfCar, (req, res) => {
    const { user, content, score, year, make, model, edition } = req.body;
    const { userId } = req.body.user;
    const { car } = req.carID
    if (!user || !content || !score) {
        res.status(400).json({ errorMessage: "Please provide user, review, and score." })
        return;
    }
    if (car) {
        ReviewModel.create(user, content, score, car)
        .then(result => {
             res.status(201).json(result);
             newReviewID = result._id;
             return result;
        })
        .then(newReviewID => {  // adds review id to the user document of the author
            UserModel.findOneAndUpdate(userId, { "$push": { reviews: newReviewID }})
        }) 
        .then(car => {
            CarModel.findOneAndUpdate(carID, { "$push": { reviews: car }})
        })
        .catch(err => res.status(500).json({ error: err.message }))
    } else {
        CarModel.create(year, make, model, edition)
        .then(newCar => {
            car = newCar._id;
            return newCar;
        })
        .then(car => {
            ReviewModel.create(user, content, score, car)
        })
        .then(result => {
             res.status(201).json(result);
             newReviewID = result._id;
             return result;
        })
        .then(newReviewID => {  // adds review id to the user document of the author
            UserModel.findOneAndUpdate(userId, { "$push": { reviews: newReviewID }})
        }) 
        .catch(err => res.status(500).json({ error: err.message }))
    } 
});

// route for getting all an individual's reviews:

router.get('/:id', (req, res) => {
    const { id } = req.params;
    ReviewModel.find({user: id}).select('car content score -_id')
        .then(reviews => res.status(201).json(reviews))
        .catch(err => res.status(500).json({ error: err.message }));
})

// search router:
router.get('/search', (req, res) => {
    const { year, make, model, trim, reviewer} = req.body;
    if (reviewer) {
        CarModel.find({year: year, make: make, model: model, edition: trim}).select('make model year -_id')
            .populate({
                path: 'reviews', 
                match: { user: reviewer },
                select: 'content score user -_id'
            })
            .then(cars=> res.json(cars))
            .catch(err => res.status(500).json({ error: err.message }));
    } else {
        CarModel.find({year: year, make: make, model: model, edition: trim}).select('make model year -_id')
            .populate({
                path: 'reviews', 
                select: 'content score user -_id'
            })
            .then(cars=> res.json(cars))
            .catch(err => res.status(500).json({ error: err.message }));
    }
})

// exporting the router
module.exports = router;