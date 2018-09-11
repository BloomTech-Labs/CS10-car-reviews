const assert = require('assert');
const UserModel = require('../../..//models/UserModel');

describe('Testing the User Models on the DB', () => {
    // initialize the user so it can be accessed in all of the It Blocks
    let newUser;

    // creating an new user before each test
    beforeEach((done) => {
        newUser = new UserModel({
            fullname: 'MacGruber',
            username: 'Doobs',
            email: 'grubes@grubes.com',
            password: 'thisisapassword'
        });
        done();
    });
    
    // saves the user model, then makes sure it is stored properly
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
})