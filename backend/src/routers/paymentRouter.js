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




router.post("/", verifyJWTMiddleware, (req, res) => {
    const email = req.email;
    const source = req.body.source;
    const description = req.body.description;
    let chosenplan = ''

    if(description === '1 year unlimited reviews') {
        chosenplan = 'plan_DfkDDsht0n0Vei';
    } else if (description === '6 month unlimited reviews') {
        chosenplan = 'plan_DfkCgCUQ2vmePO';
    } else if (description === '1 month unlimited reviews') {
        chosenplan = 'plan_DfkBSehKoaV8LZ';
    } else {
        console.log('An error occured no plan was chosen', description);
    }
    if(description !== null) {

    
    stripe.customers.create({
        email: email,
        source: source // obtained with Stripe.js
      }, function(err, customer) {
        // asynchronously called
        if(customer !== null) {

        
        // console.log('here is a customer: ',customer)
        
        stripe.plans.retrieve(
            chosenplan,
            function(err, plan) {
              // asynchronously called
            //   console.log('the plan is ', plan.id)
            //   console.log('the customer is ', customer.id)

              stripe.subscriptions.create({
                    customer: customer.id,
                    // billing: "charge_automatically",
                    items: [
                      {
                        plan: plan.id,
                      },
                    //   console.log('tommy' ,customer.id, 'tommy2',  plan.id)
                    ]
                  }, function(err, subscription) {
                      // asynchronously called
                    //   console.log('subscription is :', subscription)
                    }
                  );
            
            }
          );
        } else {
            console.log('The token has expired please try again', err)
        }
      });

    } else {
      console.log('no description was present', description)
    }

      
    // stripe.charges.create(req.body)
    //     .then(response => UserModel.findOneAndUpdate({email: email} , {paid: true}, {new: true}))
    //     .then(response => {res.json( response )})
    //     .catch(err => res.status(500).json({ error: err.message }));
});

// exporting the router
module.exports = router;