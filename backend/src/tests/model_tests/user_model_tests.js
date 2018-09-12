const assert = require('assert');
const UserModel = require('../../models/UserModel');

// * NOTE: Because each user document has to be unique, we create a new user for each test here
// * TODO: Find a way to test relational data
// ** OPTIONAL: Make the testing less repetitive with declaring newUser in each test
// ** OPTIONAL: Add .catch handlers for catching errors
describe('Testing the User Models on the DB', () => {
    let newUser;

    beforeEach(done => {
        newUser = new UserModel({
            fullname: 'user1',
            username: 'user1',
            email: 'user1@user.com',
            password: 'user1'
        });
        done();
    })

    // saves the user record then makes sure it is stored properly
    it('adds a new user to the database', (done) => {
        newUser.save()
            .then(() => {
                UserModel.findOne({ email: newUser.email })
                    .then(userRecord => {
                        assert(userRecord.username === newUser.username)
                        done();
                    })
            })
    });

    // saves a new user record then makes sure it can be removed
    it('adds and removes a new user from the database', (done) => {
        newUser.save()
            .then(() => {
                newUser.remove()
                    .then(({ username }) => { // destructuring the username prop off of the deleted record
                        UserModel.find({ username })
                            .then(response => {
                                assert(response.length === 0);
                                done();
                            })
                    })
            })         
    });

    it('adds a user to the database then updates the user', (done) => {
        newUser.save()
            .then(() => {
                // here we pass in the { new: true } option so that the method returns the updated model
                // * OPTIONAL: Deprecation warning on the next line
                UserModel.findOneAndUpdate({ username: newUser.username }, { username: 'testing' }, { new: true })
                    .then(({ username }) => {
                        assert(username === 'testing');
                        done();
                    })
            })
    });
})