$(document).ready(function(){
    console.log("jQuery up and running");


// CRUD API Endpoints
let signUpUrl = '/users/signup'
let verifyUrl = '/verify'
let loginUrl = '/users/login'
let updateUserUrl = '/users/update'
let createHousingUnitUrl = '/users/housingunits/create'
let updateHousingUnitUrl = '/users/housingunits/update'
let deleteHousingUnitUrl = '/users/housingunits/'
let createCleaningEventUrl = '/users/housingunits/cleaningevents/create'
let updateCleaningEventUrl = '/users/housingunits/cleaningevents/review/update'
let deleteCleaningEventUrl = '/users/housingunits/cleaningevents/review/:_id'
let createReviewUrl = '/users/housingunits/cleaningevents/review/create'
let updateReviewUrl = '/users/housingunits/cleaningevents/review/update'
let deleteReviewUrl = '/users/housingunits/cleaningevents/review/:_id'



let user ;
let loggedIn ;

checkForLogin()

// User
$('.signUpForm').on('submit', submitSignup)
$('.signInForm').on('submit', submitLogin)
$('.logOut').on('click', handleLogout)
$('.updateUser').on('submit', updateUser)

// Housing Unit
$('.createHousingUnitForm').on('submit', createHousingUnit)
$('.updateHousingUnitForm').on('submit', updateHousingUnit)
// $('.deleteHousingUnitFomr').on('submit', deleteHousingUnit)

// Cleaning Event
$('.createCleaningEventForm').on('submit', createCleaningEvent)
$('.updateCleaningEventForm').on('submit', updateCleaningEvent)
// $('.deleteCleaningEventForm').on('submit', deleteCleaningEvent)

// Review
$('.createReviewForm').on('submit', createReview)
$('.updateReviewForm').on('submit', updateReview)
// $('.deleteReviewForm').on('submit', deleteReview)


// User
function submitSignup(e){
    e.preventDefault();
    console.log("submit sign up clicked")
    let signUpData = {
        password: $('#signup-password').val(),
        username: $('#signup-username').val(),
        email: $('#signup-email').val()
    }
    console.log(signUpData)
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'POST',
        url: signUpUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
            console.log( err );
            console.log("post error",err)
        }
        function onSuccess (newUser) {
            console.log(`User Created:`, newUser)
            localStorage.token = newUser.token
            user = newUser.payload
            console.log(user)
            checkForLogin()
    }   
    };

function submitLogin(e){
    e.preventDefault();
    console.log("LOGIN FORM SUBMITTED")
    // let userData = $(this).serialize()
    let signInData = {
        password: $('#signIn-password').val(),
        email: $('#signIn-email').val()
    }

    console.log("LOGIN: ", signInData)
    $.ajax({
        method: "POST",
        url: loginUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signInData),
    }).done(function signupSuccess(json) {
        console.log("LOG IN SUCCESSFUL")
        console.log(json);
        localStorage.token = json.token;
        
        checkForLogin();
    }).fail(function signupError(e1,e2,e3) {
        console.log(e2);
    })
}

function checkForLogin(){
    console.log("checking for login")
    console.log(window.location.href)
    if(localStorage.token){
        let jwt = localStorage.token
        $.ajax({
            type: 'POST',
            url: verifyUrl,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.token)
            }
        }).done(function (response) {
            console.log(response)
            localStorage.userId = response.id
        }).fail(function (err) {
            console.log(err)
        })
    } else {
        console.log("no token")
        checkLocation()
    }
}

function checkLocation(){
    if (window.location.href != "http://localhost:3000/") {
        window.location.href = "http://localhost:3000/"
    } else console.log("correct location")
}

function handleLogout(e) {
    e.preventDefault();
    console.log("LOGGED OUT")
    delete localStorage.token && localStorage.userId &&localStorage.housingUnitId
    user = null;
    checkForLogin();
}

