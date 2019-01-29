$(document).ready(function(){
    console.log("jQuery up and running");



let signUpUrl = '/users/signup'
let verifyUrl = '/verify'
let loginUrl = '/users/login'
let updateUserUrl = '/users/update'
let user ;
let loggedIn ;

checkForLogin()
$('.signUpForm').on('submit', submitSignup)
$('.signInForm').on('submit', submitLogin)
$('.logOut').on('click', handleLogout)

$('.updateUser').on('submit', updateUser)




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
    delete localStorage.token;
    user = null;
    checkForLogin();
}

function updateUser(e) {
    e.preventDefault();
    console.log("Update User Form Submit")
    let userUpdateData = {
        _id: "5c4b2f45679e003e8cc1d403",
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





});