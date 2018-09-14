const CarModel = require('../../models/CarModel');

const checkIfCar = (req, res, next) => {
    const { year, make, model, edition, score } = req.body;
    CarModel.findOne({year: year, make: make, model: model, edition: edition})
        .then(car => {
            if (car != null) {
                req.carID = car._id;
                let newScore = (car.averageScore + score) / (car.reviews.length + 1) // calculate new avg score for specific car
                req.avgScore = newScore;
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