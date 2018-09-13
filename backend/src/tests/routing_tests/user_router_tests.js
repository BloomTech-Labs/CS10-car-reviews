const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const server = require('../../server');
const UserModel = require('../../models/UserModel');

chai.use(chaiHttp);

// ** OPTIONAL: Find a more optimal way to tests this
describe('testing the authRouter', () => {
    let newJWT;
    
    before(done => {
            const newUser = new UserModel({
                fullname: 'user1',
                username: 'user1',
                email: 'user1@user.com',
                password: 'user1',
                testEntry: true
            });
    
            chai.request(server)
                .post('/auth/register')
                .send(newUser)
                .end((err, res) => {
                    if (err) console.warn(err);
                    else {
                        newJWT = res.body.JWT;
                        done();
                    }
                })
    });

    after(done => {
        UserModel.deleteMany({ testEntry: true })
            .then(() => done());
    });

    it(`POST to '/api/users/data' returns user data`, done => {
        chai.request(server)
            .get('/api/users/data')
            .set('JWT', newJWT)
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.body.username === 'user1');
                    done();
                }
            })
    })
})