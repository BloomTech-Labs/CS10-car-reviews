const assert = require('assert');

// adding all model's we'll be testing
const UserModel = require('../../models/UserModel');
const ReviewModel = require('../../models/ReviewModel');
const CarModel = require('../../models/CarModel');

describe('Testing relational data', () => {
    let newUser, newReview, newCar;

    // creating instances of the records -- note that we don't add the references yet
    beforeEach((done) => {
        newUser = new UserModel({
            fullname: 'user4',
            username: 'user4',
            email: 'user4@user.com',
            password: 'user4',
            testEntry: true,
        });

        newReview = new ReviewModel({
            title: "here's a title",
            content: "here's some content",
            score: 5,
            testEntry: true,
        });

        newCar = new CarModel({
            make: "Mitsubishi",
            model: "Lancer",
            year: 2009,
            edition: "SE",
            averageScore: 5,
            testEntry: true
        });

        // here we add our references to the documents
        // * NOTE: Mongoose automatically assigns the reference by setting the value to another record
        newUser.reviews.push(newReview);
        newCar.reviews.push(newReview)
        newReview.car = newCar;
        newReview.user = newUser;

        // here we use Promise.all to make sure all three saves resolve before we call done()
        Promise.all([ newUser.save(), newReview.save(), newCar.save() ])
            .then(() => done())
    })

    // tests that you can access all of the records created above via query with .populate
    it(`Tests that deeply nested data can be created and accessed`, (done) => {
        UserModel.findOne({ username: 'user4' })
            .populate({
                path: 'reviews',
                model: 'reviews',
                populate: {
                    path: 'car',
                    model: 'cars'
                }
            })
            .then(userRecord => {
                assert(userRecord.fullname === 'user4');
                assert(userRecord.reviews[0].score === 5);
                assert(userRecord.reviews[0].car.make === 'Mitsubishi');
                done();
            })
    })
})