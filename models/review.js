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
        ref: 'user'
    },
    revieweeId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    housingUnitId: {
        type: Schema.Types.ObjectId,
        ref: 'housingUnit'
    },
    cleaningEventId: {
        type: Schema.Types.ObjectId,
        ref: 'cleaningEvent'
    }

});

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;