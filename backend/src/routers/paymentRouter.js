// importing dependencies
const express = require('express');

//stripe:
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);


const verifyJWTMiddleware = require('./routing_middleware/verifyJWTMiddleware');
const UserModel = require('../models/UserModel');

// intializing the router
const router = express.Router();

// adding the routes
router.get('/', (req, res) => res.send(`The home router is working!`)); // test router

router.post('/customer/create', function (req, res, next){
    const token = req.body.toekn;
    if (!token) {
        return res.send({
            success: false, 
            message: 'no token present'
        });
    }
    stripe.customers.create(
        {
            source: token,
            email: email
        },
        function(err, customer) {
            if (err) {
                console.error(err);
            }  else {
                res.send({
                    success: true,
                    customer: customer,
                    customerId: customer.id
                });
            }
        }
    )
})

// router.post("/", verifyJWTMiddleware, (req, res) => {
//     const email = req.email;
//     stripe.charges.create(req.body)
//         .then(response => UserModel.findOneAndUpdate({email: email} , {paid: true}, {new: true}))
//         .then(response => {res.json( response )})
//         .catch(err => res.status(500).json({ error: err.message }));
// });


// exporting the router
module.exports = router;