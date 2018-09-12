const assert = require('assert');
const CarModel = require('../../models/CarModel');

describe('Testing the CarModel', () => {
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

    // saves the car record and then makes sure it is stored properly
    it('adds a new car to the database', (done) => {
        newCar.save()
            .then(() => {
                CarModel.findOne({ model: 'Eclipse Cross' })
                    .then(carRecord => {
                        assert(carRecord.model === newCar.model)
                        done();
                    })
                    .catch(err => console.warn(err));
            })
            
    });

    // saves a new car record then makes sure it can be removed
    it('adds and removes a new user from the database', (done) => {
        newCar.save()
            .then(() => {
                newCar.remove()
                    .then(({ model }) => { // destructuring the username prop off of the deleted record
                        CarModel.find({ model })
                            .then(response => {
                                assert(response.length === 0);
                                done();
                            })
                    })
            })         
    });

    // saves a new car record and then makes sure that it's year property can be modified
    it('adds a car record to the database then updates it', (done) => {
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