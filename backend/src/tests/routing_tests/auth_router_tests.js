const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const server = require('../../server');

const UserModel = require('../../models/UserModel');

chai.use(chaiHttp);

describe('testing the authRouter', () => {
    let newUser;

    beforeEach(done => {
        UserModel.remove({})
        .then(() => {
            newUser = {
                fullname: 'user1',
                username: 'user1',
                email: 'user1@user.com',
                password: 'user1'
            };
    
            done();
        })

        
    })

    it(`POST to '/auth/register' registers a user and returns a JWT through the response body`, (done) => {
        newUser.sav
        
        chai.request(server)
            .post('/auth/register')
            .send(newUser)
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(!res.body.JWT);
                    done();
                }
            })
    })
})