//AJAX const
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppId = 'kid_Hyw7Sv-hl';
const kinveyAppSecret = 'e98c609b5cdf4d1195ba5a23086ba25d';
const kinveyAppAuthHeaders = {
    Authorization: 'Basic ' + btoa(kinveyAppId + ':' + kinveyAppSecret),
    contentType: 'application/json'
};
const kinveyAdminAuth = {
    Authorization: 'Basic ' + btoa("admin" + ':' + "admin"),
    contentType: 'application/json'
};

function loginUser(e) {
    e.preventDefault();
    let userData = {
        username: $('#formLogin input[name=username]').val(),
        password: $('#formLogin input[name=passwd]').val()
    };
    $.ajax({
        url: kinveyBaseUrl + 'user/' + kinveyAppId + '/login',
        method: 'POST',
        headers: kinveyAppAuthHeaders,
        data: userData
    }).then(loginSuccess)
        .catch(handleAjaxError);

    $('#formLogin input[name=username]').val('');
    $('#formLogin input[name=passwd]').val('');

    function loginSuccess(userInfo) {
        saveAuthInSession(userInfo);
        showMenuHideLinks();
        listItems();
        showInfo('Login successful.');
        $('#loggedInUser').css({
            "color": "white",
            "float": "right",
            "text-transform": "none",
            "margin-top": "25px"
        }).text('Welcome, ' + sessionStorage.getItem('username') + '!');
        $('#loggedInUser').show();
    }
}

function registerUser(e) {
    e.preventDefault();
    let password = $('#formRegister input[name=passwd]').val();
    let confirm = $('#formRegister input[name=confirm]').val();
    if (password !== confirm) {
        showError('Password mismatch!');
        return;
    }
    let userData = {
        username: $('#formRegister input[name=username]').val(),
        password: $('#formRegister input[name=passwd]').val()
    };
    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'user/' + kinveyAppId + '/',
        headers: kinveyAppAuthHeaders,
        data: userData
    }).then(registerSuccess)
        .catch(handleAjaxError);

    $('#formRegister input[name=username]').val('');
    $('#formRegister input[name=passwd]').val('');
    $('#formRegister input[name=confirm]').val('');

    function registerSuccess(userInfo) {
        saveAuthInSession(userInfo);
        showMenuHideLinks();
        listItems();
        showInfo('User registration successful.');
        $('#loggedInUser').text('Welcome, ' + sessionStorage.getItem('username') + '!');
        $('#loggedInUser').show();
    }
}

function logoutUser() {
    sessionStorage.clear();
    $('#loggedInUser').text('');
    showMenuHideLinks();
    // showView('viewHome');
    listItems();
    showInfo('Logout successful.');
}

function saveAuthInSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    $('#loggedInUser').text('Hello, ' + username + '!');
    $('#loggedInUser').show();
}

function getKinveyUserAuthHeaders() {
    return {
        Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
    };
}

