const mongoose = require('mongoose');
Schema = mongoose.Schema;

const CleaningEventSchema = new Schema({
    typeOfCleaning: [],
    title: String,
    start: Date,
    end: Date,
    url: String,
    className: String,
    editable: Boolean,
    startEditable: Boolean,
    durationEditable: Boolean,
    resourceEditable: Boolean,
    rendering: Boolean,
    overlap: Boolean,
    color: String,
    backgroundColor: String,
    borderColor: String,
    textColor: String,
    description: String,
    address: String,
    guestCheckout: Date,
    nextGuestCheckIn: Date,
    guestStayDuration: String,
    finalPriceCleaning: String,
    finalPriceNoLaundry: String,
    finalPriceOnlyLaundry: String,
    amountDue: String,
    paid: Boolean,
    tags: [],
    imagesDirty: [],
    laundryEstPickUp: Date,
    laundryActualPickUp: Date,
    laundryEstDropOff: Date,
    laundryActualDropOff: Date,
    cleaningEstStart: Date,
    cleaningActualStart: Date,
    cleaningEstFinish: Date,
    cleaningActualFinish: Date,
    housingUnit: {
        type: Schema.Types.ObjectId,
        ref: 'HousingUnit'
    },
    cleanerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hostId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }


});

const CleaningEvent = mongoose.model('CleaningEvent', CleaningEventSchema);

module.exports = CleaningEvent;