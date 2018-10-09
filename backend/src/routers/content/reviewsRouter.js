// NOTE: This router handles requests related to reviews

// importing dependencies
const express = require("express");
const ReviewModel = require("../../models/ReviewModel");
const UserModel = require("../../models/UserModel");
const CarModel = require("../../models/CarModel");

// intializing the router
const router = express.Router();
const checkIfCar = require("../routing_middleware/checkIfCar");
const verifyJWTMiddleware = require("../routing_middleware/verifyJWTMiddleware");

// POST new review:

router.post("/", verifyJWTMiddleware, checkIfCar, (req, res) => {
  console.log('posting');
  const {
    title,
    content,
    score,
    carImage,
    year,
    make,
    model,
    testEntry,
  } = req.body;
  const user = req._id;
  let carID;
  if (!user || !content || !score) {
    res
      .status(400)
      .json({ errorMessage: "Please provide user, review, and score." });
    return;
  }
  if (req.carID != null) {
    console.log("looking for CAR IMAGE URL: ", req.body)
    const car = req.carID;
    ReviewModel.create({ title, user, content, score, car, carImage, testEntry })
      .then(newReview => {
        // adds review id to the user document of the author
        const id = newReview.user;
        return UserModel.findByIdAndUpdate(
          id,
          { $push: { reviews: newReview._id } },
          { new: true }
        );
      })
      .then(updatedUser => {
        return CarModel.findByIdAndUpdate(
          req.carID, 
          { 
            $push: { 
                reviews: updatedUser.reviews[updatedUser.reviews.length - 1], 
                imageURL: carImage 
            }, 
            averageScore: req.avgScore 
          },
          { new: true }
        );
      })
      .then(updatedCar => {
        return ReviewModel.findById(
          updatedCar.reviews[updatedCar.reviews.length - 1]
        );
      })
      .then(review => {
        res.json(review);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    CarModel.create({ year, make, model, edition, averageScore: score, imageURL: carImage, testEntry })
      .then(newCar => {
        const car = newCar._id;
        carID = newCar._id;
        return ReviewModel.create({
          title,
          user,
          content,
          score,
          carImage,
          car
        });
      })
      .then(newReview => {
        const id = newReview.user;
        return UserModel.findByIdAndUpdate(
          id,
          { $push: { reviews: newReview._id } },
          { new: true }
        );
      })
      .then(updatedUser => {
        return CarModel.findByIdAndUpdate(
          carID,
          {
            $push: {
              reviews: updatedUser.reviews[updatedUser.reviews.length - 1]
            }
          },
          { new: true }
        );
      })
      .then(updatedCar => {
        return ReviewModel.findById(
          updatedCar.reviews[updatedCar.reviews.length - 1]
        );
      })
      .then(review => {
        res.json(review);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }
});

// route for getting all an individual's reviews:

router.get("/", verifyJWTMiddleware, (req, res) => {
  const user = req._id;
  ReviewModel.find({ user: user })
    .select("car title content score carImage")
    .populate({
      path: "car",
      model: "cars",
      select: "make model year edition averageScore -_id"
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ error: err.message }));
});

// route for editing getting and deleting an individual review:

router.put('/:id', verifyJWTMiddleware, (req, res) => {
    const { id } = req.params;
    const { title, content, score, carImage } = req.body;
    const updatedOn = Date.now();
    console.log('the response is: ', req.body);
    ReviewModel.findByIdAndUpdate(id, {
      title,
      content,
      score,
      carImage,
      updatedOn
    })
      .then(reviews => res.status(200).json(reviews))
      .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:id', verifyJWTMiddleware, (req, res) => {
    const { id } = req.params;
    ReviewModel.findById(id)
      .then(review => res.json(review))
      .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', verifyJWTMiddleware, (req, res) => {
    const { id } = req.params;
    ReviewModel.findByIdAndRemove(id)
      .then(deletedReview => {
        return CarModel.findByIdAndUpdate(deletedReview.car, { "$pull": { reviews: id }}, {new: true})
       })
      .then(updatedCar => {
        return UserModel.findByIdAndUpdate(req._id, { "$pull": { reviews: id }}, {new: true})
       })
       .then(updatedUser => {
         res.json(updatedUser);
       })
      .catch(err => res.status(500).json({ error: err.message }));
});

// search router:
router.post("/search", (req, res) => {
    const { year, make, model, trim, reviewer, edition} = req.body;
    
    // here we setup a search object that only adds values that are actually passed in to the .find method
    const searchObj = {};
    if (year) { 
      searchObj.year = year;
    }
    if (make) {
      searchObj.make = make;
    }
    if (model) { 
      searchObj.model = model;
    }
    if (trim) {
      searchObj.edition = trim;
    } else if (edition) {
      searchObj.edition = edition;
    }
    if (reviewer) { 
      searchObj.reviewer = reviewer;
    }
    searchObj.reviews = { $not: { $size: 0 } };
    if (reviewer) {
        UserModel.findOne({username: reviewer})
        .then(user => {
          return ReviewModel.find( {user: user._id} )
              .populate({
                path: 'car', 
                model: 'cars',
                select: 'make model year edition averageScore imageURL',
              })
              .populate({
                path: 'user', 
                model: 'users',
                select: 'username',
              })
        })
        .then(reviews=> {
          console.log(reviews, '210');
          res.json(reviews);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    } else {
        CarModel.find(searchObj).select('id')
        .then(cars => {
          return ReviewModel.find( { car: { $in: cars } } )
              .populate({
                path: 'car', 
                model: 'cars',
                select: 'make model year edition averageScore imageURL',
              })
              .populate({
                path: 'user', 
                model: 'users',
                select: 'username',
              })
        })
        .then(reviews=> {
          console.log(reviews, '200');
          res.json(reviews);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    }
})

// exporting the router
module.exports = router;
