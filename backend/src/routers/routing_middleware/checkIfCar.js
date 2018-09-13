const CarModel = require('../../models/CarModel');

const checkIfCar = (req, res, next) => {
    const { year, make, model, edition } = req.body;
    CarModel.findOne({year: year, make: make, model: model, edition: edition})
        .then(car => {
            if (car != null) {
                req.carID = car._id;
                next();
            } else {
                req.carID = null;
                next();
            }
        }) 
        .catch(err => {
            res.status(500).json({ error: err.message });
            req.carID = null;
            next();
        });
}

module.exports = checkIfCar;