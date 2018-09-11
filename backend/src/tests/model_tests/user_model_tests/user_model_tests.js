const assert = require('assert');
const UserModel = require('../../..//models/UserModel');

// ** OPTIONAL: Make the testing less repetitive with declaring newUser in each test
// ** OPTIONAL: Add .catch handlers for catching errors
describe('Testing the User Models on the DB', () => {
    // initialize the user so it can be accessed in all of the It Blocks

    // creating an new user before each test
    // beforeEach((done) => {
    //     newUser = new UserModel({
    //         fullname: 'macgruber',
    //         username: 'doobs',
    //         email: 'grubes@grubes.com',
    //         password: 'thisisapassword'
    //     });
    //     done();
    // });
    
    // saves the user model, then makes sure it is stored properly
    it('adds a new user to the database', (done) => {
        const newUser = new UserModel({
            fullname: 'user1',
            username: 'user1',
            email: 'user1@user.com',
            password: 'user1'
        });

        newUser.save()
            .then(() => {
                UserModel.findOne({ email: newUser.email })
                    .then(userRecord => {
                        assert(userRecord.username === newUser.username)
                        done();
                    })
            })
    });

    // saves a new user model then makes sure it can be removed
    it('adds and removes a new user from the database', (done) => {
        const newUser = new UserModel({
            fullname: 'user2',
            username: 'user2',
            email: 'user2@user.com',
            password: 'user2'
        });

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
    })
})