const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
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
    title: {
        type: String,
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
    timesViewed: {
        type: Number,
        default: 0, 
        index: true
    },
    createOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date
    },
    testEntry: {
        type: Boolean,
        default: false
    }
});

const ReviewModel = mongoose.model('reviews', ReviewSchema);
exports.schema = ReviewSchema;

module.exports = ReviewModel;