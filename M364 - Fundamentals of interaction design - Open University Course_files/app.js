/*******************************************

    App

*******************************************/

(function () {
    
    "use strict";

    var OUApp = {

        Modules: {},

        Helpers: {},
        
        Browser: {},

        init: function () {
            var x;
            for (x in OUApp.Modules) {
                if (OUApp.Modules.hasOwnProperty(x)) {
                    OUApp.Modules[x].init();
                }
            }
            
            // Crossbrowser fallbacks
            $('input, textarea').placeholder();
            
            //$(window).smartresize(function () { console.log(OUApp.Helpers.getMQ()); });
            
            if (document.location.hash) {
                var myAnchor = document.location.hash;
                $(myAnchor).attr('tabindex', -1).on('blur focusout', function () {
                    $(this).removeAttr('tabindex');
                }).focus();
            }
            
            
        }

    };
    
    window.OUApp = OUApp;
    
}());