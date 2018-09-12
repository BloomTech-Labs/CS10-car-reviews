// NOTE: This router handles requests related to reviews

// importing dependencies
const express = require('express');
const ReviewModel = require('../../models/ReviewModel');
const UserModel = require('../../models/UserModel')

// intializing the router
const router = express.Router();


// adding the routes
router.get('/', (req, res) => res.send(`The reviews router is working!`)); // test router

router.post('/', (req, res) => {
    const { car, user, content, score } = req.body;
    const { userId } = req.body.user;
    if (!user || !content || !score) {
        res.status(400).json({ errorMessage: "Please provide user, review, and score." })
        return;
    }
    ReviewModel.create(req.body)
        .then(result => {
             res.status(201).json(result);
             newReviewID = result._id;
             return result;
             })
        .then(newReviewID => UserModel.findOneAndUpdate(userId, { "$push": { reviews: newReviewID }})) // adds review id to the user document of the author
        .catch(err => res.status(500).json({ error: err.message }))
});

// route for getting all an individual's reviews:

router.get('/:id', (req, res) => {
    const { id } = req.params;
    ReviewModel.find({user: id}).select('car content score -_id')
        .then(reviews => res.status(201).json(reviews))
        .catch(err => res.status(500).json({ error: err.message }));
})

// exporting the router
module.exports = router;