function updateUser(e) {
    e.preventDefault();
    console.log("Update User Form Submit")
    let userUpdateData = {
        _id: localStorage.userId,
        name: $('#userName').val(),
        username: $('#userUsername').val(),
        about: $('#userAboutMe').val(),
        email: $('#userEmail').val(),
        phone: $('#userPhone').val(),
        cellPhone: $('#userPhone').val(),
        businessPhone: $('#userBusinessPhone').val(),
        company: $('#userCompany').val(),
        emailAlerts: $('#userEmailAlerts').val(),
        textAlerts: $('#userTextAlerts').val()
    }
    console.log(userUpdateData)
    $.ajax({
        method: 'PATCH',
        url: updateUserUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(userUpdateData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
            console.log( err );
            console.log("post error",err)
        }
        function onSuccess (userUpdates) {
            console.log(`User updated:`, userUpdates)
    }   
    };

// Housing Unit
function createHousingUnit(e){
    e.preventDefault();
    console.log("submit create housing unit clicked")
    let signUpData = {
        hostID: localStorage.userId,
        address: $('#housingUnitAddress').val(),
        unitDescription: $('#housingUnitDescription').val(),
        airbnbURL: $('#housingUnitAirbnbURL').val(),
        specialRequirements: $('#housingUnitSpecialReq').val(),
        hostTips: $('#housingUnitHostTips').val(),
        cleanerTips: $('#housingUnitCleanerTips').val(),
        sizeSqFt: $('#housingUnitSizeSqFt').val(),
        sizeRooms: $('#housingUnitSizeRooms').val(),
        sizeBathrooms: $('#housingUnitSizeBathrooms').val(),
        sizeBeds: $('#housingUnitSizeBeds').val(),
        sizeKitchen: $('#housingUnitSizeKitchen').val()
        }
    console.log(signUpData)
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'POST',
        url: createHousingUnitUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
            console.log( err );
            console.log("post error",err)
        }
        function onSuccess (newHousingUnit) {
            console.log(`HousingUnit Created:`, newHousingUnit)
            localStorage.housingUnitId = newHousingUnit._id
        }   
        };    

function updateHousingUnit(e){
    e.preventDefault();
    console.log("submit update housing unit clicked")
    let signUpData = {
        _id: "5c5115ab6e745275b86f588d",
        address: $('#housingUnitAddressU').val(),
        unitDescription: $('#housingUnitDescriptionU').val(),
        airbnbURL: $('#housingUnitAirbnbURLU').val(),
        specialRequirements: $('#housingUnitSpecialReqU').val(),
        hostTips: $('#housingUnitHostTipsU').val(),
        cleanerTips: $('#housingUnitCleanerTipsU').val(),
        sizeSqFt: $('#housingUnitSizeSqFtU').val(),
        sizeRooms: $('#housingUnitSizeRoomsU').val(),
        sizeBathrooms: $('#housingUnitSizeBathroomsU').val(),
        sizeBeds: $('#housingUnitSizeBedsU').val(),
        sizeKitchen: $('#housingUnitSizeKitchenU').val()
        }
    console.log(signUpData)
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'PATCH',
        url: updateHousingUnitUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
        console.log( err );
        console.log("PATCH update error",err)
        }
        function onSuccess (updatedHousingUnit) {
        console.log(`HousingUnit Updated:`, updatedHousingUnit)
        }   
        };

// Cleaning Event
function createCleaningEvent(e){
    e.preventDefault();
    console.log("submit create cleaning event clicked")
    let signUpData = {
        housingUnit: localStorage.housingUnitId,
        title: $('#cleaningEventTitle').val(),
        start: $('#cleaningEventStart').val(),
        end: $('#cleaningEventEnd').val(),
        url: $('#cleaningEventURL').val(),
        className: $('#cleaningEventClassName').val(),
        color: $('#cleaningEventColor').val(),
        backgroundColor: $('#cleaningEventBackgroundColor').val(),
        textColor: $('#cleaningEventTextColor').val(),
        description: $('#cleaningEventDescription').val(),
        address: $('#cleaningEventAddress').val(),
        guestCheckout: $('#cleaningEventGuestCheckout').val(),
        nextGuestCheckIn: $('#cleaningEventNextGuestCheckIn').val(),
        finalPriceCleaning: $('#cleaningEventFinalPriceCleaning').val(),
        amountDue: $('#cleaningEventAmountDue').val(),
        paid: $('#cleaningEventPaid').val()
        }
    console.log(signUpData)
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'POST',
        url: createCleaningEventUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
            console.log( err );
            console.log("post error",err)
        }
        function onSuccess (newCleaningEvent) {
            console.log(`CleaningEvent Created:`, newCleaningEvent)
            localStorage.cleaningEventId = newCleaningEvent._id
        }   
        };    

