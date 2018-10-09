// *** IMPORTANT: When running these tests, it's best to drop all three collections in your database with a GUI ahead of time
// * NOTE: This file is used to initialize a connection to the server before any tests run and externalize other functionality
// here we setup and initialize Mongoose just like we would normally:
const mongoose = require('mongoose');
const server = require('../../server');
require('dotenv').config();


const UserModel = require('../../models/UserModel');
const ReviewModel = require('../../models/ReviewModel');
const CarModel = require('../../models/CarModel');

// configuring the database
mongoose.Promise = global.Promise
const databaseOptions = {
    useNewUrlParser: true, // mongoose's URL parser is also deprecated, so we pass this in as a option to use the new one
};
mongoose.set('useCreateIndex', true); // collection.ensureIndex is also deprecated so we use 'useCreateIndex' instead

// connects to the database before the tests start
before(done => {
    mongoose.connect(process.env.MONGODB_URI, databaseOptions);
    mongoose.connection
        .once('open', () => done()) // here no test will run until done() is executed
        .on('error', (err) => console.warn(`There was an error connecting to the database: \n${err}`));
});


// ** OPTIONAL: Get this beforeEach working in place of the individual remove statements in the individual test files
beforeEach(done => {
    Promise.all([ UserModel.deleteMany({ testEntry: true }), ReviewModel.deleteMany({ testEntry: true }), CarModel.deleteMany({ testEntry: true}) ])
        .then(response => done())
        .catch(err => console.warn(err));
})