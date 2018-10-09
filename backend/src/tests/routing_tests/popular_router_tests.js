const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const server = require('../../server');
const ReviewModel = require('../../models/ReviewModel');
const UserModel = require('../../models/UserModel');
const CarModel = require('../../models/CarModel')

chai.use(chaiHttp);

describe('Tests the popular router', () => {
    let newReview, newUser, newCar;

    // creates new entries before each test so that we can get a review back
    beforeEach(done => {
        newReview = new ReviewModel({
            title: 'a title',
            content: 'some content',
            score: 5,
            testEntry: true
        });

        newUser = new UserModel({
            fullname: 'user1',
            username: 'user1',
            email: 'user1@user.com',
            password: 'user1',
            testEntry: true
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
        newCar.reviews.push(newReview);

        Promise.all([ newReview.save(), newUser.save(), newCar.save() ])
            .then(() => done());
    })

    // removes the records we created
    afterEach(done => {
        Promise.all([ newReview.remove(), newUser.remove(), newCar.remove() ])
            .then(() => done());
    })


    it.only(`GET to '/api/popular/featured_reviews' returns reviews`, (done) => {
        chai.request(server)
            .get('/api/popular/featured_reviews')
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body[0])
                    done();
                }
            })
    })

    it.only(`GET to '/api/popular/popular_cars' returns cars`, (done) => {
        chai.request(server)
            .get('/api/popular/popular_cars')
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body[0])
                    done();
                }
            })
    })

    it.only(`GET to '/api/popular/popular_reviewers' returns reviewers`, (done) => {
        chai.request(server)
            .get('/api/popular/popular_reviewers')
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body[0])
                    done();
                }
            })
    })
})