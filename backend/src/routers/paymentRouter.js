// importing dependencies
const express = require('express');

//stripe:
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);

const verifyJWTMiddleware = require('./routing_middleware/verifyJWTMiddleware');

// intializing the router
const router = express.Router();

// adding the routes
router.get('/', (req, res) => res.send(`The home router is working!`)); // test router

router.post("/", (req, res) => {
    stripe.charges.create(req.body)
    .then(response => {res.json( response )})
    .catch(err => res.status(500).json({ error: err.message }));
});


// exporting the router
module.exports = router;