function listItems() {
    $('#ads').empty();
    showView('viewAds');
    $('#viewHome').show();
    
    $.ajax({
        method: 'GET',
        url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/listOfAdverts",
        headers: kinveyAdminAuth,
    }).then(loadAdsSuccess)
        .catch(handleAjaxError);
}

function loadAdsSuccess(adverts) {
    $('#ads').empty();
    if (adverts.length === 0) {
        $('#ads').css({
            "font-size": "xx-large",
            "padding": "10px"
        }).text('No adverts in the list.')
    } else {
        showInfo('Cars loaded.');
        let container = $('#ads');

        for (let advert of adverts) {
            appendCar(advert, container);
        }
    }
    function appendCar(advert, container) {
        let links = [];
        let readMoreLink = $('<a href="#">View car</a>')
            .click(displayAdvert.bind(this, advert._id));

        let ul = $('<ul>').append(
            $('<li>').append($('<img>').attr({src: advert.image, width: "120px", height: "120px"})),
            $('<li>').text(advert.make + " " + advert.model),
            $('<li>').text("Price: " + advert.price + " lv"),
            $('<li>').append(readMoreLink)
        );

        container.append(ul);
    }
}
//Delete
function deleteAdvert(advert) {
    let conf = confirm("Are you sure you want to delete this advert!");
    if(conf === true) {
        $.ajax({
            method: 'DELETE',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/listOfAdverts/' + advert._id,
            headers: getKinveyUserAuthHeaders()
        }).then(deleteAdvertSuccess)
            .catch(handleAjaxError);

        function deleteAdvertSuccess() {
            listItems();
            showInfo('Advert delete.')
        }
    }
}
//Create
function createAdvert(e) {
    e.preventDefault();
    let advertData = {
        make: $('#formCreateAd input[name=make]').val(),
        model: $('#formCreateAd input[name=model]').val(),
        km: $('#formCreateAd input[name=km]').val(),
        fuelType: $('#formCreateAd input[name=fuelType]').val(),
        datePublished: $('#formCreateAd input[name=datePublished]').val(),
        publisher: sessionStorage.getItem('username'),
        price: $('#formCreateAd input[name=price]').val(),
        image: $('#formCreateAd input[name=image]').val()
    };
    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/listOfAdverts',
        headers: getKinveyUserAuthHeaders(),
        data: advertData
    }).then(successCreateAdvert)
        .catch(handleAjaxError);

    function successCreateAdvert() {
        listItems();
        showInfo('Advert created.')
    }
}
//Edit
function loadAdvertForEdit(advert) {
    $('#formEditAd input[name=id]').val(advert._id);
    $('#formEditAd input[name=make]').val(advert.make);
    $('#formEditAd input[name=model]').val(advert.model);
    $('#formEditAd input[name=km]').val(advert.km);
    $('#formEditAd input[name=fuelType]').val(advert.fuelType);
    $('#formEditAd input[name=datePublished]').val(advert.datePublished);
    $('#formEditAd input[name=price]').val(advert.price);
    $('#formEditAd input[name=image]').val(advert.image);
    showView('viewEditAd');
}
function editAdvert(e) {
    e.preventDefault();
    let advertData = {
        make: $('#formEditAd input[name=make]').val(),
        model: $('#formEditAd input[name=model]').val(),
        km: $('#formEditAd input[name=km]').val(),
        fuelType: $('#formEditAd input[name=fuelType]').val(),
        datePublished: $('#formEditAd input[name=datePublished]').val(),
        publisher: sessionStorage.getItem('username'),
        price: $('#formEditAd input[name=price]').val(),
        image: $('#formEditAd input[name=image]').val(),
    };

    $.ajax({
        method: "PUT",
        url: kinveyBaseUrl + "appdata/" + kinveyAppId +
        "/listOfAdverts/" + $('#formEditAd input[name=id]').val(),
        data: advertData,
        headers: getKinveyUserAuthHeaders()
    }).then(editAdvertSuccess)
        .catch(handleAjaxError);

    function editAdvertSuccess() {
        listMyAds();
        showInfo('Advert edited.')
    }
}

function displayAdvert(advertId) {
    $.ajax({
        method: 'GET',
        url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/listOfAdverts/" + advertId,
        headers: kinveyAdminAuth,
    }).then(displayAdvertSuccess)
        .catch(handleAjaxError);

    $('#viewDetailsAd').empty();

    function displayAdvertSuccess(advert) {
        let table  = $('<table>');
        table.append(
            $("<tr>").append($("<th>").append($('<img>').attr({src: advert.image, width: "360px", height: "200px"}))),
            $("<tr>").append($("<td>").text('Price:')).append($("<td>").text(advert.price + " lv")),
            $("<tr>").append($("<td>").text('Car brand:')).append($("<td>").text(advert.make)),
            $("<tr>").append($("<td>").text('Model:')).append($("<td>").text(advert.model)),
            $("<tr>").append($("<td>").text('Km up to:')).append($("<td>").text(advert.km)),
            $("<tr>").append($("<td>").text('Fuel Type:')).append($("<td>").text(advert.fuelType)),
            $("<tr>").append($("<td>").text('Publisher:')).append($("<td>").text(advert.publisher)),
            $("<tr>").append($("<td>").text('Date:')).append($("<td>").text(advert.datePublished)));

        table.appendTo($('#viewDetailsAd'));
        showView('viewDetailsAd');
    }
}

function listMyAds() {
    $('#myAds').empty();
    showView('viewMyAds');

    $.ajax({
        method: 'GET',
        url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/listOfAdverts",
        headers: kinveyAdminAuth,
    }).then(loadMyAdsSuccess)
        .catch(handleAjaxError);

    function loadMyAdsSuccess(adverts) {
        $('#myAds').empty();
        let isHaveAds = false;

        let container = $('#myAds');
        for (let advert of adverts) {
            if (advert._acl.creator !== sessionStorage['userId']) {
                continue;
            }
            isHaveAds = true;
            appendCar(advert, container);
        }
        if (isHaveAds) {
            showInfo('Cars loaded.');
        } else {
            $('#myAds').css({
                "font-size": "xx-large",
                "padding": "10px"
            }).text('No adverts in the list.');
        }


        function appendCar(advert, container) {
            let deleteLink = $('<a href="#">Delete</a>')
                .click(deleteAdvert.bind(this, advert));
            let editLink = $('<a href="#">Edit</a>')
                .click(loadAdvertForEdit.bind(this, advert));
            let readMoreLink = $('<a href="#">View car</a>')
                .click(displayAdvert.bind(this, advert._id));
            let links = [deleteLink, ' ' , editLink, ' ', readMoreLink];

            let ul = $('<ul>').append(
                $('<li>').append($('<img>').attr({src: advert.image, width: "120px", height: "120px"})),
                $('<li>').text(advert.make + " " + advert.model),
                $('<li>').text("Price: " + advert.price + " lv"),
                $('<li>').append(links)
            );

            container.append(ul);
        }
    }
}