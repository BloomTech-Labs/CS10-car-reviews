const assert = require('assert');
const CarModel = require('../../models/CarModel');

describe('Testing the User Models on the DB', () => {
    let newCar;

    beforeEach(done => {
        newCar = new CarModel({
            make: 'Mitsubishi',
            model: 'Eclipse Cross',
            year: 2019,
            edition: 'SEL'
        });
        done();
    })

    // drops the car from the database after each test
    afterEach((done) => {
        newCar.remove()
            .then(() => done());
    })

    // saves the car record and then makes sure it is stored properly
    it('adds a new user to the database', (done) => {
        newCar.save()
            .then(() => {
                CarModel.findOne({ model: 'Eclipse Cross' })
                    .then(carRecord => {
                        assert(carRecord.model === newCar.model)
                        done();
                    })
            })
    });

    // saves a new user model then makes sure it can be removed
    it('adds and removes a new user from the database', (done) => {
        newCar.save()
            .then(() => {
                newCar.remove()
                    .then(({ username }) => { // destructuring the username prop off of the deleted record
                        CarModel.find({ username })
                            .then(response => {
                                assert(response.length === 0);
                                done();
                            })
                    })
            })         
    });

    it('adds a user to the database then updates the user', (done) => {
        newCar.save()
            .then(() => {
                // here we pass in the { new: true } option so that the method returns the updated model
                // * OPTIONAL: Deprecation warning on the next line
                CarModel.findOneAndUpdate({ model: newCar.model }, { year: 2020 }, { new: true })
                    .then(({ year }) => {
                        assert(year === 2020);
                        done();
                    })
            })
    });
})