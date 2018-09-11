// NOTE: This router handles requests related to reviews

// importing dependencies
const express = require('express');
const ReviewModel = require('../../models/ReviewModel.js');

// intializing the router
const router = express.Router();


// adding the routes
router.get('/', (req, res) => res.send(`The reviews router is working!`)); // test router

router.post('/reviews', (req, res) => {
    const { car, user, content, score } = req.body;
    if (!car || !user || !content || !score) {
        res.status(400).json({ errorMessage: "Please provide title, body, and user for the note." })
        return;
    }
    ReviewModel.create(req.body)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});