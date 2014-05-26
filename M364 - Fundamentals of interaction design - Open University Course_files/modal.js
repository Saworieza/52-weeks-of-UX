// ----------------------------------------------------------
// OU.DigitalFramework.EEP.Modal
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// Written by Jaywing PLC
// Edited by Paul Liu
// paul.liu@open.ac.uk
// ----------------------------------------------------------
// v0.2
// Remove set timeout for close button to appear
// ----------------------------------------------------------

OUApp.Modules.modal = {

    opener: null,

    positionModal: function (target) {
        var modal = $(target),
            modalH = 0,
            modalW = 0,
            winH = $(window).height(),
            winW = $(document).width(),
            modalLeft,
            modalTop = 15,
            isOpen = modal.hasClass('int-active');
        if (modal) {
            // if modal is not active, quickly activate is to get dimensions
            if (!isOpen) {
                modal.addClass('int-active');
            }
            modalH = modal.find('.int-modal-inner').height();
            modalW = modal.width();
            if (!isOpen) {
                modal.removeClass('int-active');
            }
            // position modal in the centre of the screen
            modalLeft = ((winW - modalW) / 2) + 'px';
            if (modalH < winH) {
                modalTop = ((winH - modalH) / 2) + 'px';
                modal.css('position', 'fixed');
            } else {
                // if modal is taller than the screen set position to absolute allow user to scroll
                if (target !== "#int-study-plan") {
                    modal.css('position', 'fixed').css('height', (winH - (modalTop * 2)) + 'px')
                        .find('.interaction').css('padding-top', '15px')
                        .find('.int-modal-inner').css('height', (winH - (modalTop * 3)) + 'px')
                        .css('overflow-y', 'scroll')
                        .css('webkit-overflow-scroll', 'scroll');
                    modal.css('bottom', modalTop);
                }
            }
            modal.css('top', modalTop).css('left', modalLeft);
        }
    },

    closeModal: function (e) {
        var that = this;
        e.preventDefault();
        // prepare modal for close animation
        $('.int-modal-window.int-active .interaction').css('overflow', 'hidden')
            .removeAttr('tabindex')
            .find('.int-btn-close').css('visibility', 'hidden');
        // close modal and remove close event listeners
        $('.int-modal-window.int-active').removeClass('int-active')
            .find('.int-btn-close').off('click', this.closeModal);
        $('.int-overlay.int-active').off('click', this.closeModal);
        // after modal close animation, close overlay
        setTimeout(function () {
            $('.int-overlay.int-active').removeClass('int-active');
            OUApp.Modules.modal.opener.focus();
            OUApp.Modules.modal.opener = null;
        }, 300);
    },

    openModal: function (target) {
        this.positionModal(target);
        // activate overlay
        $('.int-overlay').addClass('int-active');
        // when overlay animation is done open modal
        setTimeout(function () {
            $(target).addClass('int-active');
            // when modal animation is done, show close btn
            setTimeout(function () {
                $(target + ' .interaction').css('overflow', 'visible')
                    .find('.int-btn-close').css('visibility', 'visible');
                if (target === "#int-study-plan") {
                    OUApp.Modules.course_details.courseNav.setStudyPlanPanelHeight();
                }
            }, 0);
        }, 300);
        // set modal close events
        $('.int-overlay.int-active').on('click', this.closeModal);
        $(target).find('.int-btn-close').on('click', this.closeModal);

        setTimeout(function () {
            $(":tabbable", $(target))[0].focus();
        }, 750);
    },

    enableModalLinks: function () {
        var that = this;
        $('.int-open-modal').on('click', function (e) {
            e.preventDefault();
            var target = "#" + $(this).attr('href').split('#')[1];
            OUApp.Modules.modal.opener = $(this);
            that.openModal(target);
        });
    },

    positionModalAlt: function (maxWidth) {
        var $modal = $(id);
        var sizeMultiplier = 0.85;
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
    },

    configureModal: function (id, cancelButtonText, actionButtons, dialogWidth, dialogHeight, undefined) {
        var $modal = $(id),
            paddingHeight = 15,
            maxWidth = $modal.css('max-width').split('px')[0];

        $modal.dialog({
            autoOpen: true,
            modal: true,
            resizable: false,
            draggable: true,
            width: maxWidth,
            height: dialogHeight,
            zIndex: 999999
        });

        $modal.dialog("open");
        var dialogContentHeight = $modal.height(),
            $tabs = $('.int-navPills', $modal),
            tabHeight = 0;

        if ($tabs.length) {
            tabHeight = $tabs.height();
        }
        //$modal.dialog("close");

        $(window).smartresize(function () {
            var sizeMultiplier = 0.55;
            var width = $(this).width() * sizeMultiplier;
            var height = $modal.height() * sizeMultiplier;
            var contentHeight = $modal.height();
            var $tabs = $('.int-navPills', $modal);
            var tabHeight = 0;

            if ($tabs.length) {
                tabHeight = $tabs.height();
            }
            $modal.dialog('option', 'width', width);
            $modal.dialog('option', 'height', height);
            $('.int-dialogContent', $modal).height(contentHeight - paddingHeight - tabHeight);
            $modal.dialog('option', 'position', $modal.dialog('option', 'position'));
        });

        $('.int-dialogContent', $modal).height(dialogContentHeight - paddingHeight - tabHeight);
        $(".int-dialogWrap", $modal).height(dialogContentHeight - tabHeight);
    },

    configureResponsiveModal: function (id, cancelButtonText, actionButtons, undefined) {
        var $modal = $(id);
        var sizeMultiplier = 0.85;
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var dialogWidth = windowWidth * sizeMultiplier;
        var dialogHeight = windowHeight * sizeMultiplier;

        this.configureModal(id, cancelButtonText, actionButtons, dialogWidth, dialogHeight, undefined);

        $(window).smartresize(function () {
            var width = $(this).width() * sizeMultiplier;
            var height = $(this).height() * sizeMultiplier;
            var contentHeight = $modal.height();
            var $tabs = $('.int-navPills', $modal);
            var tabHeight = 0;
            if ($tabs.length) {
                tabHeight = $tabs.height();
            }
            $modal.dialog('option', 'width', width);
            $modal.dialog('option', 'height', height);
            $('.int-dialogContent', $modal).height(contentHeight - paddingHeight - tabHeight);
            $modal.dialog('option', 'position', $modal.dialog('option', 'position'));
        });
    },

    init: function () {
        var that = this;
        this.enableModalLinks();
        /* reposition modal window when the window resizes */
        $(window).smartresize(function () {
            if ($('.int-modal-window.int-active').length > 0) {
                that.positionModal('#' + $('.int-modal-window.int-active').attr('id'));
            }
        });
    }
};