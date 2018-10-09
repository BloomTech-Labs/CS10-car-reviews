// importing all dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert  = require('assert');
const server = require('../../server');
const mongoose = require('mongoose');

// importing the models so we can drop their collections before each test runs
const UserModel = require('../../models/UserModel');
const ReviewModel = require('../../models/ReviewModel');
const CarModel = require('../../models/CarModel');

// setting up the middleware that tests route handlers with Chai
chai.use(chaiHttp);

// configuring the database
mongoose.Promise = global.Promise
const databaseOptions = {
    useNewUrlParser: true, // mongoose's URL parser is also deprecated, so we pass this in as a option to use the new one
};
mongoose.set('useCreateIndex', true); // collection.ensureIndex is also deprecated so we use 'useCreateIndex' instead


// initializes the connection to the database before any of the tests run
before(done => {
    mongoose.connect(process.env.MONGODB_URI, databaseOptions);
    mongoose.connection
        .once('open', () => done())
        .on('error', (err) => console.warn(err));
});

after(done => {
    Promise.all([ UserModel.deleteMany({ testEntry: true }), ReviewModel.deleteMany({ testEntry: true }), CarModel.deleteMany({ testEntry: true }) ])
        .then(() => done())
})

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