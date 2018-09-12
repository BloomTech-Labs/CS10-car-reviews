// importing all dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert  = require('assert');
const server = require('../../server');
const mongoose = require('mongoose');

// setting up the middleware that tests route handlers with Chai
chai.use(chaiHttp);



// initializes the connection to the database before any of the tests run
before(done => {
    mongoose.connect('mongodb://localhost:27017/store');
    mongoose.connection
        .once('open', () => done())
        .on('error', (err) => console.warn(err));
});

// tests that the server is running
describe('tests the server', () => {
    it('ensures the server is running', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                if (err) console.warn(err);
                else {
                    assert(res.status === 200);
                    assert(res.text === 'The server is up and running!');
                    done();
                }
            })
    })
})