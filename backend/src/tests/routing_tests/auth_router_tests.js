const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const server = require('../../server');
const UserModel = require('../../models/UserModel');

chai.use(chaiHttp);

describe('testing the authRouter', () => {
    let newUser;

    beforeEach(done => {
            newUser = {
                fullname: 'user1',
                username: 'user1',
                email: 'user1@user.com',
                password: 'user1',
                testEntry: true
            };
    
            done();
    });

    after(done => {
        UserModel.deleteMany({ testEntry: true })
            .then(() => done());
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
                    done();
                }
            })
    })
})