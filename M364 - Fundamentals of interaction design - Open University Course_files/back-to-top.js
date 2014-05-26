// ----------------------------------------------------------
// OU.DigitalFramework.EEP.BackToTop
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// Written by Jaywing PLC
// Edited by Paul Liu
// paul.liu@open.ac.uk
// ----------------------------------------------------------
// v0.2
// Consuming the class via the OUApp.Modules.backToTop.init()
// ----------------------------------------------------------

window.OU = window.OU || {};

window.OU.DigitalFramework = window.OU.DigitalFramework || {};

(function ($, eep) {

    eep.BackToTopButton = function (options) {
        this.options = $.extend({}, eep.BackToTopButton.defaults, options);
        this.$backToTopButton = $(this.options.backToTopButtonSelector);
        this.$skipToContentLink = $(this.options.skipToContentLinkSelector);
        this.$mainContentArea = $(this.options.mainContentAreaSelector);
        this.$siteArea = $(this.options.siteAreaSelector);
        this.$window = $(window);
        this.mainContentTop = 0;
        this.init();
    };
    eep.BackToTopButton.prototype = {
        defaults: {
            siteAreaSelector: '#int-site',
            mainContentAreaSelector: '#int-content',
            skipToContentLinkSelector: '#int-skip-link',
            backToTopButtonSelector: '#int-btn-top'
        },
        init: function () {
            return this.enableBackToTop().enableSkipToMainContent();
        },
        scrollPageTo: function ($el) {
            if ($el.length > 0) {
                $('html, body').animate({ scrollTop: $el.offset().top }, "slow");
            }
        },
        checkScrollPosition: function () {
            if (this.$window.scrollTop() > this.mainContentTop) {
                this.$backToTopButton.addClass('scrollIn');
            } else {
                this.$backToTopButton.removeClass('scrollIn');
            }
            return this;
        },
        enableBackToTop: function () {
            var base = this;
            if (this.$mainContentArea.length > 0) {
                this.mainContentTop = this.$mainContentArea.offset().top;
            }

            this.$window.scroll(function () {
                base.checkScrollPosition();
            });

            this.$backToTopButton.click(function () {
                base.scrollPageTo(base.$siteArea);
            });

            return this;
        },
        enableSkipToMainContent: function () {
            var base = this;

            // scroll to content (skip link)
            this.$skipToContentLink.click(function () {
                base.scrollPageTo(base.$mainContentArea);
            });

            //http://terrillthompson.com/blog/161
            $("a[href^='#']").click(function () {
                $("#" + $(this).attr("href").slice(1) + "").focus(); // give that id focus (for browsers that didn't already do so)
            });
            this.$mainContentArea.attr('tabindex', '-1').css("outline", "0");
            this.$siteArea.attr('tabindex', '-1').css("outline", "0"); //Removes orange outline in chrome on focus.

            return this;
        }
    };
    eep.BackToTopButton.defaults = eep.BackToTopButton.prototype.defaults;

    //TODO Check for dependencies then remove below
    eep.helpers = eep.helpers || {};
    eep.helpers.scrollPageTo = function (ele) {
        var eletop;
        if ($(ele).length > 0) {
            eletop = $(ele).offset().top;
            $('html, body').animate({ scrollTop: eletop }, "slow");
        }
    };

    OUApp.Modules.backToTop = {

        mainContentTop: 0,

        checkScrollPosition: function () {
            var btn = $('#int-btn-top');

            if ($(window).scrollTop() > this.mainContentTop) {
                btn.addClass('scrollIn');
            } else {
                btn.removeClass('scrollIn');
            }
        },

        enableBackToTop: function () {
            var that = this;
            if ($('#int-content').length > 0) {
                this.mainContentTop = $('#int-content').offset().top;
            }

            $(window).scroll(function () {
                that.checkScrollPosition();
            });

            $('#int-btn-top a').click(function (e) {
                eep.helpers.scrollPageTo('#int-site');
            });

            // scroll to content (skip link)
            $('#int-skip-link').click(function (e) {
                eep.helpers.scrollPageTo('#int-content');
            });

            //http://terrillthompson.com/blog/161
            $("a[href^='#']").click(function () {
                $("#" + $(this).attr("href").slice(1) + "").focus(); // give that id focus (for browsers that didn't already do so)
            });
            $('#int-content').attr('tabindex', '-1').css("outline", "0");
            $('#int-page').attr('tabindex', '-1').css("outline", "0"); //Removes orange outline in chrome on focus.

        },

        init: function () {
            /*this.enableBackToTop();*/
            new eep.BackToTopButton();
        }

    };

})(jQuery, window.OU.DigitalFramework.EEP = window.OU.DigitalFramework.EEP || {});