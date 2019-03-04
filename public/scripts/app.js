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
populateUserProfile()
getUserHousingUnits()
getUserCleaningEvents()

$('.hideButton').on('click', hideHUCreateForm)
function hideHUCreateForm(e) {
    e.preventDefault()
}

$('.hideButtonCreateC').on('click', hideCEForm)
function hideCEForm(e) {
    e.preventDefault()
}

$('.hideButtonCreateR').on('click', hideRCreateForm)
function hideRCreateForm(e) {
    e.preventDefault()
}

$('.hideButtonUpdateR').on('click', hideRUForm)
function hideRUForm(e) {
    e.preventDefault()
}

$('.userButtonWrapper').on('click', '.hideButtonCreateHU', function() {  
    console.log(`create housing unit clicked`)
    showCreateHUmodal()   
})

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

$('.showSidebar').on('click', showNavBar)

function showNavBar(){
$('.ui.sidebar')
.sidebar('setting', 'transition', 'overlay')
.sidebar('toggle')
}

function showModal() {
    console.log('open modal')
    $('.longer.modal.CE').modal({
        transition: 'horizontal flip', 
        duration: 800,
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show') 
}

function showUpdateHUmodal() { $('.modal.updateHUModal').modal({
        transition: 'horizontal flip', 
        duration: 800,
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show') 
}

function showCreateHUmodal() { $('.modal.createHUModal').modal({
    transition: 'horizontal flip', 
    duration: 800,
    blurring: true,
    closable : false,
    useCSS   : true
})
    .modal('show') 
}

function showCreateCEmodal() { $('.modal.createCE').modal({
    transition: 'horizontal flip', 
    duration: 800,
    blurring: true,
    closable : false,
    useCSS   : true
})
    .modal('show') 
}

$('.modalTestButton').on('click', function(){
    console.log('click')
    $('.longer.modal').modal({
        transition: 'horizontal flip', 
        duration: 800,
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show')      
})

$('.updateHUModal').on('click', function(){
    console.log('click')
    $('.modal.updateHUModal').modal({
        transition: 'horizontal flip', 
        duration: 800,
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show')      
})

$('.updateUserButton').on('click', function(){
    console.log('update user button clicked')
    $('.longer.modal.updateU').modal({
        transition: 'horizontal flip', 
        duration: 800,
        blurring: true,
        closable : false,
        useCSS   : true
    })
    .modal('show')
    })

function closeModalHU() {
    $('.modal.updateHUModal').modal('hide') 
}

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

$('.cancelModalU').on('click', function(){
    $('.longer.modal.updateU')
    .modal('hide')
    location.reload()
})

$('.cancelModalU').on('click', function(){
    $('.longer.modal.updateUser')
    .modal('hide')
    location.reload()
})

$('.ui.dropdown').dropdown();

// User
$('.signUpForm').on('submit', submitSignup)
$('.signInForm').on('submit', submitLogin)
$('.logOut').on('click', handleLogout)
$('.updateUser').on('submit', updateUser)
$('.updateUserButton').on('click', updateUserFormData)

// Housing Unit
$('.createHousingUnitForm').on('submit', createHousingUnit)
$('.updateHousingUnitForm').on('submit', updateHousingUnit)

// Cleaning Event
$('.createCleaningEventForm').on('submit', createCleaningEvent)
$('.updateCleaningEventForm').on('submit', updateCleaningEvent)

// Review
$('.createReviewForm').on('submit', createReview)
$('.updateReviewForm').on('submit', updateReview)

// User
function submitSignup(e){
    e.preventDefault();
    console.log("submit sign up clicked")
    let signUpData = {
        password: $('#signup-password').val(),
        username: $('#signup-username').val(),
        email: $('#signup-email').val()
        // cleaner: $('#signup-cleaner').val()
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
            console.log(newUser.payload.user._id)
            localStorage.token = newUser.token
            localStorage.userId = newUser.payload.user._id
            localStorage.cleaner = newUser.payload.user.cleaner
            user = newUser.payload
            console.log(user)
            window.location.replace("/housingunit")
    }   
};

function submitLogin(e){
    e.preventDefault();
    console.log("LOGIN FORM SUBMITTED")
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
            console.log("sign in")
            if (json.token){
                localStorage.token = json.token;
                localStorage.cleaner = json.cleaner.cleaner
                localStorage.userId = json.uid.id
                checkForLogin();
                window.location.replace("/housingunit")
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
            // localStorage.userId = response.id
        }).fail(function (err) {
            console.log(err)
        })
    } else {
        console.log("no token")
        checkLocation()
    }
}
// id at signin user at signup

// http://localhost:3000
// This works on local host but not Heroku
function checkLocation(){
    if (window.location.href !== `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`) {
        window.location.href = "/"
    } else console.log("correct location")
}


// This works on Heroku but not local host
// function checkLocation(){
//     if (window.location.href !== `${window.location.protocol}//${window.location.hostname}/`) {
//         window.location.href = "/"
//     } else console.log("correct location")
// }




// https://gentle-fjord-24826.herokuapp.com/

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
    console.log(localStorage.userId)
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
        textAlerts: $('#userTextAlerts').val(),
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

function populateUserProfile(e) {
    console.log("Update User Profile with Data")
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
            console.log(`User Profile Data:`, user)

            let card1 = `
            <div class="ui card" data="${user[0]._id}">
            <div class="image">
              <img src="/images/defaultUserPic.svg">
              </div>
            <div class="content">
              <a class="header">${user[0].name}</a>
              <div class="meta">
                <span class="date">${user[0].username}</br> ${user[0].company}</span>
              </div>
              <div class="description">
                <p>About: ${user[0].about}</p>
                <h4 class="ui sub header">Contact</h4>
                <a><i class="building icon"></i>
                ${user[0].businessPhone}</a></br>
                <a><i class="phone icon"></i>${user[0].phone}</a></br>
                <a><i class="mobile alternate icon"></i>${user[0].cellPhone}</a></br>
                <a>${user[0].email}</a></br>
               <a>${user[0].hostAirbnbCalendar}</a>
              </div>
            </div>
            <div class="extra content">
              <a>
                <i class="car icon"></i>
                ${user[0].cleaningRadius} Miles
              </a>
              <a>
                <i class="mail icon"></i>
                Alerts ${user[0].emailAlerts}
              </a>
              <a>
                <i class="phone icon"></i>
                Alerts ${user[0].textAlerts}
              </a>
            </div>
          </div>
        `
        $('.userProfileWrapper').append(card1)
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
            `<section class="hUCardWrapper">
            <div class="ui items">
            <div class="item">
              <div class="ui small image">
                <img src="http://lorempixel.com/g/150/150/city">
              </div>
              <div class="middle aligned content">
                <div class="header">
                ${unit.address} 
                </div>
                <div class="description">
                <div data=${unit._id}>
                <div class="ui celled horizontal list">
                <div class="item">Square Footage: ${unit.sizeSqFt}</div>
                <div class="item">Rooms: ${unit.sizeRooms}</div>
                <div class="item">Beds: ${unit.sizeBeds}</div>
                <div class="item">Bathrooms: ${unit.sizeBathrooms}</div>
                <div class="item">Kithchen: ${unit.sizeKitchen}</div>
                </div>
                <div class="ui celled horizontal list">
                <div class="item">Unit Description: ${unit.unitDescription}</div>
                <div class="item">Airbnb: <a href="${unit.airbnbURL}" >Airbnb Unit</a></div>
                </div>
                <li>Special Requirements: ${unit.specialRequirements}</li>
                <li>Cleaning Tips: ${unit.cleanerTip}</li>
                <li>Host Tips: ${unit.hostTips}</li>
                </div>
                <div class="bottom aligned content extra">
                <button data-id=${unit._id} class="ui bottom aligned button teal  hideButtonCreateC">Create Cleaning Event</button>
                <button data-id=${unit._id} class="ui bottom aligned button teal updateHUModal hideButtonUpdateHU">Update Housing Unit</button>
                <button data-id=${unit._id} class="ui bottom aligned button teal createHUModal hideButtonCreateHU">Create Housing Unit</button>
                <button data-id=${unit._id} class="ui bottom aligned button teal deleteHousingUnitButton">Delete Housing Unit</button>
                </div>
            </div>
            </div>
            </div>
            </section>`
            $('.userHUWrapper').append(card1)
            })
    }   
};

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
            `<section class="cECardWrapper">
                <div class="ui items">
                    <div class="item">
                    <div class="middle aligned content">
                <div class="header">
                    ${cleaningEvent.title}  
                </div>
                <div class="description">
                <div data=${cleaningEvent._id}>
                  <div class="ui celled horizontal list">
                      <div class="item">Start: ${moment(cleaningEvent.start).add(8, 'hours').format("M-DD-YYYY h:mm a")}</div>
                      <div class="item">End: ${moment(cleaningEvent.end).add(8, 'hours').format("M-DD-YYYY h:mm a")}</div>  
                          </div></br>
                  <div class="ui celled horizontal list">
                      <div class="item">Guest Checkout: ${moment(cleaningEvent.guestCheckout).add(8, 'hours').format("MM-DD-YYYY  h:mm a")}</div>
                      <div class="item">Next Guest Checkin: ${moment(cleaningEvent.nextGuestCheckIn).add(8, 'hours').format   ("MM-DD-YYYY h:mm a")}</div>
                      </div></br> 
                  <div class="ui celled horizontal list">   
                      <div class="item">Cleaning Price: ${cleaningEvent.finalPriceCleaning}</div>
                      <div class="item">Paid: ${cleaningEvent.paid}</div>
                  </div></br>
                    <p>Address: ${cleaningEvent.address}</p>
                </div>
                <div class="bottom aligned content extra">
                    <button type="submit" data-id=${cleaningEvent._id} class="ui bottom aligned button teal     hideButtonUpdateCE">Update Cleaning Event</button>
                    <button data-id=${cleaningEvent._id} class="ui bottom aligned button teal deleteCleaningEventButton">Delete     Cleaning Event</button>
                    <button data-id=${cleaningEvent._id} class="ui bottom aligned button teal assignCleanerButton">Assign   Cleaner</button>
                    <button data-id=${cleaningEvent._id} class="ui bottom aligned button teal deleteCleanerButton">Delete   Cleaner</button>
                </div>              
                </div>
                    </div>
                </div>
            </section>`
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
}   

function createCleaningEvent(e){
    console.log("this is it")
    console.log(housingUnitId.id)
    testHUid = housingUnitId.id
    console.log("submit create cleaning event clicked")
    let signUpData = {
        housingUnit: housingUnitId.id,
        hostId: localStorage.userId,
        address: "",
        title: $('#cleaningEventTitle').val(),
        start: moment($('#cleaningEventStart').val()).subtract(8, 'hours').toISOString(),
        end: moment($('#cleaningEventEnd').val()).subtract(8, 'hours').toISOString(),
        url: $('#cleaningEventURL').val(),
        className: $('#cleaningEventClassName').val(),
        color: $('#cleaningEventColor').val(),
        backgroundColor: $('#cleaningEventBackgroundColor').val(),
        textColor: $('#cleaningEventTextColor').val(),
        description: $('#cleaningEventDescription').val(),
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
}

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
    let userId = localStorage.userId 
    $.ajax({
        method: 'GET',
        url: getUserUrl + userId,
        success: onSuccess,
        error: onError
    });
    function onError ( err ) {
    console.log( err );
    console.log("post error",err)
    }
    function onSuccess (user) {
    console.log(`Cleaning User added to Cleaning Event:`, user)
    $('#cleanerAssigned').html(`Cleaner: ${user[0].name}`)
    let cleanerUpdate = {
        _id: cleaningEventId.id,
        cleanerId: userId,
        title: `Cleaner Assigned ${user[0].name}, cell: ${user[0].cellPhone}, company: ${user[0].company}`,
        backgroundColor: "#549499"
    }
    console.log(cleanerUpdate)
    console.log("PATCH update cleaner")
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
    location.reload()
    }   
    }
}

function deleteCleanerCleaningEvent(){
    console.log("cleaner delete ajax")
    let cleanerUpdate = {
        _id: cleaningEventId.id,
        cleanerId: null,
        backgroundColor: "#ED6665",
        title: "Cancelation: Cleaner Needed"
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
        location.reload()
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
}

// NavBar
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});

// Sticky footer
$("#add").on("click", function() {
    $("<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>").appendTo(".page-wrap");
});
// Check on this
});

// Smooth scrool
let scrollLink = $('.scroll');

scrollLink.on('click', function(e){
    e.preventDefault();
    $('body,html').animate({
        scrollTop: $(this.hash).offset().top -10
    }, 1000)
})






