
// returns xs, sm, md, lg - depending on screen size
OUApp.Helpers.getMQ = function () {
    return window.getComputedStyle(document.body,':after').getPropertyValue('content');
}


OUApp.Helpers.scrollPageTo = function (ele) {
    var eletop;
    if($(ele).length > 0) {
        eletop = $(ele).offset().top;
        $('html, body').animate({ scrollTop: eletop }, "slow");
    }
}

OUApp.Helpers.isIE7 = function() {
    if(navigator.appVersion.indexOf("MSIE 7.") !== -1) return true;
    return false;
}