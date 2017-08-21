function startApp() {
    // sessionStorage.clear(); // Logout user after refresh web page
    showMenuHideLinks();
    listItems();

    if (sessionStorage.getItem('username')) {
        $('#loggedInUser').text('Welcome, ' + sessionStorage.getItem('username') + '!');
        $('#loggedInUser').show();
    }

    $('#infoBox, #errorBox').click(function () {
        $(this).fadeOut();
    });

    $(document).on({
        ajaxStart: () => {$('#loadingBox').show()},
        ajaxStop: () => {$('#loadingBox').hide()}
    });

    // Bind the navigation menu links
    $('#linkHome').click(showHomeView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkListAds').click(function () {
        listItems();
        $('#viewHome').hide();
    });
    $('#linkCreateAd').click(showCreateAdView);
    $('#linkMyAds').click(listMyAds);
    $('#linkLogout').click(logoutUser);

    // Bind the form submit buttons
    $('#formLogin').submit(loginUser);
    $('#formRegister').submit(registerUser);
    $('#formCreateAd').submit(createAdvert);
    $('#viewEditAd').submit(editAdvert);
}