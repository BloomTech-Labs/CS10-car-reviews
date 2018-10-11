const assert = require('assert');
const ReviewModel = require('../../models/ReviewModel');
const UserModel = require('../../models/UserModel');
const CarModel = require('../../models/CarModel')

describe('Testing the ReviewModel', () => {
    // * NOTE: Because adding a new review requires that it has reference to a car and user...
    // ...we'll be creating those here.
    let newReview, newUser, newCar;

    beforeEach(done => {
        newReview = new ReviewModel({
            title: 'a title',
            content: 'some content',
            score: 5,
            testEntry: true,
        });

        newUser = new UserModel({
            fullname: 'user1',
            username: 'user1',
            email: 'user1@user.com',
            password: 'user1',
            testEntry: true,
        });

        newCar = new CarModel({
            make: 'Mitsubishi',
            model: 'Eclipse Cross',
            year: 2019,
            averageScore: 5, 
            testEntry: true,
        });
        
        newReview.car = newCar;
        newReview.user = newUser;

        done();
    })

    // saves the review record and then makes sure it is stored properly
    it('adds a new review to the database', (done) => {
        Promise.all([ newReview.save(), newUser.save(), newCar.save() ])
            .then(() => {
                ReviewModel.findOne({ testEntry: true })
                    .then(reviewRecord => {
                        assert(reviewRecord.content === 'some content');
                        done();
                    })
            })
    });

    // saves a new review record then makes sure it can be removed
    it('adds and removes a new user from the database', (done) => {
        Promise.all([ newReview.save(), newUser.save(), newCar.save() ])
            .then(() => {
                newReview.remove()
                    .then(({ content }) => { // destructuring the username prop off of the deleted record
                        ReviewModel.find({ testEntry: true })
                            .then(response => {
                                assert(response.length === 0);
                                done();
                            })
                    })
            })         
    });

    it('adds a user to the database then updates the user', (done) => {
        Promise.all([ newReview.save(), newUser.save(), newCar.save() ])
            .then(() => {
                // here we pass in the { new: true } option so that the method returns the updated model
                // * OPTIONAL: Deprecation warning on the next line
                ReviewModel.findOneAndUpdate({ content: newReview.content }, { score: 4 }, { new: true })
                    .then(({ score }) => {
                        assert(score === 4);
                        done();
                    })
            })
    });
})