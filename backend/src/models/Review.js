const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Review = mongoose.Schema({
    car: { 
        type: ObjectId, 
        ref: 'Car',
        required: true
    },
    user: { 
        type: ObjectId, 
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    score: {
        type: Number, 
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Review', Review);