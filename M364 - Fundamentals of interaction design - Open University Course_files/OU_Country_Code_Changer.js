function invokeCountryCodePopup() {
    CountryCodeCookieManager.RemoveCookie();
    location.reload();
}

jQuery(document).ready(function() {
    jQuery('.change-country-link').on('click', function(e) {
        invokeCountryCodePopup();
        e.preventDefault();
        return false;
    });
});
