const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReviewModel = mongoose.Schema({
    car: { 
        type: ObjectId, 
        ref: 'CarModel',
        required: true
    },
    user: { 
        type: ObjectId, 
        ref: 'UserModel',
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

module.exports = mongoose.model('reviews', ReviewModel);