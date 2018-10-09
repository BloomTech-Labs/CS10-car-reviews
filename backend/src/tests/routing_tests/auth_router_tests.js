const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const server = require('../../server');
const UserModel = require('../../models/UserModel');

chai.use(chaiHttp);

describe('testing the authRouter', () => {
    let newUser;
    let testJwt;

    beforeEach(done => {
            newUser = {
                fullname: 'testuser1',
                username: 'testuser1',
                email: 'testuser1@user.com',
                password: 'testuser1',
                testEntry: true
            };
    
            done();
    });

    after(done => {
        UserModel.deleteMany({ testEntry: true })
            .then(() => done());
    })

    it.only(`POST to '/auth/register' registers a user and returns a JWT through the response body`, (done) => {
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

    it.only(`POST to '/auth/login' authenticates a user and returns a JWT through the response body`, (done) => {
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

    it.only(`Post to '/auth/verify' and successfully verifies the JWT from the login`, (done) => {
        chai.request(server)
            .get('/auth/verify')
            .set('jwt', testJwt)
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body.tokenIsValid);
                    done();
                }
            })
    })
})