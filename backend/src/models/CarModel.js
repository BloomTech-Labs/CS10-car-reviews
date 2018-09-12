const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

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
    averageScore: {
        type: Number,
        default: 0, 
        index: true
    },
    reviews: [{ type: ObjectId, ref: 'ReviewModel' }]
});

module.exports = mongoose.model('cars', CarModel);