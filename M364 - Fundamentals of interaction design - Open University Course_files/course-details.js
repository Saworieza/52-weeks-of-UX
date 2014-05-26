// ----------------------------------------------------------
// OU.DigitalFramework.CourseDetails
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// Written by Jaywing PLC
// Rewritten by Paul Liu
// paul.liu@open.ac.uk
// ----------------------------------------------------------
// v0.2
// Fix for course sticky styling issue
// ----------------------------------------------------------


(function (jQuery, fix) {
    fix.toggleMenu = function (target) {
        $('#' + target).toggleClass('int-nav-open');
    };

    fix.enableMenuToggle = function (linkId, target) {
        $('#' + linkId).on('click', function (e) {
            e.preventDefault();
            fix.toggleMenu(target);
        });
    };
})(jQuery, window.fix = window.fix || {});

OUApp.Modules.course_details = {

    courseNav: {

        stickyNavTop: 0,

        stickyNav: function () {
            var $stickyInPage = $('.int-sticky-inpage');

            var scrollTop = $(window).scrollTop(); // check how far the window has scrolled

            if (scrollTop > this.stickyNavTop) { // check if sticky item is passed top of screen
                $stickyInPage.addClass('int-sticky');
            } else {
                $stickyInPage.removeClass('int-sticky');
            }
        },

        positionStickyNav: function () {
            var $stickyInPage = $('.int-sticky-inpage');

            if ($stickyInPage.length > 0) {
                $stickyInPage.removeClass('int-sticky'); // put sticky back in original position
                this.stickyNavTop = $stickyInPage.offset().top; // get top value of sticky item
                this.stickyNav();
            }
        },

        enableStickyNav: function () {
            var that = this;
            that.positionStickyNav();
            $(window)
                .scroll(function () { that.stickyNav(); }) // check nav pos on scroll
                .smartresize(function () { that.positionStickyNav(); }); // reposition nav when window resizes
            fix.enableMenuToggle('int-course-nav-toggle', 'int-course-nav'); // enable mobile nav toggle
            // set current active section title when it new tab is selected
            $('.int-sticky-inpage ul a').on('click', function (e) {
                $('#int-course-nav-toggle').find('.int-active-section').text($(this).text());
                fix.toggleMenu('int-course-nav'); // close the menu
            });
        },

        setStudyPlanPanelHeight: function () {
            var studyPlanTabs = $('#int-study-plan-tabs'),
                tabHeight = studyPlanTabs.height(),
                headHeight = studyPlanTabs.find('nav').height(),
                winHeight = $(window).height() - 30,
                targetTab = studyPlanTabs.find('.ui-tabs-active a').attr('href');

            if (tabHeight > winHeight) {
                $(targetTab).css('height', (winHeight - headHeight) + 'px');
            }

        },

        enableTabs: function () {
            var that = this,
            // enable tabs - jquery UI control
                courseTabs = $("#int-course-detail-tabs"),
                studyPlanTabs = $('#int-study-plan-tabs');

            courseTabs.tabs({
                activate: function (event, ui) {
                    // scroll page to top of tabs when a new tab is activated
                    OUApp.Helpers.scrollPageTo('#int-course-detail-tabs');
                }
            });

            studyPlanTabs.tabs({
                activate: function (event, ui) {
                    that.setStudyPlanPanelHeight();
                    OUApp.Modules.modal.positionModal('#int-study-plan');
                }
            });

            this.positionStickyNav();

            // enable other tab initializing links
            $('.loadTab').on('click', function (e) {
                e.preventDefault();
                var tab = $(this).attr('href'), // get target tabs
                    tabIndex = $('section', courseTabs).index($(tab)), // get tab index
                    activeTab = courseTabs.tabs("option", "active"); // get active tab index
                if (tabIndex !== activeTab) {
                    courseTabs.tabs("option", "active", tabIndex); // activate tab
                } else {
                    OUApp.Helpers.scrollPageTo('#int-course-detail-tabs');
                }
            });
        },

        init: function () {
            this.enableTabs();
            this.enableStickyNav();
        }
    },

    courseForms: {

        feesFundingItems: ['credits', 'degree', 'income', 'employed'], // array of form items

        hideFeesOption: function () {
            $('.int-fees-option').removeClass('int-fees-option-active');
        },

        showFeesOption: function () {
            this.hideFeesOption();
            $('#int-fees-option1').addClass('int-fees-option-active');
            OUApp.Helpers.scrollPageTo('#int-fees-option1');
        },

        setButtonState: function (btn, enabled) {
            var that = this,
                btn = $('#' + btn);

            if (enabled) {
                btn.removeAttr('disabled').removeClass('int-button-disabled');
                btn.on('click', function () {
                    that.showFeesOption();
                });
            } else {
                btn.attr('disabled', true);
            }
        },
        // validate form items
        checkFeesFundingForm: function () {
            var i,
                valid = true;
            for (i = 0; i < this.feesFundingItems.length; i = i + 1) {
                if (this.feesFundingItems[i] === "credits") { // credits is a selectbox
                    if ($('#' + this.feesFundingItems[i]).val() === "") {
                        valid = false;
                    }
                } else {
                    if ($('input[name=' + this.feesFundingItems[i] + ']:checked').length < 1) {
                        valid = false;
                    }
                }
            }
            this.setButtonState('int-btn-feesFunding', valid);
        },
        // validate form every time an item changes
        enableFeesFundingForm: function () {
            var that = this;
            $('#int-fees-funding-form input[type=radio], #int-fees-funding-form select').on('change', function () {
                that.checkFeesFundingForm();
            });
            this.setButtonState('int-btn-feesFunding', false);
        },

        init: function () {
            this.enableFeesFundingForm();
        }

    },

    init: function () {
        this.courseNav.init();
        this.courseForms.init();
    }

};