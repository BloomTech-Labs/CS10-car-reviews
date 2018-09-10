const mongoose = require('mongoose');

const CarModel = mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    reviews: [{ type: ObjectId, ref: 'ReviewModel' }]
});

module.exports = mongoose.model('cars', CarModel);