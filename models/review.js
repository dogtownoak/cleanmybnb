const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    type: String,
    hostRatingCleaner: String,
    cleanerRatingHost: String,
    hostReview: String,
    cleanerReview: String,
    reviewerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    revieweeId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    housingUnitId: {
        type: Schema.Types.ObjectId,
        ref: 'HousingUnit'
    },
    cleaningEventId: {
        type: Schema.Types.ObjectId,
        ref: 'CleaningEvent'
    }

});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;