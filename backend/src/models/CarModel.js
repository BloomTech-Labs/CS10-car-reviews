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
        required: false
    },
    averageScore: {
        type: Number,
        required: true, 
        index: true
    },
    testEntry: {
        type: Boolean,
        default: false
    },
    reviews: [{ type: ObjectId, ref: 'ReviewModel' }],
    imageURL: [{
        type: String
    }]
});

module.exports = mongoose.model('cars', CarModel);