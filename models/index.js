const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-capstone-js', { useNewUrlParser: true});

const CleaningEvent = require('./cleaningEvent');
const HousingUnit = require('./housingUnit');
const User = require('./user');
const Review = require('./review');

exports.CleaningEvent = CleaningEvent;
exports.HousingUnit = HousingUnit;
exports.User = User;
exports.Review = Review;