// NOTE: This router handles requests related to reviews

// importing dependencies
const express = require('express');
const ReviewModel = require('../../models/ReviewModel');
const UserModel = require('../../models/UserModel');
const CarModel = require('../../models/CarModel');

// intializing the router
const router = express.Router();
const checkIfCar = require('../routing_middleware/checkIfCar');

// adding the routes
router.get('/', (req, res) => res.send(`The reviews router is working!`)); // test router

router.post('/', checkIfCar, (req, res) => {
    const { user, content, score, year, make, model, edition } = req.body;
    //console.log(req.carID);
    if (!user || !content || !score) {
        res.status(400).json({ errorMessage: "Please provide user, review, and score." })
        return;
    }
    if (req.carID != null) {
        const car = req.carID;
        //console.log(car);
        ReviewModel.create({ user, content, score, car })
        .then(result => {
             //console.log(result, 'line28');
             return result;
        })
        .then(newReview => {  // adds review id to the user document of the author
            //console.log(newReview, 'line33');
            const id  = newReview.user;
            //console.log(id);
            return UserModel.findByIdAndUpdate(id, { "$push": { reviews: newReview._id }}, {new: true})
        }) 
        .then(foo => {
            //res.status(201).json(result);
            //console.log(result, 'line38');
            return foo;
        })
        .then(bar => {
            //console.log(bar);
            return CarModel.findOneAndUpdate(req.carID, { "$push": { reviews: bar.reviews[bar.reviews.length - 1] }}, {new: true})
        })
        .then(yes => {
            res.json(yes);
        })
        .catch(err => res.status(500).json({ error: err.message }))
} else {
        // CarModel.create({ year, make, model, edition })
        // .then(newCar => {
        //     car = newCar._id;
        //     return newCar;
        // })
        // .then(car => {
        //     ReviewModel.create({ user, content, score, car })
        // })
        // .then(result => {
        //      res.status(201).json(result);
        //      newReviewID = result._id;
        //      return result;
        // })
        // .then(newReviewID => {  // adds review id to the user document of the author
        //     UserModel.findOneAndUpdate(userId, { "$push": { reviews: newReviewID }})
        // }) 
        // .catch(err => res.status(500).json({ error: err.message }))
        console.log('fuck');
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