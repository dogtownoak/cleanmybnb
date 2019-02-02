// import moment = require("moment");

$(document).ready(function(){
    console.log("jQuery up and running");

// CRUD API Endpoints
let signUpUrl = '/users/signup'
let verifyUrl = '/verify'
let loginUrl = '/users/login'
let updateUserUrl = '/users/update'
let getUserUrl = '/users/'
let getHousingUnitsUrl = '/users/housingunits/index'
let createHousingUnitUrl = '/users/housingunits/create'
let updateHousingUnitUrl = '/users/housingunits/update'
let updateHouseingUnitForm = '/users/housingunits/'
let getUserCleaningEventsUrl = '/users/housingunits/cleaningevents/index'
let createCleaningEventUrl = '/users/housingunits/cleaningevents/create'
let updateCleaningEventUrl = '/users/housingunits/cleaningevents/update'
let updateCleaningEventFormURL = '/users/housingunits/cleaningevents/'
let createReviewUrl = '/users/housingunits/cleaningevents/review/create'
let updateReviewUrl = '/users/housingunits/cleaningevents/review/update'
let deleteReviewUrl = '/users/housingunits/cleaningevents/review/:_id'


let user ;
let loggedIn ;
let housingUnitId;


checkForLogin()
getUserHousingUnits()
getUserCleaningEvents()

$('.hideButton').on('click', hideUserForm)
function hideUserForm(e) {
    e.preventDefault()
    // $('.updateUser').toggleClass('hide')
}

$('.hideButton').on('click', hideHUCreateForm)
function hideHUCreateForm(e) {
    e.preventDefault()
    // $('.createHousingUnitForm').toggleClass('hide')
}

// $('.hideButtonUpdate').on('click', hideHUUpdateForm)
// function hideHUUpdateForm(e) {
//     updateHousingUnitFormData()
//     e.preventDefault()
//     // $('.updateHousingUnitForm').toggleClass('hide')
// }

$('.hideButtonCreateC').on('click', hideCEForm)
function hideCEForm(e) {

    e.preventDefault()
    // $('.createCleaningEventForm').toggleClass('hide')
}

// $('.hideButtonUpdateC').on('click', hideCEUForm)
// function hideCEUForm(e) {
//     e.preventDefault()
//     // $('.updateCleaningEventForm').toggleClass('hide')
// }

$('.hideButtonCreateR').on('click', hideRCreateForm)
function hideRCreateForm(e) {
    e.preventDefault()
    // $('.createReviewForm').toggleClass('hide')
}

$('.hideButtonUpdateR').on('click', hideRUForm)
function hideRUForm(e) {
    e.preventDefault()
    // $('.updateReviewForm').toggleClass('hide')
}



$('.userHUWrapper').on('click', '.deleteHousingUnitButton', function() {
    housingUnitId = $(this).data()
    console.log(housingUnitId)
    deleteHousingUnit()
    location.reload()
})

$('.userHUWrapper').on('click', '.hideButtonCreateC', function() {
    housingUnitId = $(this).data()
    console.log(housingUnitId)
    showCreateCEmodal()


})


$('.userHUWrapper').on('click', '.hideButtonUpdateHU', function() {
    
    housingUnitId = $(this).data()
    console.log(`this is it ${housingUnitId.id}`)
    updateHousingUnitFormData()
    showUpdateHUmodal()
    
})

$('.userHUWrapper').on('click', '.hideButtonCreateHU', function() {
    
    housingUnitId = $(this).data()
    console.log(`this is it ${housingUnitId.id}`)
    showCreateHUmodal()
    
})

// $('.userHUWrapper').on('click', '.hideButtonUpdateHU', function() {
//     closeModalHE()

// })




$('.userCEWrapper').on('click', '.hideButtonUpdateCE', function(e) {
    e.preventDefault()
    cleaningEventId = $(this).data()
    console.log(cleaningEventId)
    console.log("udpate cleaning event form clicked")
    updateCleaningEventFormData()
    showModal()
})

$('.userCEWrapper').on('click', '.deleteCleaningEventButton', function() {
    cleaningEventId = $(this).data()
    console.log(cleaningEventId)
    deleteCleaningEvent()
    location.reload()
})

$('.userCEWrapper').on('click', '.assignCleanerButton', function() {
    cleaningEventId = $(this).data()
    console.log(cleaningEventId)
    console.log("assign cleaner clicked")
    addCleanerCleaningEvent()
    if(localStorage.cleaner === true ){
        console.log("I'm a cleaner")
        addCleanerCleaningEvent()
    } else {
        console.log("Hey you are not a cleaner!")
    }
})

$('.userCEWrapper').on('click', '.deleteCleanerButton', function() {
    cleaningEventId = $(this).data()
    console.log(cleaningEventId)
    console.log("delete cleaner clicked")
    deleteCleanerCleaningEvent()
    if(localStorage.cleaner === true ){
        console.log("I'm a cleaner")
    } else {
        console.log("Hey you are not a cleaner!")
    }
    location.reload()
})


$('.body').on('click', '.sendData', function(){

$('.updateHousingUnitForm').form('submit', updateHousingUnit())
})

function showModal() {
        console.log('open modal')
        $('.longer.modal.CE').modal({
            blurring: true,
            closable : false,
            useCSS   : true
        })
        .modal('show') 
}

function showUpdateHUmodal() { $('.modal.updateHUModal').modal({
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show') 
}

function showCreateHUmodal() { $('.modal.createHUModal').modal({
    blurring: true,
    closable : false,
    useCSS   : true
})
.modal('show') 
}

function showCreateCEmodal() { $('.modal.createCE').modal({
    blurring: true,
    closable : false,
    useCSS   : true
})
.modal('show') 
}

// // Hide HU Update Modal
// $('.cancelModalHU').on('click', function(){
//     location.reload()
// })


// used on form stubmit: using "this modal" works but there is a delay when closing
// function closeModalCE() {
//         $('.longer.modal.CE').modal('hide') 
// }
function closeModalHU() {
    $('.modal.updateHUModal').modal('hide') 
}
// function closeModalU() {
//     $('.longer.modal').modal('hide') 
// }
// function closeModalR() {
//     $('.longer.modal').modal('hide') 
// }

$('.modalTestButton').on('click', function(){
    console.log('click')
    $('.longer.modal').modal({
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show')      
})

$('.cancelMo').on('click', function(){
    $('.longer.modal')
    .modal('hide')
    location.reload()
})

$('.cancelModalHU').on('click', function(){
    $('.longer.modal')
    .modal('hide')
    location.reload()
})

$('.cancelModalCHU').on('click', function(){
    $('.longer.modal')
    .modal('hide')
    location.reload()
})

$('.cancelModalCE').on('click', function(){
    $('.longer.modal')
    .modal('hide')
    location.reload()
})

$('.updateHUModal').on('click', function(){
    console.log('click')
    $('.modal.updateHUModal').modal({
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show')      
})

















// User
$('.signUpForm').on('submit', submitSignup)
$('.signInForm').on('submit', submitLogin)
$('.logOut').on('click', handleLogout)
$('.updateUser').on('submit', updateUser)
$('.updateUserButton').on('click', updateUserFormData)

// Housing Unit
$('.createHousingUnitForm').on('submit', createHousingUnit)
$('.updateHousingUnitForm').on('submit', updateHousingUnit)
// $('.deleteHousingUnitFomr').on('submit', deleteHousingUnit)
// $('.updateHousingUnitButton').on('click', updateHousingUnitFormData)

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
        email: $('#signup-email').val(),
        cleaner: $('#signup-cleaner').val()
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
            localStorage.userId = newUser.payload.user._id
            localStorage.cleaner = newUser.payload.user.cleaner
            user = newUser.payload
            console.log(user)
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
    $.ajax({
        method: "POST",
        url: loginUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(signInData),
        success: function signupSuccess(json) {
            console.log(json);
            if (json.token){
                localStorage.token = json.token;
                localStorage.cleaner = json.cleaner.cleaner 
                checkForLogin();
            } else {
                console.log(json)
            }
            
        },
        error: function signupError(e1,e2,e3) {
            console.log(e2);
        }
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
    delete localStorage.token
    delete localStorage.userId
    delete localStorage.housingUnitId
    delete localStorage.reviewId
    delete localStorage.cleaningEventId
    delete localStorage.cleaner
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
        cellPhone: $('#userCell').val(),
        businessPhone: $('#userBusinessPhone').val(),
        company: $('#userCompany').val(),
        emailAlerts: $('#userEmailAlerts').val(),
        cleaningRadius: $('#userCleaningRadius').val(),
        hostAirbnbCalendar: $('#userHostAirbnbCalendar').val()
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

function updateUserFormData(e) {
        
        e.preventDefault();
        // $('.updateUser').toggleClass('hide')
        console.log("Update User Form with Data")
        $.ajax({
            method: 'GET',
            url: getUserUrl + localStorage.userId,
            success: onSuccess,
            error: onError
        });
            function onError ( err ) {
                console.log( err );
                console.log("get user error",err)
            }
            function onSuccess (user) {
                console.log(`User Form Updated:`, user)
                $('input[id="userUsername"]').val(user[0].username)
                $('input[id="userName"]').val(user[0].name)
                $('input[id="userUsername"]').val(user[0].username)
                $('input[id="userAboutMe"]').val(user[0].about),
                $('input[id="userEmail"]').val(user[0].email),
                $('input[id="userPhone"]').val(user[0].phone),
                $('input[id="userCell"]').val(user[0].cellPhone),
                $('input[id="userBusinessPhone"]').val(user[0].businessPhone),
                $('input[id="userCompany"]').val(user[0].company),
                $('input[id="userEmailAlerts"]').val(user[0].emailAlerts),
                $('input[id="userTextAlerts"]').val(user[0].textAlerts),
                $('input[id="userHostAirbnbCalendar"]').val(user[0].hostAirbnbCalendar),
                $('input[id="userCleaningRadius"]').val(user[0].cleaningRadius)
        }   
        };


// Housing Unit

function getUserHousingUnits(){
    $.ajax({
        method: 'GET',
        url: getHousingUnitsUrl ,
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
            console.log( err );
            console.log("post error",err)
        }
        function onSuccess (housingUnits) {
            console.log(`HousingUnit Arr:`, housingUnits)
            let userHUnits = housingUnits.filter(housingUnit => housingUnit.hostID === localStorage.userId)
            console.log(`Host's HousingUnits`, userHUnits)
        
            userHUnits.forEach(unit => {
                let card1 =
                `<div data=${unit._id}>
                <li>Address: ${unit.address}</li>
                <li>Unit Description: ${unit.unitDescription}</li>
                <li>Airbnb: <a href="${unit.airbnbURL}" >Airbnb Unit</a></li>
                <li>Square Footage: ${unit.sizeSqFt}</li>
                <li>Rooms: ${unit.sizeRooms}</li>
                <li>Beds: ${unit.sizeBeds}</li>
                <li>Bathrooms: ${unit.sizeBathrooms}</li>
                <li>Kithchen: ${unit.sizeKitchen}</li>
                <li>Special Requirements: ${unit.specialRequirements}</li>
                <li>Cleaning Tips: ${unit.cleanerTip}</li>
                <li>Host Tips: ${unit.hostTips}</li>
                
                <button data-id=${unit._id} class="ui button createHUModal hideButtonCreateHU">Create Housing Unit</button>
                
                <button data-id=${unit._id} class="ui button updateHUModal hideButtonUpdateHU">Update Housing Unit</button>


                <button data-id=${unit._id} class="ui button deleteHousingUnitButton">Delete Housing Unit</button>
                <button data-id=${unit._id} class="ui button hideButtonCreateC">Create Cleaning Event</button>
                </div>
                `
            $('.userHUWrapper').append(card1)
            })   
        }   
};


function createHousingUnit(e){
    e.preventDefault();
    // $('.createHousingUnitForm').toggleClass('hide')
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
            getUserHousingUnits()
        }   
        };    

function updateHousingUnit(e){
    console.log(housingUnitId.id)
    e.preventDefault();
    console.log("submit update housing unit clicked")
    let signUpData = {
        _id: housingUnitId.id,
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
    console.log(JSON.stringify(signUpData))
    $.ajax({
        method: 'PATCH',
        url: updateHousingUnitUrl ,
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

function updateHousingUnitFormData(){
    // $('.updateHousingUnitForm').toggleClass('hide')
    console.log("submit update housing unit form data clicked")
    $.ajax({
        method: 'GET',
        url: updateHouseingUnitForm + housingUnitId.id,
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
        console.log( err );
        console.log("GET  error",err)
        }
        function onSuccess (housingUnit) {
            console.log(`HousingUnit Form Updated:`, housingUnit)
            $('input[id="housingUnitAddressU"]').val(housingUnit[0].address)
            $('input[id="housingUnitDescriptionU"]').val(housingUnit[0].unitDescription)
            $('input[id="housingUnitAirbnbURLU"]').val(housingUnit[0].airbnbURL)
            $('input[id="housingUnitSpecialReqU"]').val(housingUnit[0].specialRequirements),
            $('input[id="housingUnitHostTipsU"]').val(housingUnit[0].hostTips),
            $('input[id="housingUnitCleanerTipsU"]').val(housingUnit[0].cleanerTips),
            $('input[id="housingUnitSizeSqFtU"]').val(housingUnit[0].sizeSqFt),
            $('input[id="housingUnitSizeRoomsU"]').val(housingUnit[0].sizeRooms),
            $('input[id="housingUnitSizeBathroomsU"]').val(housingUnit[0].sizeBathrooms),
            $('input[id="housingUnitSizeBedsU"]').val(housingUnit[0].sizeBeds),
            $('input[id="housingUnitSizeKitchenU"]').val(housingUnit[0].sizeKitchen)
        }   
    
    
    }   

function deleteHousingUnit(){
    $.ajax({
        method: 'DELETE',
        url: updateHouseingUnitForm + housingUnitId.id,
        success: onSuccess,
        error: onError
    });
    function onError ( err ) {
        console.log( err );
        console.log("Delete  error",err)
        }
    function onSuccess (deletedHousingUnit) {
        console.log("Deleted Housing Unit", deletedHousingUnit)
}
}

    // Cleaning Events
function getUserCleaningEvents(){

        $.ajax({
            method: 'GET',
            url: getUserCleaningEventsUrl ,
            success: onSuccess,
            error: onError
        });
            function onError ( err ) {
                console.log( err );
                console.log("get error",err)
            }
            function onSuccess (cleaningEvents) {
                console.log(`cleaningEvent Arr:`, cleaningEvents)

                let userCleaningEvents = cleaningEvents.filter(cleaningEvent => cleaningEvent.hostId === localStorage.userId || cleaningEvent.cleanerId === localStorage.userId)
                console.log(`User Cleaning Events`, userCleaningEvents)

                userCleaningEvents.forEach(cleaningEvent => {
                    let card1 =
                    `<div data=${cleaningEvent._id}>
                    <li>housingUnit: ${cleaningEvent.housingUnit}</li>
                    <li>Title: ${cleaningEvent.title}</li>
                    <li>Start: ${moment(cleaningEvent.start).add(8, 'hours').format("M-DD-YYYY h:mm a")}</li>
                    <li>End: ${moment(cleaningEvent.end).add(8, 'hours').format("M-DD-YYYY h:mm a")}</li>
                    <li>Address: ${cleaningEvent.address}</li>
                    <li>Guest Checkout: ${moment(cleaningEvent.guestCheckout).add(8, 'hours').format("MM-DD-YYYY h:mm a")}</li>
                    <li>Next Guest Checkin: ${moment(cleaningEvent.nextGuestCheckIn).add(8, 'hours').format("MM-DD-YYYY h:mm a")}</li>
                    <li>Cleaning Price: ${cleaningEvent.finalPriceCleaning}</li>
                    <li>Paid: ${cleaningEvent.paid}</li>
                    
                    <button type="submit" data-id=${cleaningEvent._id} class="ui button hideButtonUpdateCE">Update Cleaning Event</button>

                    <button data-id=${cleaningEvent._id} class="ui button deleteCleaningEventButton">Delete Cleaning Event</button>
                    <button data-id=${cleaningEvent._id} class="ui button assignCleanerButton">Assign Cleaner</button>
                    <button data-id=${cleaningEvent._id} class="ui button deleteCleanerButton">Delete Cleaner</button>
                    </div>
                    `
                $('.userCEWrapper').append(card1)
                })   
            }   
    };

    function deleteCleaningEvent(){
        $.ajax({
            method: 'DELETE',
            url: updateCleaningEventFormURL + cleaningEventId.id,
            success: onSuccess,
            error: onError
        });
        function onError ( err ) {
            console.log( err );
            console.log("Delete  error",err)
            }
        function onSuccess (deletedCleaningEvent) {
            console.log("Deleted CleaningEvent", deletedCleaningEvent)
    }
    }

    function updateCleaningEventFormData(){
        
        console.log("submit update cleaning event form data clicked")
        $.ajax({
            method: 'GET',
            url: updateCleaningEventFormURL + cleaningEventId.id,
            success: onSuccess,
            error: onError
        });
            function onError ( err ) {
            console.log( err );
            console.log("GET  error",err)
            }
            function onSuccess (cleaningEvent) {
                console.log(`CleaningEvent Form Updated:`,cleaningEvent)
                $('input[id="cleaningEventURLU"]').val(cleaningEvent[0].url)
                $('input[id="cleaningEventTitleU"]').val(cleaningEvent[0].title)
                $('input[id="cleaningEventStartU"]').val(moment(cleaningEvent[0].start).add(8, 'hours').format("YYYY-MM-DD[T]HH:mm:ss"))
                $('input[id="cleaningEventEndU"]').val(moment(cleaningEvent[0].end).add(8, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")),
                $('input[id="cleaningEventAddressU"]').val(cleaningEvent[0].address),
                $('input[id="cleaningEventGuestCheckoutU"]').val(moment(cleaningEvent[0].guestCheckout).add(8, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")),
                $('input[id="cleaningEventNextGuestCheckInU"]').val(moment(cleaningEvent[0].nextGuestCheckIn).add(8, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")),
                $('input[id="cleaningEventFinalPriceCleaningU"]').val(cleaningEvent[0].finalPriceCleaning),
                $('input[id="cleaningEventPaidU"]').val(cleaningEvent[0].paid)
    
            }   
            // $('.updateCleaningEventForm').toggleClass('hide')
        
        }   

function createCleaningEvent(e){
    e.preventDefault();
    console.log("submit create cleaning event clicked")
    let signUpData = {
        housingUnit: housingUnitId.id,
        hostId: localStorage.userId,
        title: $('#cleaningEventTitle').val(),
        start: moment($('#cleaningEventStart').val()).subtract(8, 'hours').toISOString(),
        end: moment($('#cleaningEventEnd').val()).subtract(8, 'hours').toISOString(),
        url: $('#cleaningEventURL').val(),
        className: $('#cleaningEventClassName').val(),
        color: $('#cleaningEventColor').val(),
        backgroundColor: $('#cleaningEventBackgroundColor').val(),
        textColor: $('#cleaningEventTextColor').val(),
        description: $('#cleaningEventDescription').val(),
        address: $('#cleaningEventAddress').val(),
        guestCheckout: moment($('#cleaningEventGuestCheckout').val()).subtract(8, 'hours').toISOString(),
        nextGuestCheckIn: moment($('#cleaningEventNextGuestCheckIn').val()).subtract(8, 'hours').toISOString(),
        finalPriceCleaning: $('#cleaningEventFinalPriceCleaning').val(),
        amountDue: $('#cleaningEventAmountDue').val(),
        paid: $('#cleaningEventPaid').val()
        }
    let startCE = $('#cleaningEventStart').val()
    let testMomentCE = moment(startCE).toISOString()
    console.log(testMomentCE)
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
        _id: cleaningEventId.id,
        title: $('#cleaningEventTitleU').val(),
        start: moment($('#cleaningEventStartU').val()).subtract(8, 'hours').toISOString(),
        end: moment($('#cleaningEventEndU').val()).subtract(8, 'hours').toISOString(),
        url: $('#cleaningEventURLU').val(),
        className: $('#cleaningEventClassNameU').val(),
        color: $('#cleaningEventColorU').val(),
        backgroundColor: $('#cleaningEventBackgroundColorU').val(),
        textColor: $('#cleaningEventTextColorU').val(),
        description: $('#cleaningEventDescriptionU').val(),
        address: $('#cleaningEventAddressU').val(),
        guestCheckout: moment($('#cleaningEventGuestCheckoutU').val()).subtract(8, 'hours').toISOString(),
        nextGuestCheckIn: moment($('#cleaningEventNextGuestCheckInU').val()).subtract(8, 'hours').toISOString(),
        finalPriceCleaning: $('#cleaningEventFinalPriceCleaningU').val(),
        amountDue: $('#cleaningEventAmountDueU').val(),
        paid: $('#cleaningEventPaidU').val()
        }
    let start = $('#cleaningEventStartU').val()
    let testMoment = moment(start).toISOString()
    console.log(testMoment)
    console.log(signUpData)
    console.log(moment($('#cleaningEventStartU').val()).toISOString())
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

function addCleanerCleaningEvent(){
    console.log("cleaner ajax function")
    let cleanerUpdate = {
        _id: cleaningEventId.id,
        cleanerId: localStorage.userId
    }

    $.ajax({
        method: 'PATCH',
        url: updateCleaningEventUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(cleanerUpdate),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
        console.log( err );
        console.log("PATCH update error",err)
        }
        function onSuccess (updatedCleaningEvent) {
        console.log(`Cleaner on Cleaning Event Updated:`, updatedCleaningEvent)
        }   
        };

function deleteCleanerCleaningEvent(){
    console.log("cleaner delete ajax")
    let cleanerUpdate = {
        _id: cleaningEventId.id,
        cleanerId: null
    }

    $.ajax({
        method: 'PATCH',
        url: updateCleaningEventUrl,
        json: true,
        contentType : 'application/json',
        data: JSON.stringify(cleanerUpdate),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
        console.log( err );
        console.log("PATCH update error",err)
        }
        function onSuccess (updatedCleaningEvent) {
        console.log(`Cleaner on Cleaning Event Updated:`, updatedCleaningEvent)
        }
}

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