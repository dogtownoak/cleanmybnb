const mongoose = require('mongoose');
Schema = mongoose.Schema;

const HousingUnitSchema = new Schema({
    address: String,
    unitDescription: String,
    airbnbURL: String,
    imagesClean: String,
    hostOfferPriceCleaning: String,
    hostOfferPriceNoLaundry: String,
    hostOfferPriceOnlyLaundry: String,
    imagesUnit: String,
    videoUnit: String,
    specialRequirements: String,
    hostTips: String,
    cleanerTips: String,
    estTimeToClean: String,
    access: String,
    sizeSqFt: String,
    sizeRooms: String,
    sizeBathrooms: String,
    sizeBeds: String,
    sizeKitchen: String,
    initialBids: [],
    cleanerNotification: [],
    hostNotification: Boolean,
    hostID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    preferredCleaers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

});

const HousingUnit = mongoose.model('HousingUnit', HousingUnitSchema);

module.exports = HousingUnit;