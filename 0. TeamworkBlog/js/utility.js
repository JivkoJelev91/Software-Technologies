function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0) {
        errorMsg = "Cannot connect due to network error.";
    } else if (response.responseJSON &&
        response.responseJSON.model) {
        errorMsg = response.responseJSON.model;
    } else {
        errorMsg = response.status + ' (' + response.statusText + ')';
    }
    showError(errorMsg);
}

function showError(errorMsg) {
    $('#errorBox').text("Error: " + errorMsg);
    $('#errorBox').show(function () {
        setTimeout(function () {
            $('#errorBox').fadeOut()
        },3500)
    });
}

function showInfo(message) {
    $('#infoBox').text(message);
    $('#infoBox').show();
    setTimeout(function () {
        $('#infoBox').fadeOut()
    }, 3500)
}