const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    about: String,
    currentCity:String,
    profilePic: String,
    joinDate: Date,
    phone: String,
    cellPhone: String,
    businessPhone: String,
    businessAddress: String,
    company: String,
    emailAlerts: Boolean,
    textAlerts: Boolean,
    hostAirbnbCalendar: String,
    taxID: String,
    admin: Boolean,
    cleaner: Boolean,
    cleaningRadius: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        return ret
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;