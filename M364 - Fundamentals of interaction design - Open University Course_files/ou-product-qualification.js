
     


    var pathname = window.location.pathname;

    var page_id = '';
    var site_tag = 'ou-df-ia-courses';


    // Courses - level 1
    page_id = ((pathname.indexOf("/courses") != -1) ? 'ou-page-courses' : page_id);

    // Courses - level 2
    page_id = ((pathname.indexOf("/courses/atoz") != -1) ? 'ou-page-courses-atoz' : page_id);
    page_id = ((pathname.indexOf("/courses/types") != -1) ? 'ou-page-courses-types' : page_id);
    page_id = ((pathname.indexOf("/courses/careers") != -1) ? 'ou-page-courses-careers' : page_id);
    page_id = ((pathname.indexOf("/courses/what-study-like") != -1) ? 'ou-page-courses-whatitslike' : page_id);
    page_id = ((pathname.indexOf("/courses/do-it") != -1) ? 'ou-page-courses-doit' : page_id);
    page_id = ((pathname.indexOf("/courses/fees-and-funding") != -1) ? 'ou-page-courses-fees' : page_id);
    page_id = ((pathname.indexOf("/courses/apply") != -1) ? 'ou-page-courses-apply' : page_id);

    // Courses - level 3 (Can i do it)
    page_id = ((pathname.indexOf("/courses/do-it/finding-time") != -1) ? 'ou-page-courses-doit-time' : page_id);
    page_id = ((pathname.indexOf("/courses/do-it/english-skills") != -1) ? 'ou-page-courses-doit-english' : page_id);
    page_id = ((pathname.indexOf("/courses/do-it/access") != -1) ? 'ou-page-courses-doit-access' : page_id);
    page_id = ((pathname.indexOf("/courses/do-it/computing-skills") != -1) ? 'ou-page-courses-doit-computing' : page_id);
    page_id = ((pathname.indexOf("/courses/do-it/disability") != -1) ? 'ou-page-courses-doit-disability' : page_id);

    // Courses - level 3 (What its like to study)
    page_id = ((pathname.indexOf("/courses/what-study-like/distance-learning") != -1) ? 'ou-page-courses-whatitslike-distance' : page_id);
    page_id = ((pathname.indexOf("/courses/what-study-like/tutor-support") != -1) ? 'ou-page-courses-whatitslike-tutor' : page_id);
    page_id = ((pathname.indexOf("/courses/what-study-like/learning-resources") != -1) ? 'ou-page-courses-whatitslike-resources' : page_id);
    page_id = ((pathname.indexOf("/courses/what-study-like/community") != -1) ? 'ou-page-courses-whatitslike-community' : page_id);

    // Courses - level 3 (Course types)
    page_id = ((pathname.indexOf("/courses/degrees") != -1) ? 'ou-page-courses-types-honours' : page_id);
    page_id = ((pathname.indexOf("/courses/foundation-degrees") != -1) ? 'ou-page-courses-types-foundation' : page_id);
    page_id = ((pathname.indexOf("/courses/modules") != -1) ? 'ou-page-courses-types-modules' : page_id);
    page_id = ((pathname.indexOf("/courses/modules/") != -1) ? 'ou-page-courses' : page_id);
    page_id = ((pathname.indexOf("/courses/diplomas-he") != -1) ? 'ou-page-courses-types-diplomas-he' : page_id);
    page_id = ((pathname.indexOf("/courses/certificates-he") != -1) ? 'ou-page-courses-types-certificates-he' : page_id);
    page_id = ((pathname.indexOf("/courses/short-courses") != -1) ? 'ou-page-courses-types-short' : page_id);
    page_id = ((pathname.indexOf("/courses/short-courses/") != -1) ? 'ou-page-courses' : page_id);
    page_id = ((pathname.indexOf("/courses/diplomas-ou") != -1) ? 'ou-page-courses-types-diplomas-ou' : page_id);
    page_id = ((pathname.indexOf("/courses/all") != -1) ? 'ou-page-courses-types-courses' : page_id);
    page_id = ((pathname.indexOf("/courses/certificates-ou") != -1) ? 'ou-page-courses-certificates-ou' : page_id);

    // Courses - level 3 (Careers)
    page_id = ((pathname.indexOf("/courses/careers/counselling") != -1) ? 'ou-page-courses-careers-counselling' : page_id);
    page_id = ((pathname.indexOf("/courses/careers/psychology") != -1) ? 'ou-page-courses-careers-psychology' : page_id);
    page_id = ((pathname.indexOf("/courses/careers/teaching") != -1) ? 'ou-page-courses-careers-teaching' : page_id);
    page_id = ((pathname.indexOf("/courses/careers/working-with-children") != -1) ? 'ou-page-courses-careers-children' : page_id);
    page_id = ((pathname.indexOf("/courses/careers/social-work") != -1) ? 'ou-page-courses-careers-social' : page_id);
    page_id = ((pathname.indexOf("/courses/careers/management") != -1) ? 'ou-page-courses-careers-management' : page_id);
       

    // Update the body class with the navigation level required.
    $('body').attr('data-page-id', page_id);


   

    // Fallback 'back button' processing for short module page
    // when no calling qualification code exists, ie called from the Access page.
    $('.returnToCaller').click(function (e) {

        // Temporarily prevent the click from firing.
        e.preventDefault();

        window.history.back();

    });



    /// **********************************************************************
    ///
    /// DAX event calls for Qualification page.
    ///
    /// **********************************************************************

    // Extract the qualification code.
    var qualificationCode = $('.product-award-code-identifier').html();

    if (typeof qualificationCode !== 'undefined') {


        if (qualificationCode.length > 2) {

           
            var sPageName = pgNameForCOMSCORE();
            var TrackedObject = $(this);

            // Grab the active tab.
            var selectedTab = $('.ui-tabs-active').text();

            // Decode to DAX name.
            var refer = '&ou_ev_as=' + TabIdentifier($('.ui-tabs-active').text());

            // Build up the tracking string.
            var s = 'ns_type=hidden&category=qualification&ou_ev_ty=navigation&ou_ev_ac=page-load&ou_ev_mt=auto&ou_ev_pl=tab-menu' + refer + '&ou_ev_refas=none&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode;

            // Call the common tracker function.
            EEP_Dax_tracker(sPageName, TrackedObject, s);
        }
    }


    // QUAL REGISTER button tracking. (20419-003)
    $('a.product-qual-register').click(function (e) {

        // Temporarily prevent the click from firing.
        e.preventDefault();

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Log where the click was heading..
        var targetURL = TrackedObject.attr('href');

        // Extract the qualification code.
        var qualificationCode = $('.product-award-code-identifier').html();

        // Decode to DAX name.
        var refer = '&ou_ev_refas=' + TabIdentifier($('.ui-tabs-active').text());

        // Build up the tracking string.
        var s = 'ns_type=hidden&category=qualification&ou_ev_ty=navigation&ou_ev_ac=off-page&ou_ev_mt=button&ou_ev_pl=register-cta&ou_ev_as=register-now' + refer + '&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode;

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);

    });

    // QUAL REQUEST A PROSPECTUS button tracking. (20419-005)
    $('a.product-qual-prospectus-request').click(function (e) {

        // Temporarily prevent the click from firing.
        e.preventDefault();

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Log where the click was heading..
        var targetURL = TrackedObject.attr('href');

        // Extract the qualification code.
        var qualificationCode = $('.product-award-code-identifier').html();


        // Decode to DAX name.
        var refer = '&ou_ev_refas=' + TabIdentifier($('.ui-tabs-active').text());


        // Build up the tracking string.
        var s = 'ns_type=hidden&category=qualification&ou_ev_ty=navigation&ou_ev_ac=off-page&ou_ev_mt=button&ou_ev_pl=prospectus-cta&ou_ev_as=request-prospectus' + refer + '&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode + '&ou_mod=';

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);

    });


    // QUAL Page - infographic... (20421-01)
    $('a.qual-infographic').click(function (e) {

        // Temporarily prevent the click from firing.
        e.preventDefault();

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Log where the click was heading..
        var targetURL = TrackedObject.attr('href');

        // Extract the qualification code.
        var qualificationCode = $('.product-award-code-identifier').html();


        // Build up the tracking string.
        var s = 'ns_type=hidden&category=qualification&ou_ev_ty=info-display&ou_ev_ac=on-page&ou_ev_mt=button&ou_ev_pl=details&ou_ev_as=infographic&ou_ev_refas=none&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode;

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);

    });


    // QUAL Tab Navigation - record navigation between tabs (20419-002)
    $('a.qual-tab-click').click(function (e) {

        // Temporarily prevent the click from firing.
        e.preventDefault();

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Log where the click was heading..
        var targetURL = TrackedObject.attr('href');

        // Extract the qualification code.
        var qualificationCode = $('.product-award-code-identifier').html();

        // Decode to DAX name.
        var tab_from = '&ou_ev_refas=' + TabIdentifier($('.ui-tabs-active').text());
        var tab_to = '&ou_ev_as=' + TabIdentifier(TrackedObject.text());


        // Build up the tracking string.
        var s = 'ns_type=hidden&category=qualification&ou_ev_ty=navigation&ou_ev_ac=on-page&ou_ev_mt=click&ou_ev_pl=tab-menu' + tab_to + tab_from + '&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode;


        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);

    });


    // QUAL Registration Start date dropdown (20419-004)
    $('.product-qual-registration-tracker').on('change', function (e) {

        //var optionSelected = $("option:selected", this);
        //var valueSelected = this.value;

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Extract the qualification code.
        var qualificationCode = $('.product-award-code-identifier').html();

        // Decode to DAX name.
        var refer = '&ou_ev_refas=' + TabIdentifier($('.ui-tabs-active').text());


        var s = 'ns_type=hidden&category=qualification&ou_ev_ty=data-display&ou_ev_ac=on-page&ou_ev_mt=dropdown&ou_ev_pl=register-cta&ou_ev_as=registration-start' + refer + '&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode;

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

    });


    // Qual KIS Widget (20421-03)
    $('.widgetCompareButton').click(function (e) {

        // Temporarily prevent the click from firing.
        e.preventDefault();

        alert('hi');

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Log where the click was heading..
        var targetURL = TrackedObject.attr('href');

        // Extract the qualification code.
        var qualificationCode = $('.product-award-code-identifier').html();


        // Build up the tracking string.
        var s = 'ns_type=hidden&category=qualification&ou_ev_ty=navigation&ou_ev_ac=off-site&ou_ev_mt=link&ou_ev_pl=details&ou_ev_as=kis-widget&ou_ev_refas=none&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode;

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);


    });


    // Qual Am I ready - Access module reveal. (20422-01 - open) and (20422-02 - close)
    $('.product-qual-access-modules').on('click', function (e) {

        e.preventDefault();

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        var revealState;

        if ($(this).parent().attr('class').toLowerCase().indexOf('int-active') >= 0) {
            revealState = "reveal-close";
        } else {
            revealState = "reveal-open";
        }

        // Extract the qualification code.
        var qualificationCode = $('.product-award-code-identifier').html();

        // Extract the module code
        var moduleCode = TrackedObject.parent().find('.product-module-code-identifier').html();


        // Build up the tracking string.
        var s = 'ns_type=hidden&category=qualification&ou_ev_ty=navigation&ou_ev_ac=on-page&ou_ev_mt=click&ou_ev_pl=access&ou_ev_as=' + revealState + '&ou_ev_refas=none&ou_ev_val=none&ou_ev_msg=none&ou_qual=' + qualificationCode + '&ou_mod=' + moduleCode;

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);

        //$(this).parent().toggleClass('int-active');

    });







    /// **********************************************************************
    ///
    /// Helper routines for DAXtracking calls....
    ///
    /// **********************************************************************

    // Returns the DAX tab name based on the current active tab.
    function TabIdentifier(currTab) {

        var tabName;
        if (currTab.toLowerCase().indexOf('course details') >= 0) {
            tabName = 'details';
        }
        else if (currTab.toLowerCase().indexOf('am i ready?') >= 0) {
            tabName = 'ready';
        }
        else if (currTab.toLowerCase().indexOf('fees & funding') >= 0) {
            tabName = 'fees';
        }
        else if (currTab.toLowerCase().indexOf('careers') >= 0) {
            tabName = 'careers';
        }
        else if (currTab.toLowerCase().indexOf('explore the subject') >= 0) {
            tabName = 'explore';
        } else {
            tabName = 'unknown';
        }

        return tabName;

    }

    function EEPQualRegistrationLink(targetURL) {
        window.location = targetURL;
    }

    // Takes the current pagename url and formats it into a 
    // format suitable for DAX page tracking..
    function pgNameForCOMSCORE() {

        var sPageName = window.location.pathname;

        /* Tidy up the page name.      */
        sPageName = sPageName.replace('/courses/', 'courses.');
        sPageName = sPageName.replace(/\//g, '.');
        sPageName = sPageName.replace('.htm', '');

        return sPageName;
    }

    // Fires off the packaged tracking event to the OU common DAX call.
    function EEP_Dax_tracker(pg, TrackedObject, s) {

        if (pg.length == 0) return;

        // Calls common OU code to register tracking call. (Function implemented in OU_Header.js ?)
        ouClickEvent(TrackedObject, s);
    }
    
    // Opens a new tab displaying course information.
    $('.course-reveal').click(function () {

        // Extract the title and the description  from the title attribute of the span.
        var TitleAndDesc = $(this).find('#long_description').html();
        //var trackingData = $(this).find('.course-reveal-tracking').html();


        // Did we manage to extract anything ?
        if (TitleAndDesc.length > 0) {

            // Split it based on the divider that we've used.
            var parts = TitleAndDesc.split("::");
            var moduleCode = parts[0];
            var moduleSummaryURL = "/courses/overlays/product-module-short.aspx?pid=" + moduleCode;

            // Open the module overlay page - preferrably in a new tab.
            var win = window.open(moduleSummaryURL, '_blank');
            //var win = window.open(moduleSummaryURL, '', "width=700,height=900");
            win.focus();


            //var html = "<div class='int-modal-window'>"; 
            //    html += "<div class='interaction' style='height:600px;'>";
            //    html += "<h1>" + parts[0] + "</h1>" + parts[1] + parts[2] + parts[3] + parts[4] + parts[5];
            //    html += "<button id='dialog-close-button' class='int-button'>Close</button>";
            //    html += "</div>";
            //    html += "</div>";

            //    html += "<div class='int-overlay'></div>";


            //var newWin = open("", 'windowName', 'height=800,width=800');
            //newWin.document.write(html);


            // Add the html to the screen...
            //    $('body').append($(html));          


            //    $('#dialog-close-button').click(function(){
            //        $('.int-modal-window').remove();
            //        $('.int-overlay').remove();
            //    });

            /*$('.int-modal-window').dialog({ autoOpen: false,  }); 
      
            $('.int-modal-window').dialog({ buttons: [
                {
                  text: "OK",
                  click: function() {
                    $( this ).dialog( "close" );
                  }
                }
              ] 
            });

      
            $('.int-modal-window').dialog('open');*/

        }

        // prevent the default action, e.g., following a link
        return false;

    });
    
    // Handles the updating of buttons / credit transfer dates / financial support dates
    // when the user chooses a  new value from the drop down list.
    jQuery('#product-qual-registration').change(function () {

        // Extract the title and the description  from the title attribute of the span.
        var MOPIselected = jQuery(this).find(":selected").val();

        // Remove the 'selected' class from all credit transfer rows...
        jQuery('.credit-transfer-display').removeClass('credit-transfer-display').addClass('credit-transfer-hide');

        // Add the display class to the corresponding credit transfer text associated with the selected MOPI.
        jQuery("div[id='MOPI-" + MOPIselected + "']").removeClass('credit-transfer-hide').addClass('credit-transfer-display');


        // prevent the default action, e.g., following a link
        return false;

    });
    
    // Reveals a tooltip around the 'credits' information on a qual facts box.
    $(".qualCreditsIcon").click(function (e) {

        var courseTooltip = $(".qualCreditsTooltip");

        courseTooltip.css('z-index', 1001);
        courseTooltip.show().position({
            my: "left+40 top",
            at: "top-20",
            of: this,
            collision: "fit"
        });
        return false;
    });

    // Closes a tooltip around the 'credits' information on a qual facts box.
    $(".qualCreditsTooltipCloseIcon").click(function (e) {
        $(this).parent().parent().hide();
        return false;
    });
    
    // MODULE REQUEST A PROSPECTUS button tracking.
    $('a.product-module-prospectus-request').click(function (e) {
        // Temporarily prevent the click from firing.
        e.preventDefault();

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Log where the click was heading..
        var targetURL = TrackedObject.attr('href');
        // Extract the qualification code.
        var moduleCode = $('.product-module-code-identifier').html();

        var activeTab = $('.ui-tabs-active').text();

        var refer;
        if (activeTab == 'Module details') {
            refer = '&ou_ev_refas=details';
        }
        else if (activeTab == 'Am I ready?') {
            refer = '&ou_ev_refas=ready';
        }
        else if (activeTab == 'Module registration') {
            refer = '&ou_ev_refas=registration';
        }
        else if (activeTab == 'Study materials') {
            refer = '&ou_ev_refas=materials';
        }

        // Build up the tracking string.
        var s = 'ns_type=hidden&category=module&ou_ev_ty=navigation&ou_ev_ac=off-page&ou_ev_mt=button&ou_ev_pl=prospectus-cta&ou_ev_as=request-prospectus' + refer + '&ou_ev_val=none&ou_ev_msg=none&ou_mod=' + moduleCode;

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);

    });
    
    // MODULE navigation between tabs tracking.
    $('a.tab-click').click(function (e) {
        // Temporarily prevent the click from firing.
        e.preventDefault();

        var TrackedObject = $(this);

        var sPageName = pgNameForCOMSCORE();

        // Log where the click was heading..
        var targetURL = TrackedObject.attr('href');
        // Extract the qualification code.
        var moduleCode = $('.product-module-code-identifier').html();

        var previousTab = $('.ui-tabs-active').text();

        var refer;
        if (previousTab == 'Module details') {
            refer = '&ou_ev_refas=details';
        }
        else if (previousTab == 'Am I ready?') {
            refer = '&ou_ev_refas=ready';
        }
        else if (previousTab == 'Module registration') {
            refer = '&ou_ev_refas=registration';
        }
        else if (previousTab == 'Study materials') {
            refer = '&ou_ev_refas=materials';
        }


        var selectedTab = $(this).text();

        var newTab;
        if (selectedTab == 'Module details') {
            newTab = '&&ou_ev_as=details';
        }
        else if (selectedTab == 'Am I ready?') {
            newTab = '&ou_ev_as=ready';
        }
        else if (selectedTab == 'Module registration') {
            newTab = '&ou_ev_as=registration';
        }
        else if (selectedTab == 'Study materials') {
            newTab = '&ou_ev_as=materials';
        }

        // Build up the tracking string.
        var s = 'ns_type=hidden&category=module&ou_ev_ty=navigation&ou_ev_ac=on-page&ou_ev_mt=click&ou_ev_pl=tab-menu' + newTab + refer + '&ou_ev_val=none&ou_ev_msg=none&ou_mod=' + moduleCode;

        // Call the common tracker function.
        EEP_Dax_tracker(sPageName, TrackedObject, s);

        // Delay the redirect a second..then send control to the original place the click event was heading.
        window.setTimeout(function () { EEPQualRegistrationLink(targetURL); }, 1000);

    });
    

    // Module Page Loaded tracking (20429-001)
    if ($('#divModuleCode').css("visibility") == "hidden") {

        var moduleCode = $('.product-module-code-identifier').html();

        if (moduleCode.length > 2) {

            var sPageName = pgNameForCOMSCORE();
            var TrackedObject = $(this);

            // Grab the active tab.
            var selectedTab = $('.ui-tabs-active').text();

            // Decode to DAX name.
            //var refer = '&ou_ev_as=' + TabIdentifier($('.ui-tabs-active').text());

            var refer;
            if (selectedTab == 'Module details') {
                refer = '&ou_ev_as=details';
            }
            else if (selectedTab == 'Am I ready?') {
                refer = '&ou_ev_as=ready';
            }
            else if (selectedTab == 'Module registration') {
                refer = '&ou_ev_as=registration';
            }
            else if (selectedTab == 'Study materials') {
                refer = '&ou_ev_as=materials';
            }

            // Build up the tracking string.
            var s = 'ns_type=hidden&category=module&ou_ev_ty=navigation&ou_ev_ac=page-load&ou_ev_mt=auto&ou_ev_pl=tab-menu' + refer + '&ou_ev_refas=none&ou_ev_val=none&ou_ev_msg=none&ou_mod=' + moduleCode;

            // Call the common tracker function.
            EEP_Dax_tracker(sPageName, TrackedObject, s);
        }
    }
