const db = require("./models");

let cleaningEvent_list = {
    title: "Cleaning Event Request 1",
    start: new Date("2019-01-29T11:46:31Z"),
    end: new Date("2019-01-29T16:46:31Z"),
    url: "https://google.com",
    // className: String,
    // editable: Boolean,
    // startEditable: Boolean,
    // durationEditable: Boolean,
    // resourceEditable: Boolean,
    // rendering: Boolean,
    // overlap: Boolean,
    // color: String,
    // backgroundColor: String,
    // borderColor: String,
    // textColor: String,
    description: "Cleaning Event Request 1: Description",
    address: "2345 College Ave, Berkeley, CA 94704",
    typeOfCleaning: ["cleaning"],
    guestCheckout: new Date("12-13-2018"),
    nextGuestCheckIn: new Date("12-13-2018"),
    guestStayDuration: 3,
    finalPriceCleaning: 65,
    finalPriceNoLaundry: 0,
    finalPriceOnlyLaundry: 0,
    amountDue: 65,
    paid: false,
    tags: ["sink", "kitchen counter"],
    imagesDirty: ["www.dirtyhouse.com"],
    laundryEstPickUp: new Date("12-13-2018"),
    laundryActualPickUp: new Date("12-13-2018"),
    laundryEstDropOff: new Date("12-13-2018"),
    laundryActualDropOff: new Date("12-13-2018"),
    cleaningEstStart: new Date("12-13-2018"),
    cleaningActualStart: new Date("12-13-2018"),
    cleaningEstFinish: new Date("12-13-2018"),
    cleaningActualFinish: new Date("12-13-2018")
};

let housingUnit_list = {
    address: "2345 College Ave., Berkeley, CA 94704",
    unitDescription: "Back Unit",
    airbnbURL: "https://www.airbnb.com/rooms/1232209?guests=1&adults=1&s=0tXQlPYf",
    imagesClean: "https://www.airbnb.com/rooms/1232209?guests=1&adults=1&s=0tXQlPYf",
    hostOfferPriceCleaning: 65,
    hostOfferPriceNoLaundry: 35,
    hostOfferPriceOnlyLaundry: 25,
    imagesUnit: "https://www.airbnb.com/rooms/1232209?guests=1&adults=1&s=0tXQlPYf",
    videoUnit: "https://www.airbnb.com/rooms/1232209?guests=1&adults=1&s=0tXQlPYf",
    specialRequirements: "Please inpsect the sheets before putting them on the bed",
    hostTips: "Feel free to park in my driveway!",
    cleanerTips: "The washer and dryer are often full.  Please consider laundry service to cut down on cleaning costsl",
    estTimeToClean: 1.5,
    access: "Gate on the side of the house.  Lock code is 1234.",
    sizeSqFt: 550,
    sizeRooms: 1,
    sizeBathrooms: 1,
    sizeBeds: 1,
    sizeKitchen: 1,
    initialBids: [],
    cleanerNotification: [],
    hostNotification: true,
};

let review_list = {
    type: "cleaning event",
    hostRatingCleaner: 5,
    cleanerRatingHost: 4.5,
    hostReview: "She is a great cleaner!",
    cleanerReview: "Payment was fast!",
};


let user_list = [
{
    username: "JaneSmith2019",
    name: "Jane Smith",
    about: "I like to clean",
    currentCity: "San Francisco",
    profilePic: "https://picsum.photos/200",
    joinDate: new Date("12-13-2018"),
    phone: "4158971000",
    cellPhone: "4151212123",
    businessPhone: "4151233232",
    company: "Clean Cleaning Service",
    emailAlerts: true,
    textAlerts: true,
    hostAirbnbCalendar: "https://exampleCalendar.com",
    cleaningRadius: 5,
    admin: false,
    cleaner: true,
    password: "Password_123",
    email: "david@gmail.com"
}
];

simpleCreate(db.CleaningEvent, cleaningEvent_list, "CleaningEvent");
simpleCreate(db.User, user_list, "User");
simpleCreate(db.HousingUnit, housingUnit_list, "HousingUnit");
simpleCreate(db.Review, review_list, "review");

function simpleCreate(DB, object_list, name) {
  DB.deleteMany({}, (err, objects) => {
    DB.create(object_list, (err, objects) => {
      if (err) {
        return console.log("err", err);
      }
      console.log("deleted all", name);
      console.log("created", objects.length, name);
    });
  });
}