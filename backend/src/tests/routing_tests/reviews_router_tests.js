const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const server = require('../../server');
const ReviewModel = require('../../models/ReviewModel');
const UserModel = require('../../models/UserModel');
const CarModel = require('../../models/CarModel')

chai.use(chaiHttp);

describe('Tests the reviews router', () => {
    let newReview, newUser, userId, newCar, testJwt;
    const reviewPost = {};

    // creates new entries before each test so that we can get a review back
    beforeEach(done => {
        newReview = new ReviewModel({
            title: 'a title',
            content: 'some content',
            score: 5,
            testEntry: true,
        });

        newUser = new UserModel({
            fullname: 'testuser1',
            username: 'testuser1',
            email: 'testuser1@user.com',
            password: 'testuser1',
            testEntry: true
        });

        newCar = new CarModel({
            make: 'Mitsubishi',
            model: 'Eclipse Cross',
            year: 2019,
            averageScore: 5,
            testEntry: true
        });
        
        newReview.car = newCar;
        newReview.user = newUser;

        reviewPost.user = newUser._id;
        reviewPost.title = newReview.title;
        reviewPost.content = newReview.content;
        reviewPost.score = newCar.averageScore;
        reviewPost.year = newCar.year;
        reviewPost.make = newCar.make;
        reviewPost.model = newCar.model;
        reviewPost.carImage = 'test';
        reviewPost.testEntry = true;

        newCar.save()
            .then(() => done());
    })

    after(done => {
        Promise.all([ UserModel.deleteMany({ testEntry: true }), ReviewModel.deleteMany({ testEntry: true }), CarModel.deleteMany({ testEntry: true }) ])
            .then(() => done())
    })

    it(`POST to '/auth/register' registers a user and returns a JWT through the response body`, (done) => {
        chai.request(server)
            .post('/auth/register')
            .send(newUser)
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body.JWT);
                    done();
                }
            })
    })

    it(`POST to '/auth/login' authenticates a user and returns a JWT through the response body`, (done) => {
        chai.request(server)
            .post('/auth/login')
            .send(newUser)
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body.JWT);
                    testJwt = res.body.JWT;
                    done();
                }
            })
    })

    it(`POST to '/api/reviews' and sends back a successful create statement`, done => {
        chai.request(server)
            .post('/api/reviews')
            .send(reviewPost)
            .set('jwt', testJwt)
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body.content === 'some content');
                    assert(res.status === 200);
                    done();
                }
            })
    })
})