function updateCleaningEvent(e){
    e.preventDefault();
    console.log("submit update cleaning event clicked")
    let signUpData = {
        _id: "5c513fce8af8d5019ce3c338",
        title: $('#cleaningEventTitleU').val(),
        start: $('#cleaningEventStartU').val(),
        end: $('#cleaningEventEndU').val(),
        url: $('#cleaningEventURLU').val(),
        className: $('#cleaningEventClassNameU').val(),
        color: $('#cleaningEventColorU').val(),
        backgroundColor: $('#cleaningEventBackgroundColorU').val(),
        textColor: $('#cleaningEventTextColorU').val(),
        description: $('#cleaningEventDescriptionU').val(),
        address: $('#cleaningEventAddressU').val(),
        guestCheckout: $('#cleaningEventGuestCheckoutU').val(),
        nextGuestCheckIn: $('#cleaningEventNextGuestCheckInU').val(),
        finalPriceCleaning: $('#cleaningEventFinalPriceCleaningU').val(),
        amountDue: $('#cleaningEventAmountDueU').val(),
        paid: $('#cleaningEventPaidU').val()
        }
    console.log(signUpData)
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'PATCH',
        url: updateCleaningEventUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
        console.log( err );
        console.log("PATCH update error",err)
        }
        function onSuccess (updatedCleaningEvent) {
        console.log(`CleaningEvent Updated:`, updatedCleaningEvent)
        }   
        };

// Review
function createReview(e){
    e.preventDefault();
    console.log("submit create review clicked")
    let signUpData = {
        reviewerId: "5c50e8da285d635b7cf556b1",
        revieweeId: "5c50eb99d5bc9e5c8aab5baa",
        housingUnitId: "5c50e8da285d635b7cf556b0",
        cleaningEventId: "5c50e8da285d635b7cf556af",
        type: $('#reviewType').val(),
        hostRatingCleaner: $('#reviewHostRatingCleaner').val(),
        cleanerRatingHost: $('#reviewCleanerRatingHost').val(),
        hostReview: $('#reviewHostReview').val(),
        cleanerReview: $('#reviewCleanerReview').val(),
        }
    console.log(signUpData)
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'POST',
        url: createReviewUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
            console.log( err );
            console.log("post error",err)
        }
        function onSuccess (newReview) {
            console.log(`Review Created:`, newReview)
            localStorage.reviewId = newReview._id
        }   
        };    

function updateReview(e){
    e.preventDefault();
    console.log("submit update review clicked")
    let signUpData = {
        _id: "5c514f8ff995c90d8565edb3",
        reviewerId: "5c50e8da285d635b7cf556b1",
        revieweeId: "5c50eb99d5bc9e5c8aab5baa",
        housingUnitId: "5c50e8da285d635b7cf556b0",
        cleaningEventId: "5c50e8da285d635b7cf556af",
        type: $('#reviewTypeU').val(),
        hostRatingCleaner: $('#reviewHostRatingCleanerU').val(),
        cleanerRatingHost: $('#reviewCleanerRatingHostU').val(),
        hostReview: $('#reviewHostReviewU').val(),
        cleanerReview: $('#reviewCleanerReviewU').val(),
        }
    console.log(signUpData)
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'PATCH',
        url: updateReviewUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
        console.log( err );
        console.log("PATCH update error",err)
        }
        function onSuccess (updatedReview) {
        console.log(`Review Updated:`, updatedReview)
        }   
        };
});