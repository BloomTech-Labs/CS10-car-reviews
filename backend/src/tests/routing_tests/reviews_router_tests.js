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
            edition: 'SEL',
            testEntry: true
        });
        
        newReview.car = newCar;
        newReview.user = newUser;

        Promise.all([ newUser.save(), newCar.save() ])
            .then(() => done());
    })

    after(done => {
        Promise.all([ UserModel.deleteMany({ testEntry: true }), ReviewModel.deleteMany({ testEntry: true }), CarModel.deleteMany({ testEntry: true }) ])
            .then(() => done())
    })

    it(`POST to '/api/reviews' and sends back a successful create statement`, done => {
        chai.request(server)
            .post('/api/reviews')
            .send(newReview)
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body.content === 'some content');
                    assert(res.status === 201);
                    done();
                }
            })
    })
})