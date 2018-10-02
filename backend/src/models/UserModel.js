const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;


const currentDate = new Date();

const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear()
const oldDateString = date + "-" +(month + 1) + "-" + year;

const UserModel = mongoose.Schema({
    fullname: {
      type: String,
      required: true,
      lowercase: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    date: {
      type: Date,
      default: oldDateString,
      index: true
    },
    timesViewed: {
      type: Number,
      default: 0, 
      index: true
  },
    customerId: {
      type: String,
      required: false
    },
    testEntry: {
      type: Boolean,
      default: false
    },
    reviews: [{ type: ObjectId, ref: 'ReviewModel' }],
    paid: {
      type: Boolean,
      default: false
    },
    reviewsViewed: {
      type: Number,
      default: 0
    }
});

// before being saved, a instance of the UserModel will automatically have it's password hashed via bcrypt
UserModel.pre('save', function(next) {
    return bcrypt
      .hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        return next();
      })
      .catch(err => {
        return next(err);
      });
});

UserModel.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};
  
module.exports = mongoose.model('users', UserModel);