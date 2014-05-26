// ----------------------------------------------------------
// OU.Widgets
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// Written by Paul Liu
// paul.liu@open.ac.uk
// ----------------------------------------------------------
// v2.1.13
// Change browser/IE check to a function instead of an immediately invoked function
// ----------------------------------------------------------

var OU = OU || {};

//Helper jQuery Plugins
(function ($) {
    $.extend($.expr[":"], {
        "containsIN": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
    $.fn.doesExist = function () {
        return $(this).length > 0;
    };
    $.fn.togglefn = function (a, b) {
        return this.each(function () {
            var clicked = false;
            $(this).click(function () {
                if (clicked) {
                    clicked = false;
                    return b.apply(this, arguments);
                }
                clicked = true;
                return a.apply(this, arguments);
            });
        });
    };
    $.fn.alert = function (options) {
        options = $.extend({}, $.fn.alert.defaults, options);

        return this.each(function () {
            var $this = $(this),
                $alertDiv = $('<div class="int-alert" role="alert" aria-live="polite"></div>');

            $this.empty();
            if (options !== false) {
                $alertDiv.toggleClass("int-alertSticky", options.sticky);
                if (options.level !== "") {
                    $alertDiv.addClass("int-" + options.level);
                }

                if (options.level !== "error") {
                    $alertDiv.append('<a class="int-alertRemove" href="#" title="remove alert" role="button"><i class="int-icon-remove" role="presentation"></i></a>');
                }

                if (options.title !== "") {
                    $alertDiv.append('<strong>' + options.title + '</strong> ');
                }

                $alertDiv.append(options.text);
                $this.append($alertDiv);
            }
        });
    };
    $.fn.alert.defaults = {
        level: '',
        sticky: false,
        title: '',
        text: ''
    };
})(jQuery);

//Widget Classes
(function ($, widgets, window, document, undefined) {

    widgets.version = 'OU.Widgets | v2.1.13';

    String.prototype.classify = function () {
        return '.' + this;
    };
    String.prototype.idfy = function () {
        return '#' + this;
    };

    widgets.helpers = {
        setTristate: function ($master, noneChecked, allChecked) {
            if (noneChecked) {
                $master.prop({
                    indeterminate: false,
                    checked: false
                }).attr('aria-checked', false);
            }
            else if (allChecked) {
                $master.prop({
                    indeterminate: false,
                    checked: true
                }).attr('aria-checked', true)
            }
            else {
                $master.prop({
                    indeterminate: true,    //Visually, this is indeterminate, but actually, the checked state is false
                    checked: false          //this is false because if some are checked not all are checked so the check all cannot be checked. PL
                }).attr('aria-checked', 'mixed');
            }
        },
        hasPlaceholderSupport: (function () {
            var input = document.createElement('input');
            return ('placeholder' in input);
        })(),
        aria: {
            hidden: function ($el) {
                var isHidden = $el.is(':hidden');

                $el.attr('aria-hidden', isHidden).attr('aria-expanded', !isHidden);
            },
            checked: function ($el) {
                var state;
                if ($el.prop('indeterminate')) {
                    state = 'mixed';
                } else {
                    state = $el.prop('checked');
                }
                $el.attr('aria-checked', state);
            }
        },
        fixes: {
            jQueryUIHelper: {
                scrolledOutOfView: function ($input) {
                    var inputPosition = $input.position();

                    return (inputPosition.top + $input.height() <= 0) || (inputPosition.top + $input.height() > $('#int-content').outerHeight());
                },
                checkVisibility: function ($widget) { return $widget.is(':visible'); },
                setWidgetPosition: function ($widget, $input) {
                    $widget.position({
                        my: "left top",
                        at: "left bottom",
                        of: $input,
                        collision: "flipfit"
                    });
                },
                setWidgetWidth: function ($widget, $input) {
                    $widget.outerWidth($input.outerWidth());
                }
            },
            jQueryUIAutoComplete: function ($el, options) {
                var o = $.extend({
                    windowResize: true,
                    contentScroll: true,
                    contentAreaId: 'int-content'
                }, options),
                    $widget = $el.autocomplete('widget');

                if (o.windowResize) {
                    $(window).resize(function () {
                        if (fix.jQueryUIHelper.checkVisibility($widget)) {
                            fix.jQueryUIHelper.setWidgetWidth($widget, $el);
                            fix.jQueryUIHelper.setWidgetPosition($widget, $el);
                        }
                    });
                }

                if (o.contentScroll) {
                    $('#' + o.contentAreaId).scroll(function () {
                        if (fix.jQueryUIHelper.checkVisibility($widget)) {
                            fix.jQueryUIHelper.setWidgetPosition($widget, $el);

                            if (fix.jQueryUIHelper.scrolledOutOfView($el)) {
                                $el.autocomplete('close');
                            }
                        }
                    });
                }
            },
            jQueryUIComboBox: function ($el, options) {
                var o = $.extend({
                    windowResize: true,
                    contentScroll: true,
                    contentAreaId: 'int-content',
                    inputId: $el.next('.int-combobox').find('input').attr('id')
                }, options),
                    $input = $('#' + o.inputId),
                    $widget = $input.autocomplete('widget');

                if (o.windowResize) {
                    $(window).resize(function () {
                        if (fix.jQueryUIHelper.checkVisibility($widget)) {
                            fix.jQueryUIHelper.setWidgetWidth($widget, $input);
                            fix.jQueryUIHelper.setWidgetPosition($widget, $input);
                        }
                    });
                }

                if (o.contentScroll) {
                    $('#' + o.contentAreaId).scroll(function () {
                        if (fix.jQueryUIHelper.checkVisibility($widget)) {
                            fix.jQueryUIHelper.setWidgetPosition($widget, $input);

                            if (fix.jQueryUIHelper.scrolledOutOfView($input)) {
                                $input.autocomplete('close');
                            }
                        }
                    });
                }
            },
            jQueryUIDatePicker: function ($el, options) {
                var o = $.extend({
                    windowResize: true,
                    contentScroll: true,
                    contentAreaId: 'int-content'
                }, options),
                    $widget = $el.datepicker('widget'),
                    widowResizeHandler = function () {
                        $(window).resize(function () {
                            if (fix.jQueryUIHelper.checkVisibility($widget)) {
                                $el.datepicker('hide').blur();
                            }
                        });
                    },
                    contentScrollHandler = function () {
                        $('#' + o.contentAreaId).scroll(function () {
                            if (fix.jQueryUIHelper.checkVisibility($widget)) {
                                fix.jQueryUIHelper.setWidgetPosition($widget, $el);

                                if (fix.jQueryUIHelper.scrolledOutOfView($el)) {
                                    $el.datepicker('hide').blur();
                                }
                            }
                        });
                    };

                if (o.windowResize) {
                    widowResizeHandler();
                }

                if (o.contentScroll) {
                    contentScrollHandler();
                }
            }
        },
        info: {
            ieVersion: function () {
                var undef,
                    v = 3,
                    div = document.createElement('div'),
                    all = div.getElementsByTagName('i');

                while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]);

                return v > 4 ? v : undef;
            },
            browser: function () {
                var c = navigator.userAgent.search("Chrome");
                var f = navigator.userAgent.search("Firefox");
                var m8 = navigator.userAgent.search("MSIE 8.0");
                var m9 = navigator.userAgent.search("MSIE 9.0");
                if (c > -1) {
                    brwsr = "Chrome";
                } else if (f > -1) {
                    brwsr = "Firefox";
                } else if (m9 > -1) {
                    brwsr = "MSIE 9.0";
                } else if (m8 > -1) {
                    brwsr = "MSIE 8.0";
                }
                return brwsr;
            }
        },
        pluginfy: function (pluginName, namespace, constructor) {
            var instantiatedClass = "fn-" + pluginName;

            $.fn[pluginName] = function (options) {
                return this.each(function () {
                    var $this = $(this);

                    if (!$this.hasClass(instantiatedClass)) {
                        new namespace[constructor]($this.addClass(instantiatedClass), options);
                    }
                });
            };
        }
    };

    widgets.Filter = function ($element, options) {
        this.options = $.extend({}, widgets.Filter.defaults, options);
        this.$filter = $element;
        this.$itemsContainer = this.options.$itemsContainer;
        this.init();
    };
    widgets.Filter.prototype = {
        defaults: {
            $itemsContainer: undefined,
            itemsClass: 'item',
            clear: false,
            $clearButton: undefined,
            summary: false,
            $summary: undefined,
            summaryHTML: '<p class="int-alert int-info"><strong>Filter Results: </strong> #relevant of #total</p>',
            aria: true
        },
        init: function () {
            var opts = this.options;

            return this
                .filterKeyupHandler(opts)
                .clearFilterButton(opts)
                .ajaxNewItemHandler()
                .aria(opts);
        },
        filterKeyupHandler: function (opts) {
            var base = this;

            this.$filter.keyup(function () {
                var $items = base.$itemsContainer.find(opts.itemsClass.classify()),
                    filterValue = $(this).val(),
                    $relevantItems = $items.filter(':containsIN(' + filterValue + ')');

                $items.hide();
                $relevantItems.show();

                base
                  .filterSummary(opts, filterValue, $relevantItems, $items)
                  .enableClearFilterButton(opts, filterValue);
            });

            return this;
        },
        filterSummary: function (opts, filterValue, $relevantItems, $items) {
            if (opts.summary) {
                opts.$summary.html((filterValue != '') ? opts.summaryHTML.replace('#relevant', $relevantItems.length.toString()).replace('#total', $items.length.toString()) : '');
            }
            return this;
        },
        clearFilterButton: function (opts) {
            if (opts.clear) {

                var base = this;

                opts.$clearButton
                        .prop('disabled', true)
                        .click(function () {
                            base.$filter.val('').trigger('keyup').focus();
                        });
            }

            return this;
        },
        enableClearFilterButton: function (opts, filterValue) {
            if (opts.clear) {
                opts.$clearButton.prop('disabled', (filterValue.length === 0));
            }
            return this;
        },
        ajaxNewItemHandler: function () {
            var base = this;

            this.$filter.on('ajax.Filter.newItem', function () {
                base.aria();    //Updates aria labels for the element
            });

            return this;
        },
        aria: function (opts) {
            var $items = this.$itemsContainer.find(opts.itemsClass.classify()),
                $input = this.$filter;

            if (opts.aria) {
                //Set aria-controls on input
                var itemIds = $items.uniqueId().map(function () {
                    return this.id;
                }).get().join(" ");

                $input.attr('aria-controls', itemIds);

                //Set aria on clear button
                if (opts.clear) {
                    opts.$clearButton.attr('aria-controls', $input.attr('id'));
                }

                //Set aria on summary
                if (opts.summary) {
                    opts.$summary.attr('aria-live', 'polite');
                    $input.attr('aria-describedby', opts.$summary.attr('id'));
                }
            }

            return this;
        }
    };
    widgets.Filter.defaults = widgets.Filter.prototype.defaults;

    widgets.CheckAll = function ($element, options) {
        this.$element = $element;
        this.$slaves = $('[data-group="' + $element.data('group') + '"]').not('#' + $element.attr('id'));
        this.options = $.extend({}, widgets.CheckAll.defaults, options);
        this.init();
    };
    widgets.CheckAll.prototype = {
        defaults: {
            tristate: true,
            summary: false,
            $summary: undefined,
            summaryHTML: '#checked selected of #total',
            aria: true
        },
        init: function () {
            return this
                .masterChangeHandler()
                .slaveChangeHandler()
                .triggerSlaveChangeEvent(this.options.summary)
                .aria();
        },
        masterChangeHandler: function () {
            var base = this,
                $slaves = this.$slaves;

            this.$element.change(function () {
                $slaves.prop('checked', this.checked);

                base.triggerSlaveChangeEvent(base.options.summary);
            });

            return this;
        },
        slaveChangeHandler: function () {
            var base = this,
                o = this.options,
                $slaves = this.$slaves,
                $master = this.$element;

            this.$slaves.change(function () {
                if (o.tristate) {
                    var allChecked = ($slaves.length === $slaves.filter(':checked').length),
                        noneChecked = ($slaves.filter(':checked').length === 0);

                    widgets.helpers.setTristate($master, noneChecked, allChecked);
                }
                else {
                    $master.prop('checked', ($slaves.length === $slaves.filter(':checked').length));
                }

                base.checkedSummary();
            });

            return this;
        },
        checkedSummary: function () {
            var o = this.options,
                $slaves = this.$slaves;

            if (o.summary) {
                var numChecked = $slaves.filter(':checked').length,
                    summary = o.summaryHTML.replace('#checked', numChecked.toString()).replace('#total', $slaves.length.toString());

                o.$summary.html((numChecked === 0) ? '' : summary);
            }

            return this;
        },
        triggerSlaveChangeEvent: function (condition) {
            if (condition) {
                this.$slaves.trigger('change');
            }
            return this;
        },
        aria: function () {
            var o = this.options,
                $master = this.$element;

            if (o.aria) {
                var slaveIds = this.$slaves.uniqueId().map(function () {
                    return this.id;
                }).get().join(" ");

                $master.attr('aria-controls', slaveIds);

                if (o.summary) {
                    $master.attr('aria-describedby', o.$summary.attr('id'));
                    o.$summary.attr('aria-live', 'polite');
                }
            }

            return this;
        }
    };
    widgets.CheckAll.defaults = widgets.CheckAll.prototype.defaults;

    widgets.TreeCheckAll = function ($element, options) {
        this.$container = $element;
        this.options = $.extend({}, widgets.TreeCheckAll.defaults, options);
        this.$masters = $element.find('[data-master="true"]');
        this.init();
    };
    widgets.TreeCheckAll.prototype = {
        defaults: {
            aria: true
        },
        init: function () {
            return this
                .masterChangeHandler()
                .slaveChangeHandler()
                .aria();
        },
        masterChangeHandler: function () {
            this.$container
                .on('change', '[data-master="true"]', function () {
                    $(this)
                        .prop('indeterminate', false)
                        .attr('aria-checked', this.checked.toString())
                        .closest('li').next('li').find('[type="checkbox"]')
                        .prop({
                            indeterminate: false,
                            checked: this.checked
                        })
                        .attr('aria-checked', this.checked);
                })
                .find('[data-master="true"]').parent('label').css('font-weight', '900');

            return this;
        },
        slaveChangeHandler: function () {
            var base = this;

            this.$container
                .on('change', '[type="checkbox"]', function () {
                    base.$masters.each(function () {
                        var $master = $(this),
                            $slaves = $master.closest('li').next('li').find('[type="checkbox"]'),
                            numSlavesChecked = $slaves.filter(':checked').length,
                            allChecked = numSlavesChecked === $slaves.length,
                            oneChecked = numSlavesChecked >= 1,
                            noneChecked = numSlavesChecked === 0;

                        if (oneChecked) {
                            if (!this.checked) {
                                $master.prop('indeterminate', true)
                                    .attr('aria-checked', 'mixed');
                            }
                        } else {
                            $master.prop('indeterminate', false)
                                .removeAttr('aria-checked');
                        }

                        widgets.helpers.setTristate($master, noneChecked, allChecked);
                    });

                });

            return this;
        },
        aria: function () {   //todo
            if (this.options.aria) {

            }
            return this;
        }
    };
    widgets.TreeCheckAll.defaults = widgets.TreeCheckAll.prototype.defaults;

    widgets.MultiSelect = function ($element, options) {
        this.$element = $element;
        this.options = $.extend({}, widgets.MultiSelect.defaults, options);
        this.$button = $element.children('button');
        this.$menu = $element.children('ul');
        this.$checkboxes = this.$menu.find('input:checkbox').not('.master');
        this.numCheckboxes = this.$checkboxes.length;
        this.$radios = this.$menu.find('input:radio');
        this.init();
    };
    widgets.MultiSelect.prototype = {
        defaults: {
            elementClass: 'widgets-multiselect',
            menuClass: 'widgets-multiselect-menu',
            buttonText: 'Select options',
            checkboxSummaryText: '#checked selected of #total',
            checkboxSummary: true,
            radioSummary: true,
            elementCSS: {},
            menuCSS: {},
            buttonCSS: {},
            collision: true,
            mouseLeave: true,
            mouseLeaveTimeout: 1000,
            offClick: true,
            maximumChecked: [false, 0],
            checkAll: true,
            checkAllLabel: ['Check all', 'Uncheck all'],
            filter: false,
            setChecked: [],
            triggerChange: [false, {}],
            aria: true
        },
        init: function () {
            var o = this.options;

            this.$button.html(o.buttonText).css(o.buttonCSS);

            this.$element
                .css(o.elementCSS)
                .addClass(o.elementClass);

            this.$menu
                .addClass(o.menuClass)
                .menu()
                .css(o.menuCSS)
                .find('li')
                .addClass('items');

            return this
                .checkboxChangeHandler()
                .radioChangeHandler()
                .buttonClickHandler()
                .documentClickHandler()
                .menuMouseLeaveHandler()
                .filter()
                .checkAll()
                .setChecked(o.setChecked)
                .aria()
                .triggerChange();
        },
        positionMenu: function (context) {
            if (this.options.collision) {
                this.$menu.position({
                    my: "left top+4",
                    at: "left bottom",
                    of: context,
                    collision: "flipfit"
                });
            }

            return this;
        },
        checkboxSummary: function (numChecked) {
            var base = this,
                o = this.options;

            if (o.checkboxSummary) {
                var checkboxSummary = o.checkboxSummaryText
                    .replace('#checked', numChecked.toString())
                    .replace('#total', base.numCheckboxes.toString());

                this.$button.html((numChecked > 0) ? checkboxSummary : o.buttonText);
            }

            return this;
        },
        maximumChecked: function (numChecked) {
            var o = this.options;

            if (o.maximumChecked[0]) {
                var maximumCheckableChecked = numChecked >= o.maximumChecked[1],
                    $uncheckedCheckboxes = this.$checkboxes.not(':checked');

                $uncheckedCheckboxes.prop('disabled', maximumCheckableChecked);
                $uncheckedCheckboxes.parent('label').css({
                    'color': (maximumCheckableChecked ? 'grey' : '#333'),
                    'cursor': (maximumCheckableChecked ? 'not-allowed' : 'pointer')
                });
            }
            return this;
        },
        checkboxChangeHandler: function () {
            var base = this,
                $checkboxes = this.$checkboxes;

            if ($checkboxes.doesExist()) {
                $checkboxes.change(function () {
                    var numChecked = $checkboxes.filter(':checked').length;

                    base
                        .checkboxSummary(numChecked)
                        .maximumChecked(numChecked);
                });
            }
            return this;
        },
        radioChangeHandler: function () {
            var base = this;
            if (base.$radios.doesExist() && base.options.radioSummary) {
                base.$radios.change(function () {
                    base.$button.html($(this).parent('label').text());
                });
            }
            return this;
        },
        buttonClickHandler: function () {
            var base = this,
                $menu = this.$menu,
                o = this.options;

            this.$button.click(function () {
                $('.' + o.menuClass).not($menu).hide();       //Hide other multiselect menus
                $menu.toggle();

                base.positionMenu(this); //this refers to the button
            });
            return this;
        },
        documentClickHandler: function () {
            if (this.options.offClick) {
                var $menu = this.$menu;

                $(document).click(function () {
                    $menu.filter(':visible').hide();
                });

                //Stop the propagation of document click event when component clicked.
                this.$button.click(function (e) {
                    e.stopPropagation();
                });
                $menu.click(function (e) {
                    e.stopPropagation();
                });
            }

            return this;
        },
        menuMouseLeaveHandler: function () {
            var o = this.options;

            if (o.mouseLeave) {
                var time = {};

                this.$menu
                    .mouseleave(function () { //Sets timeout function
                        var $this = $(this);    //preserve menu this reference

                        time.timeout = window.setTimeout(function () {
                            $this.hide();
                        }, o.mouseLeaveTimeout);
                    })
                    .mouseenter(function () { //Cancels the timeout if you enter into the menu again
                        if (typeof time.timeout == "number") {
                            window.clearTimeout(time.timeout);
                            delete time.timeout;
                        }
                    });
            }
            return this;
        },
        filter: function () {
            var base = this,
                o = base.options;

            if (o.filter) {
                var $menu = base.$menu;

                $menu.prepend('<li class="addon"><div class="filter"><input placeholder="Filter" type="text" class="filter-input"/><button type="button" class="int-button filter-button"><i class="int-icon-remove"></i></button></div></li>');

                var $filter = $menu.find('.filter-input'),
                    $items = $menu.find('.items'),
                    $filterButton = $menu.find('.filter-button');

                new widgets.Filter($filter, { $itemsContainer: $menu, itemsClass: 'items', clear: true, $clearButton: $filterButton });  //Initialise filter object

                if (o.checkAll) {
                    $filter.keyup(function () {
                        base.$masterCheckbox.prop('disabled', ($items.is(':visible') == 0));             //Disable checkall functionality if all items are filtered out
                    });
                }

                base.$filterClearButton = $filterButton;
                base.$filter = $filter;
            }

            return this;
        },
        checkAll: function () {
            var base = this,
                o = base.options;

            //Check all cannot be called if maximum checked option is set
            if (o.checkAll && !base.options.maximumChecked[0]) {
                var $menu = base.$menu,
                    $checkboxes = base.$checkboxes,
                    numCheckboxes = $checkboxes.length,
                    allChecked = function () { return numCheckboxes === $checkboxes.filter(':checked').length; },
                    $masterLabel;

                if ($checkboxes.doesExist()) {
                    $checkboxes.eq(0).closest('li').before('<li class="addon"><label><input type="checkbox" class="master"/><span class="check-all-text">' + o.checkAllLabel[0] + '</span></label></li>');
                    base.$masterCheckbox = $menu.find('.master');
                    $masterLabel = $menu.find('.check-all-text');
                    base.$masterCheckbox.closest('li').css({
                        'font-weight': '900'
                    });

                    base.$masterCheckbox.change(function () {
                        $checkboxes
                            .not(':hidden')//check all ones that are visible i.e. not filtered out
                            .prop('checked', this.checked)
                            .trigger('change'); //to update summary text

                        $masterLabel.html((allChecked()) ? o.checkAllLabel[1] : o.checkAllLabel[0]);
                    });

                    $checkboxes.change(function () {
                        base.$masterCheckbox.prop('checked', allChecked());
                        $masterLabel.html((allChecked()) ? o.checkAllLabel[1] : o.checkAllLabel[0]);
                    });
                }
            }

            return this;
        },
        setChecked: function (array) {
            var base = this;

            if (array.length >= 1 && base.$checkboxes.doesExist()) {
                var arrayLength = array.length,
                    containsObject = function (obj, list) {
                        var i,
                            listLength = list.length;

                        for (i = 0; i < listLength; i++) {
                            if (list[i] === obj) {
                                return true;
                            }
                        }

                        return false;
                    },
                    isNumber = typeof array[0] === 'number';

                var byIndex = function (bool) {
                    if (bool)
                        for (var i = 0; i < arrayLength; i++) {
                            base.$checkboxes.eq(i).prop('checked', true).trigger('change');
                        }
                },
                    byValue = function (bool) {
                        if (bool)
                            base.$checkboxes.each(function () {
                                var $thisCheckbox = $(this);
                                if (containsObject($thisCheckbox.val(), array)) {
                                    $thisCheckbox.prop('checked', true).trigger('change');
                                }
                            });
                    };

                byIndex(isNumber);
                byValue(!isNumber);
            }

            return this;
        },
        triggerChange: function () {
            var base = this,
                o = base.options,
                opts = $.extend({
                    checkbox: true,
                    radio: true,
                    masterCheckbox: true
                }, o.triggerChange[1]);

            if (o.triggerChange[0]) {
                if (base.$checkboxes.doesExist() && opts.checkbox) {
                    base.$checkboxes.trigger('change');
                }
                if (base.$radios.doesExist() && opts.radio) {
                    base.$radios.trigger('change');
                }
                if (o.checkAll && opts.masterCheckbox) {
                    base.$masterCheckbox.trigger('change');
                }
            }

            return this;
        },
        aria: function () {
            var base = this,
                o = this.options;

            if (o.aria) {
                var slaveInputIds = base.$menu.find('[type="radio"],[type="checkbox"]').not('.master').uniqueId().map(function () {
                    return this.id;
                }).get().join(" ");

                widgets.helpers.aria.hidden(base.$menu);

                base.$button
                    .attr('aria-controls', base.$menu.attr('id'))
                    .click(function () {
                        widgets.helpers.aria.hidden(base.$menu);
                    });

                if (o.filter) {
                    base.$filter
                        .attr('aria-control', slaveInputIds)
                        .uniqueId();
                    base.$filterClearButton.attr('aria-controls', base.$filter.attr('id'));
                }

                if (o.checkAll) {
                    base.$menu.find('.master').attr('aria-controls', slaveInputIds);
                }
            }

            return this;
        }
    };
    widgets.MultiSelect.defaults = widgets.MultiSelect.prototype.defaults;

    widgets.Listbox = function ($element, options) {
        this.$listbox = $element;
        this.options = $.extend({}, widgets.Listbox.defaults, options);
        this.$selectA = this.$listbox.find('select').eq(0);
        this.$selectB = this.$listbox.find('select').eq(1);
        this.$buttonsA = this.$selectA.prev('div').find('button');
        this.$buttonsB = this.$selectB.prev('div').find('button');
        this.$buttonUpA = this.$buttonsA.eq(0);
        this.$buttonDownA = this.$buttonsA.eq(1);
        this.$buttonAllA = this.$buttonsA.eq(2);
        this.$buttonAtoB = this.$buttonsA.eq(3);
        this.$buttonUpB = this.$buttonsB.eq(2);
        this.$buttonDownB = this.$buttonsB.eq(3);
        this.$buttonAllB = this.$buttonsB.eq(1);
        this.$buttonBtoA = this.$buttonsB.eq(0);
        this.init();
    };
    widgets.Listbox.prototype = {
        defaults: {
            aria: true
        },
        init: function () {
            return this
                .selectAllOptionsHandler(this.$buttonAllA, this.$selectA)
                .selectAllOptionsHandler(this.$buttonAllB, this.$selectB)
                .moveOptionsAcrossHandler(this.$buttonAtoB, this.$selectA, this.$selectB)
                .moveOptionsAcrossHandler(this.$buttonBtoA, this.$selectB, this.$selectA)
                .moveOptonsUpAndDownHandler(this.$buttonUpA, this.$buttonDownA, this.$selectA)
                .moveOptonsUpAndDownHandler(this.$buttonUpB, this.$buttonDownB, this.$selectB)
                .aria();
        },
        selectAllOptionsHandler: function ($button, $select) {
            $button.click(function () {
                $select.find('option').attr('selected', 'selected');
            });
            return this;
        },
        moveOptionsAcrossHandler: function ($button, $source, $destination) {
            $button.click(function () {
                $source.children(':selected').appendTo($destination);
            });
            return this;
        },
        moveOptonsUpAndDownHandler: function ($upButton, $downButton, $select) {
            $upButton.click(function () {
                $select.children(':selected').each(function () {
                    $(this).insertBefore($(this).prev());
                });
            });
            $downButton.click(function () {
                $select.children(':selected').each(function () {
                    $(this).insertAfter($(this).next());
                });
            });
            return this;
        },
        aria: function () {
            if (this.options.aria) {
                var $select = this.$listbox.find('select'),
                    $firstSetButtons = this.$listbox.children('div').eq(0).find('button'),
                    $secondSetButtons = this.$listbox.children('div').eq(1).find('button');

                $select.uniqueId();

                $firstSetButtons.attr('aria-controls', $select.eq(0).attr('id'));
                $secondSetButtons.attr('aria-controls', $select.eq(1).attr('id'));
            }
            return this;
        }
    };
    widgets.Listbox.defaults = widgets.Listbox.prototype.defaults;

    widgets.StickyTableHeader = function ($element, options) {
        this.$area = $element;
        this.options = $.extend({}, widgets.StickyTableHeader.defaults, options);
        this.$stickyHeader = this.$area.find('.' + this.options.headerClass);
        this.$stickyHeaderColumns = this.$stickyHeader.find('th');
        this.areaPosition = this.$area.position();
        this.$scrollWindow = $(this.options.scrollWindowSelector);
        this.init();
    };
    widgets.StickyTableHeader.prototype = {
        defaults: {
            headerClass: 'int-persistentTableHeader'
            , floatingHeaderClass: 'int-floatingTableHeader'
            , scrollWindowSelector: '#int-content'              //the scrollable window - normally window but in AppFramework this is #int-content
            , widthAdjustment: 1
            , aria: true
        },
        init: function () {
            //Clone header and insert before current header, this will be the static header. Turn header into floating header.
            this.$stickyHeader
                .before(this.$stickyHeader.clone())
                .addClass(this.options.floatingHeaderClass);

            return this
                .contentAreaScrollHandler()
                .windowResizeHandler()
                .aria();
        },
        setFloatingHeaderVisibility: function () {
            this.$stickyHeader
                .css('display', (this.$area.position().top <= 0) && (this.$scrollWindow.scrollTop() < this.$area.height() + this.areaPosition.top) ? 'block' : 'none');

            return this;
        },
        setFloatingHeaderWidth: function () {
            var arrayOfTdWidths = [];

            this.$stickyHeader.prev('.' + this.options.headerClass).find('th').each(function () {
                arrayOfTdWidths.push($(this).outerWidth());
            });

            var numOfWidthsOfTds = arrayOfTdWidths.length;  //Cached length for performance

            for (var i = 0; i < numOfWidthsOfTds; i++) {
                this.$stickyHeaderColumns.eq(i).outerWidth(arrayOfTdWidths[i] + this.options.widthAdjustment);
            }

            return this;
        },
        setFloatingHeaderPosition: function () {
            this.$stickyHeader.css('top', this.$scrollWindow.offset().top);

            return this;
        },
        contentAreaScrollHandler: function () {
            var base = this;

            this.$scrollWindow.scroll(function () {
                base.setFloatingHeaderVisibility();
            }).trigger('scroll');

            return this;
        },
        windowResizeHandler: function () {
            var base = this;

            $(window).resize(function () {
                base.setFloatingHeaderPosition()
                    .setFloatingHeaderWidth();
            }).trigger('resize');

            return this;
        },
        aria: function () {
            if (this.options.aria) {
                this.$stickyHeader.attr('role', 'presentation');
            }
            return this;
        }
    };
    widgets.StickyTableHeader.defaults = widgets.StickyTableHeader.prototype.defaults;

    widgets.TreeToggle = function ($element, options) {
        this.$container = $element;
        this.options = $.extend({}, OU.Widgets.TreeToggle.defaults, options);
        this.$children = this.$container.find(this.options.childSelector);
        this.$triggers = this.$container.find(this.options.triggerSelector);
        this.init();
    };
    widgets.TreeToggle.prototype = {
        defaults: {
            triggerSelector: '.int-treeToggleTrigger',
            childSelector: '.int-treeToggleChild',
            visible: false,
            icons: true,
            iconsClass: 'int-treeToggleIcon',
            visibleIconClass: 'int-icon-minus',
            hiddenIconClass: 'int-icon-plus',
            aria: true
        },
        init: function () {
            return this
                .triggerClickHandler()
                .setIconState()
                .aria();
        },
        setIconState: function () {
            var o = this.options,
                initialIconClass;

            if (o.icons) {
                this.$container.addClass('icon');

                if (o.visible) {
                    this.$children.show();
                    initialIconClass = o.visibleIconClass;
                } else {
                    initialIconClass = o.hiddenIconClass;
                }

                this.$triggers.find('a').prepend('<i class="' + o.iconsClass + ' ' + initialIconClass + '"></i>');
            }

            return this;
        },
        toggleIconState: function ($trigger) {
            var o = this.options;

            if (o.icons) {
                $trigger.find('i').toggleClass(o.visibleIconClass).toggleClass(o.hiddenIconClass);
            }

            return this;
        },
        triggerClickHandler: function () {
            var base = this,
                o = base.options;

            this.$container.on('click', o.triggerSelector, function () {
                $(this).next(o.childSelector).toggle();

                base.toggleIconState($(this));
            });
            return this;
        },
        aria: function () {
            var o = this.options,
                $children = this.$children;

            if (o.aria) {
                $children
                    .uniqueId()
                    .each(function () {
                        $(this).prev(o.triggerSelector).attr('aria-controls', $(this).attr('id'));
                    });

                widgets.helpers.aria.hidden($children);

                this.$container.on('click', o.triggerSelector, function () {
                    widgets.helpers.aria.hidden($(this).next(o.childSelector));
                });
            }

            return this;
        }
    };
    widgets.TreeToggle.defaults = widgets.TreeToggle.prototype.defaults;

    widgets.Tabs = function ($element, options) {
        this.$element = $element;
        this.$tabsContainer = $element.children('div').eq(0);
        this.$tabs = this.$tabsContainer.find('a');
        this.$tabpanelsContainer = $element.children('div').eq(1);
        this.$tabpanels = this.$tabpanelsContainer.children('div');
        this.options = $.extend({}, widgets.Tabs.defaults, options);
        this.init();
    };
    widgets.Tabs.prototype = {
        defaults: {
            activeClass: 'active',
            preventDefault: true,
            aria: true
        },
        init: function () {
            return this
                .tabsClickHandler()
                .aria();
        },
        tabsClickHandler: function () {
            var base = this,
                active = this.options.activeClass;

            this.$tabpanels.eq(this.$tabsContainer.find('.' + active).index()).addClass(active);

            this.$tabsContainer.on('click', 'a', function (e) {
                if (base.options.preventDefault) {
                    e.preventDefault();
                }

                base.$tabs.filter('.' + active).removeClass(active);

                $(this)
                    .addClass(active)
                    .trigger('thisTabIsActive');

                base.$tabpanels
                    .removeClass(active)
                    .eq($(this).index())
                    .addClass(active)
                    .trigger('thisTabPanelIsActive');
            });

            return this;
        },
        aria: function () {
            if (this.options.aria) {
                var base = this,
                    ids = [];

                this.$tabsContainer.attr('role', 'tablist');

                this.$tabpanels
                    .uniqueId()
                    .attr('role', 'tabpanel')
                    .each(function () {
                        ids.push($(this).attr('id'));
                        widgets.helpers.aria.hidden($(this));
                    });

                this.$tabs
                    .each(function () {
                        $(this).attr({
                            'aria-controls': ids[$(this).index()],
                            'role': 'tab',
                            'aria-selected': 'false'
                        });
                    })
                    .filter('.' + this.options.activeClass)
                    .attr('aria-selected', 'true');

                //Aria hidden/expanded for tab panels
                this.$tabpanelsContainer.on('thisTabPanelIsActive', 'div', function () {
                    base.$tabpanels.each(function () {
                        widgets.helpers.aria.hidden($(this));
                    })
                });
                //Aria selected for tabs
                this.$tabsContainer.on('thisTabIsActive', 'a', function () {
                    base.$tabs.not('.' + base.options.activeClass).attr('aria-selected', 'false');
                    $(this).attr('aria-selected', 'true');
                });
            }
            return this;
        }
    };
    widgets.Tabs.defaults = widgets.Tabs.prototype.defaults;

    widgets.Panels = function ($element, options) {
        this.$container = $element;
        this.options = $.extend({}, widgets.Panels.defaults, options);
        this.init();
    };
    widgets.Panels.prototype = {
        defaults: {
            hiddenClass: 'hidden',
            iconClasses: ['int-icon-minus-square', 'int-icon-plus-square'],
            cardClass: 'card',
            titleClass: 'title',
            tabClass: 'tab',
            panelClass: 'panel',
            controlBarClass: 'controlBar',
            toggleAll: [true, true, 'tabAll'],
            aria: true
        },
        init: function () {
            return this
                .setTabPanelInitialStates()
                .tabClickHandler()
                .toggleAllAddon()
                .ajaxNewPanelHandler()
                .aria();
        },
        setTabPanelInitialStates: function () {
            var o = this.options;

            this.$container.find(o.titleClass.classify()).not('.init').each(function () {
                var iconClass = o.iconClasses[($(this).addClass('init').next(o.panelClass.classify()).hasClass(o.hiddenClass)) ? 1 : 0];
                $(o.tabClass.classify(), this).addClass(iconClass);
            });
            return this;
        },
        tabClickHandler: function () {
            var o = this.options;

            this.$container.on('click', o.tabClass.classify(), function () {
                $(this)
                    .toggleClass(o.iconClasses[0])
                    .toggleClass(o.iconClasses[1])
                    .closest(o.titleClass.classify()).next(o.panelClass.classify()).toggleClass(o.hiddenClass);
            });
            return this;
        },
        toggleAllAddon: function () {
            var base = this,
                o = this.options;

            if (o.toggleAll[0]) {
                var show = o.toggleAll[1];

                $('<a href="#" class="' + o.iconClasses[show ? 1 : 0] + ' ' + o.toggleAll[2] + '"></a>')
                    .appendTo(this.$container.find(o.controlBarClass.classify()))
                    .click(function () {
                        $(this).toggleClass(o.iconClasses[0]).toggleClass(o.iconClasses[1]);

                        var $panels = base.$container.find(o.panelClass.classify());

                        $panels = show ? $panels.filter(o.hiddenClass.classify()) : $panels.not(o.hiddenClass.classify());

                        $panels.each(function () {
                            $(this).closest(o.cardClass.classify()).find(o.tabClass.classify()).trigger('click');
                        });

                        show = !show;
                    });
            }
            return this;
        },
        ajaxNewPanelHandler: function () {
            var base = this;

            this.$container.on('ajax.Panel.newPanel', function () {
                base.setTabPanelInitialStates();
            });

            return this;
        },
        aria: function () {
            if (this.options.aria) {

            }
            return this;
        }
    };
    widgets.Panels.defaults = widgets.Panels.prototype.defaults;

    widgets.RemainingCharactersCounter = function ($element, options) {
        this.$input = $element;
        this.options = $.extend({}, widgets.RemainingCharactersCounter.defaults, options);
        this.init();
    };
    widgets.RemainingCharactersCounter.prototype = {
        defaults: {
            $characterSummary: undefined,
            maxCharsLength: undefined,
            truncate: true,
            summaryTextPlural: 'Remaining characters: #remaining | Max: #max | Current: #current',
            summaryText: 'Remaining character: #remaining | Max: #max | Current: #current',
            aria: true,
            maxCharactersReachedHandler: undefined
        },
        init: function () {
            var o = this.options;

            return this
                .inputKeyupHandler(o)
                .setInputMaxLength(o.truncate, o.maxCharsLength)
                .aria(o)
                .onMaxCharactersReachedHandler(o.maxCharactersReachedHandler);
        },
        inputKeyupHandler: function (o) {
            this.$input.keyup(function () {
                var charLength = $(this).val().length,
                    remainingChar = o.maxCharsLength - charLength;

                o.$characterSummary.text(
                    ((remainingChar <= 1) ? o.summaryText : o.summaryTextPlural)
                        .replace('#remaining', remainingChar.toString())
                        .replace('#max', o.maxCharsLength.toString())
                        .replace('#current', charLength.toString()));

                if (remainingChar <= 0) {
                    $(this).trigger('event.RemainingCharactersCounter.maxCharactersReached');
                }
            }).trigger('keyup');

            return this;
        },
        setInputMaxLength: function (setInputMaxLength, maxCharsLength) {
            if (setInputMaxLength) {
                this.$input.attr('maxlength', maxCharsLength);//IE10+, Chrome, Firefox, Safari only.
            }

            return this;
        },
        onMaxCharactersReachedHandler: function (handler) {
            if (typeof handler === 'function') {
                this.$input.on('event.RemainingCharactersCounter.maxCharactersReached', function () {
                    handler();
                });
            }

            return this;
        },
        aria: function (o) {
            if (o.aria) {
                var id = o.$characterSummary.uniqueId().attr('aria-live', 'polite').attr('id');

                this.$input.attr({
                    'aria-controls': id,
                    'aria-labelledby': id
                });
            }
            return this;
        }
    };
    widgets.RemainingCharactersCounter.defaults = widgets.RemainingCharactersCounter.prototype.defaults;

    //TODO ARIA for all Below
    widgets.Wizard = function ($element, options) {
        this.$wizard = $element;
        this.$stages = $element.children('li');
        this.selectedIndex = null;
        this.options = $.extend({}, widgets.Wizard.defaults, options);
        this.$buttons = this.$stages.find('button');
        this.methods = {
            init: false,
            clickHandler: false
        };
    };
    widgets.Wizard.prototype = {
        defaults: {
            updateButtonText: [],
            revertButtonText: [],
            stageIcon: 'int-icon-ok-sign',
            unavailableStageIcon: 'int-icon-minus-sign'
        },
        init: function (selectedIndex) {
            var base = this,
                numOfStages = base.$stages.length;

            base.selectedIndex = selectedIndex;

            var $buttons = base.$buttons,
                $nextAvailableStage = base.$stages.eq(base.selectedIndex + 1),
                $futureStages = $nextAvailableStage.nextAll('li'),
                $selectedStage = (base.selectedIndex < 0) ? $nextAvailableStage.prev('li') : base.$stages.eq(base.selectedIndex),   //This is as eq(-1) selects the element from the end of the collection
                $prevSelectedStage = (base.selectedIndex === numOfStages) ? base.$stages.eq(base.selectedIndex - 1) : $selectedStage.prev('li'),
                $pastStage = $prevSelectedStage.prevAll('li'),
                $icons = base.$stages.find('h4').children('i'),
                numButtons = $buttons.length;

            init();

            function aria() {
                base.$stages.not('.int-selected').attr('aria-selected', 'false');
                base.$stages.filter('.int-selected').attr('aria-selected', 'true');
            }
            function setAvailabilityClasses() {
                base.$stages.removeAttr('class');

                $pastStage.addClass('int-pastSelected');                    //button disabled
                $prevSelectedStage.addClass('int-previouslySelected');      //button enabled
                $selectedStage.addClass('int-selected');                    //button disabled
                $nextAvailableStage.addClass('int-nextAvailable');          //button enabled
                $futureStages.addClass('int-unavailable');                  //button disabled
            }
            function setIcon() {
                $icons.removeAttr('class');

                base.$stages.each(function () {
                    var $stage = $(this),
                        $icon = $stage.find('h4').find('i');

                    $icon.addClass(($stage.hasClass('int-unavailable')) ? base.options.unavailableStageIcon : base.options.stageIcon);
                });
            }
            function setButtonAvailability() {
                $buttons.prop('disabled', true);

                base.$stages.each(function () {
                    var $stage = $(this),
                        $button = $stage.find('button'),
                        stageClassname = $stage.attr('class'),
                        buttonEnabled = (stageClassname === 'int-previouslySelected' || stageClassname === 'int-nextAvailable');

                    $button.prop('disabled', !buttonEnabled);
                });
            }
            function setButtonText() {
                for (var i = 0; i < numButtons; i++) {
                    var $button = $buttons.eq(i),
                        $stage = $button.closest('li'),
                        buttonText = ($stage.hasClass('int-pastStage') || $stage.hasClass('int-previouslySelected')) ? base.options.revertButtonText[i] : base.options.updateButtonText[i];

                    $button.text(buttonText);
                }
            }
            function init() {
                setAvailabilityClasses();
                setIcon();
                setButtonAvailability();
                setButtonText();
                aria();
            }

            base.methods.init = true;
            return this;
        },
        clickHandler: function () {
            var base = this;

            base.$buttons.click(function () {
                var $stage = $(this).closest('li'),
                    index = $stage.index();
                base.init(index);
            });

            base.methods.clickHandler = true;
            return this;
        }
    };
    widgets.Wizard.defaults = widgets.Wizard.prototype.defaults;

    widgets.SwitchButtons = function ($element, options) {
        this.$element = $element;
        this.$inputs = $element.find('input');
        this.$labels = $element.find('label');
        this.options = $.extend({}, widgets.SwitchButtons.defaults, options);
        this.init();
    };
    widgets.SwitchButtons.prototype = {
        defaults: {
            selectedClass: 'int-selected',
            labelCSS: {
                'cursor': 'pointer'
                , '-webkit-touch-callout': 'none'
                , '-webkit-user-select': 'none'
                , '-khtml-user-select': 'none'
                , '-moz-user-select': 'none'
                , '-ms-user-select': 'none'
                , 'user-select': 'none'
            }
        },
        init: function () {
            this.$inputs.hide();
            this.$labels.css(this.options.labelCSS);

            return this
                .labelClickHandler()
                .setChecked();
        },
        setChecked: function () {
            var base = this;

            this.$inputs.each(function () {
                var $input = $(this),
                    $label = $input.next('label');

                $input.prop('checked', $label.hasClass(base.options.selectedClass));
            });

            return this;
        },
        labelClickHandler: function () {
            var base = this;

            this.$labels.click(function () {
                var $label = $(this);

                if (base.$element.find('[type="radio"]').doesExist()) {
                    base.$labels.removeClass(base.options.selectedClass);
                    $label
                        .addClass(base.options.selectedClass)
                        .prev('input[type="radio"]').trigger('change');
                } else {
                    $label
                        .toggleClass(base.options.selectedClass)
                        .prev('input[type="checkbox"]').trigger('change');
                }

                base.setChecked();
            });

            return this;
        }
    };
    widgets.SwitchButtons.defaults = widgets.SwitchButtons.prototype.defaults;

    widgets.CheckboxButton = function ($element, options) {
        this.$checkbox = $element;
        this.$label = $('label[for="' + $element.attr('id') + '"]');
        this.options = $.extend({}, widgets.CheckboxButton.defaults, options);
        this.init();
    };
    widgets.CheckboxButton.prototype = {
        defaults: {
            selectedClass: 'int-selected'
            , labelCss: {
                'cursor': 'pointer'
                , '-webkit-touch-callout': 'none'
                , '-webkit-user-select': 'none'
                , '-khtml-user-select': 'none'
                , '-moz-user-select': 'none'
                , '-ms-user-select': 'none'
                , 'user-select': 'none'
            }
        },
        init: function () {
            this.$label.css(this.options.labelCss);
            return this
                .labelAndCheckboxClickAndChangeHandlers()
                .setChecked();
        },
        setChecked: function () {
            this.$checkbox.prop('checked', this.$label.hasClass(this.options.selectedClass));

            return this;
        },
        labelAndCheckboxClickAndChangeHandlers: function () {
            var base = this,
                o = this.options;
            //Different method depending on if the input is nested inside the label or not - due to click issues for nested checkboxes.
            if (this.$label.children('input').length > 0) {
                this.$checkbox.change(function () {
                    if (base.$checkbox.is(':checked')) {
                        base.$label.addClass(o.selectedClass);
                    } else {
                        base.$label.removeClass(o.selectedClass);
                    }
                });
            } else {
                this.$checkbox.hide();
                this.$label.click(function () {
                    $(this).toggleClass(o.selectedClass);
                });
            }
            return this;
        }
    };
    widgets.CheckboxButton.defaults = widgets.CheckboxButton.prototype.defaults;

    widgets.ButtonTextToggler = function ($element, options) {
        this.$button = $element;
        this.options = $.extend({}, widgets.ButtonTextToggler.defaults, options);
        this.counter = true;
        this.init();
    };
    widgets.ButtonTextToggler.prototype = {
        defaults: {
            buttonHTML: []
        },
        init: function () {
            //Set initial Button Text
            this.$button.html(this.options.buttonHTML[0]);
            return this.buttonClickHandler();
        },
        buttonClickHandler: function () {
            var base = this,
                o = this.options;

            this.$button.click(function () {
                $(this).html(base.counter ? o.buttonHTML[1] : o.buttonHTML[0]);
                base.counter = !base.counter
            });

            return this;
        }
    };
    widgets.ButtonTextToggler.defaults = widgets.ButtonTextToggler.prototype.defaults;

    //Core Components
    widgets.DropDownMenu = function ($button, options) {
        this.$button = $button;
        this.options = $.extend({}, widgets.DropDownMenu.defaults, options);
        this.$menu = this.options.$menu;
        this.init();
    };
    widgets.DropDownMenu.prototype = {
        defaults: {
            $menu: undefined,
            offClick: true
        },
        init: function () {
            return this
                .initMenu()
                .buttonClickHandler()
                .offClick();
        },
        initMenu: function () {
            this.$menu.menu().filter(':visible').hide();
            return this;
        },
        buttonClickHandler: function () {
            var base = this;

            this.$button.click(function () {
                base.$menu.toggle().position({
                    my: "left top+4",
                    at: "left bottom",
                    of: this,
                    collision: "flipfit"
                });
            });

            return this;
        },
        offClick: function () {
            var base = this;

            if (this.options.offClick) {
                $(document).click(function () {
                    base.$menu.filter(':visible').hide();
                });

                //Stop the propagation of document click event when component clicked.
                base.$button.click(function (e) {
                    e.stopPropagation();
                });
            }

            return this;
        }
    };
    widgets.DropDownMenu.defaults = widgets.DropDownMenu.prototype.defaults;

    widgets.Toggler = function ($trigger, options) {
        this.$trigger = $trigger;
        this.options = $.extend({}, widgets.Toggler.defaults, options);
        this.$content = this.options.$content;
        this.init();
    };
    widgets.Toggler.prototype = {
        defaults: {
            $content: undefined,
            dynamicText: [false, '', ''],
            initiallyDisplayed: false,
            $contentCss: {}
        },
        init: function () {
            this.$content.css(this.options.$contentCss);

            return this
                .setInitialVisibility()
                .triggerClickHandler();
        },
        setTriggerText: function () {
            var o = this.options;

            if (o.dynamicText[0]) {
                this.$trigger.html(o.dynamicText[(this.$content.is(':visible')) ? 1 : 2]);
            }

            return this;
        },
        setInitialVisibility: function () {
            if (this.options.initiallyDisplayed) {
                this.$content.show();
            } else {
                this.$content.hide();
            }

            this.setTriggerText();

            return this;
        },
        triggerClickHandler: function () {
            var base = this;

            this.$trigger.click(function () {
                base.$content.toggle();
                base.setTriggerText();
            });

            return this;
        }
    };
    widgets.Toggler.defaults = widgets.Toggler.prototype.defaults;

    widgets.AccordionToggler = function ($element, options) {
        this.$accordion = $element;
        this.options = $.extend({}, widgets.AccordionToggler.defaults, options);
        this.init();
    };
    widgets.AccordionToggler.prototype = {
        defaults: {
            triggerClass: 'int-togglerTrigger',
            triggerActiveClass: 'int-togglerHeadActive',
            panelVisibleClass: 'int-togglerContentActive',
            iconClasses: ['int-icon-chevron-down', 'int-icon-chevron-right'],
            aria: true
        },
        init: function () {
            return this
                .setTabPanelInitialStates()
                .panelClickHandler()
                .ajaxNewPanelHandler();
        },
        panelClickHandler: function () {
            var base = this,
                o = this.options;

            this.$accordion.on('click', '.' + o.triggerClass, function () {
                var $trigger = $(this);

                $trigger.toggleClass(o.triggerActiveClass).next('div').toggleClass(o.panelVisibleClass);

                base.setIconClasses($trigger);
            });
            return this;
        },
        setIconClasses: function ($trigger) {
            var o = this.options,
                $panel = $trigger.next('div'),
                $icon = $trigger.find('i'),
                panelIsOpen = $panel.hasClass(o.panelVisibleClass);

            $icon.removeClass(panelIsOpen ? o.iconClasses[1] : o.iconClasses[0]).addClass(panelIsOpen ? o.iconClasses[0] : o.iconClasses[1]);
        },
        setTabPanelInitialStates: function () {
            var base = this,
                o = this.options,
                $panels = this.$accordion.children('div').not('init');

            $panels.each(function () {
                var $panel = $(this).addClass('init'),
                    $trigger = $panel.prev().addClass(o.triggerClass);

                if ($panel.hasClass(o.panelVisibleClass)) {
                    $trigger.addClass(o.triggerActiveClass);
                }
                if (!$trigger.children('i').doesExist()) {
                    $trigger.prepend('<i></i>');
                    base.setIconClasses($trigger);
                }
            });

            return this;
        },
        ajaxNewPanelHandler: function () {
            var base = this;

            this.$accordion.on('ajax.AccordionToggler.newPanel', function () {
                base.setTabPanelInitialStates();
            });

            return this;
        },
        showAll: function ($button, options) {
            var base = this,
                o = base.options,
                defaults = {
                    showPanels: true
                },
                methodOptions = $.extend({}, defaults, options);

            $button.click(function () {
                var hiddenOrVisible = function () { return methodOptions.showPanels ? ':hidden' : ':visible' },
                    $content = base.$content.filter(hiddenOrVisible());
                $content.each(function () {
                    $(this).prev('.' + o.triggerClass).trigger('click');
                });
                methodOptions.showPanels = !methodOptions.showPanels;
            });

            return this;
        }
    };
    widgets.AccordionToggler.defaults = widgets.AccordionToggler.prototype.defaults;

    widgets.Throbber = function ($element, options) {
        this.$throbber = $element;
        this.timer = null;
        this.timeout = 250;
        this.options = $.extend({}, widgets.Throbber.defaults, options);
        this.throbber = new Spinner(this.options);
        this.target = document.getElementById($element.attr('id'));
    };
    widgets.Throbber.prototype = {
        defaults: {
            lines: 13, // The number of lines to draw
            length: 0, // The length of each line
            width: 8, // The line thickness
            radius: 25, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#fff', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: true, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'int-throbber', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        },
        Start: function () {
            var base = this;

            this.timer = setTimeout(function () {
                base.throbber.spin(base.target);
                base.$throbber.show();
            }, base.timeout);

            return this;
        },
        Stop: function () {
            window.clearTimeout(this.timer);
            this.throbber.stop();
            this.$throbber.hide();
            return this;
        }
    };
    widgets.Throbber.defaults = widgets.Throbber.prototype.defaults;

    widgets.Placeholder = function ($element, options) {
        if (!widgets.helpers.hasPlaceholderSupport) {
            this.$input = $element;
            this.options = $.extend({}, widgets.Placeholder.defaults, options);
            this.type = $element.attr('type');
            this.placeholderText = this.$input.attr(this.options.placeholderAttribute);
            this.init();
        }
    };
    widgets.Placeholder.prototype = {
        defaults: {
            tippedClass: 'tipped',
            placeholderAttribute: 'placeholder'
        },
        init: function () {
            var type = this.type;

            if (type != 'file' && type != 'checkbox' && type != 'radio') {
                this.inputFocusHandler();
                this.inputBlurHandler();
                this.inputInitialTextHandler();
                this.inputFormSubmitHandler();
            }

            return this;
        },
        inputFocusHandler: function () {
            var base = this;

            this.$input.on('focus', function () {
                if ($(this).val() == base.placeholderText) {
                    $(this).val('').removeClass(base.options.tippedClass);
                }
                return true;
            });

            return this;
        },
        inputBlurHandler: function () {
            var base = this;

            this.$input.on('blur', function () {
                if ($(this).val() == '') {
                    $(this).val(base.placeholderText).addClass(base.options.tippedClass);
                }
                return true;
            });

            return this;
        },
        inputInitialTextHandler: function () {
            var base = this;

            if (base.$input.val() == '' || base.$input.val() == base.placeholderText) {
                base.$input.val(base.placeholderText).addClass(base.options.tippedClass);
            } else {
                base.$input.removeClass(base.options.tippedClass);
            }
        },
        inputFormSubmitHandler: function () {
            var base = this;

            $(e).parentsUntil('form').parent().submit(function () {
                if (base.$input.val() == base.placeholderText) {
                    base.$input.val('').removeClass(base.options.tippedClass);
                }
            });
        }
    };
    widgets.Placeholder.defaults = widgets.Placeholder.prototype.defaults;

    //Global Handlers handle events at a parent level.
    //Events bubble up to be handled by parent element so new elements added to the DOM may not need to be instantiated as long as they share the same HTML markup
    widgets.Alerts = function ($element, options) {
        this.$parent = $element;
        this.options = $.extend({}, widgets.Alerts.defaults, options);
        this.init();
    };
    widgets.Alerts.prototype = {
        defaults: {
            hideButtonClass: 'int-alertClose'
            , removeButtonClass: 'int-alertRemove'
            , alertClass: 'int-alert'
        },
        init: function () {
            var base = this,
                o = base.options,
                $contentArea = base.$parent,
                $closestAlertFrom = function ($el) {
                    return $el.closest('.' + o.alertClass);
                };

            $contentArea
                .on('click', '.' + o.hideButtonClass, function () {
                    $closestAlertFrom($(this)).hide();
                })
                .on('click', '.' + o.removeButtonClass, function () {
                    $closestAlertFrom($(this)).remove();
                });

            return this;
        }
    };
    widgets.Alerts.defaults = widgets.Alerts.prototype.defaults;

    widgets.TipsyTooltip = function ($el, options) {
        this.$parent = $el;
        this.options = $.extend({}, widgets.TipsyTooltip.defaults, options);
        this.init();
    };
    widgets.TipsyTooltip.prototype = {
        defaults: {
            tooltipSelector: '.int-tooltip[title]'
            , tipsyCalledClass: 'tipsy-tooltip'
        },
        init: function () {
            return this.mouseEnterHandler();
        },
        mouseEnterHandler: function () {
            var o = this.options;

            this.$parent.on('mouseenter', o.tooltipSelector, function () {
                var $el = $(this);

                if (!$el.hasClass(o.tipsyCalledClass)) {
                    $el
                        .tipsy({ gravity: $.fn.tipsy.autoNS })
                        .addClass(o.tipsyCalledClass)
                        .trigger('mouseenter'); //to trigger the tooltip
                }
            });

            return this;
        }
    };
    widgets.TipsyTooltip.defaults = widgets.TipsyTooltip.prototype.defaults;

    widgets.FormHelp = function ($el, options) {
        this.$parent = $el;
        this.options = $.extend({}, widgets.FormHelp.defaults, options);
        this.methods = {
            init: false
        };
        this.init();
    };
    widgets.FormHelp.prototype = {
        defaults: {
            helpMessageClass: 'int-helpDesc'
            , triggerClass: 'int-help'
        },
        init: function () {
            var base = this,
                o = base.options,
                $contentArea = base.$parent,
                messageSelector = '.' + o.helpMessageClass;

            $contentArea.on('click', '.' + o.triggerClass, function () {
                var $messages = $(messageSelector),
                    $message = $(this).parents().eq(2).children(messageSelector),
                    hiddenStr = function () { return ':hidden'; };

                $messages.slideUp(150);

                $message.filter(hiddenStr()).slideDown(150);
            });

            base.methods.init = true;
            return this;
        }
    };
    widgets.FormHelp.defaults = widgets.FormHelp.prototype.defaults;

    widgets.ExpandableTables = function ($el, options) {
        this.$parent = $el;
        this.defaults = {
            tableClassName: 'int-expandingTable'
            , childTableRowClassName: 'int-childTable'
            , triggerRowClassName: 'int-parent'
            , triggerRowHiddenIconClassName: 'int-icon-caret-right'
            , triggerRowVisibleIconClassName: 'int-icon-caret-down'
            , iconMarkup: '<i class="int-icon-caret-right"><a href="#"></a></i>&nbsp;'
            , selectedClassName: 'int-selected'
        };
        this.options = $.extend({}, widgets.ExpandableTables.defaults, options);
        this.hidden = true;
        this.methods = {
            init: false,
            showAll: false
        };
        this.init();
    };
    widgets.ExpandableTables.prototype = {
        defaults: {
            tableClassName: 'int-expandingTable'
            , childTableRowClassName: 'int-childTable'
            , triggerRowClassName: 'int-parent'
            , triggerRowHiddenIconClassName: 'int-icon-caret-right'
            , triggerRowVisibleIconClassName: 'int-icon-caret-down'
            , iconMarkup: '<i class="int-icon-caret-right"><a href="#"></a></i>&nbsp;'
            , selectedClassName: 'int-selected'
            , showAllButton: false
            , $showAllButton: null
        },
        init: function () {
            var base = this,
                o = base.options,
                $parent = base.$parent,
                $childTableRows = $parent.find('.' + o.childTableRowClassName);

            $childTableRows
                .hide()
                .prev('tr').addClass(o.triggerRowClassName);

            var $triggerRows = $parent.find('.' + o.triggerRowClassName);

            prependIcon();
            triggerRowClickHandler();

            function prependIcon() {
                $triggerRows.children('td:first-child').remove('i').prepend(o.iconMarkup);
            }
            function triggerRowClickHandler() {
                $parent.on('click', '.' + o.triggerRowClassName, function () {
                    $(this).toggleClass(o.selectedClassName).next('.' + o.childTableRowClassName).fadeToggle(0);
                    $(this).children(':first-child').children('i').toggleClass(o.triggerRowHiddenIconClassName).toggleClass(o.triggerRowVisibleIconClassName);
                });
            }

            if (o.showAllButton) {
                this.showAll(o.$showAllButton);
            }
            return this;
        },
        showAll: function ($button) {
            var base = this,
                o = base.options;

            $button.click(function () {
                var $childTableRows = base.$parent.find('.' + o.childTableRowClassName),
                    $triggersWithHiddenChildTableRows = $childTableRows.filter(':hidden').prev('.' + o.triggerRowClassName),
                    $TriggersWithVisibleChildTableRows = $childTableRows.filter(':visible').prev('.' + o.triggerRowClassName),
                    $triggers = (base.hidden) ? $triggersWithHiddenChildTableRows : $TriggersWithVisibleChildTableRows;
                $triggers.trigger('click');
                base.hidden = !base.hidden;
            });

            base.methods.showAll = true;
            return this;
        }
    };
    widgets.ExpandableTables.defaults = widgets.ExpandableTables.prototype.defaults;

}(jQuery, window.OU.Widgets = window.OU.Widgets || {}, window, document));

//Widget Plugins
//Plugins consumes the above widget classes, and protects against multiple instantiation and should be used by default unless more control is required
(function ($, helpers, widgets, fix, undefined) {
    //Widgets R2.1
    helpers.pluginfy('OUFilter', widgets, 'Filter');
    helpers.pluginfy('OUButtonTextToggler', widgets, 'ButtonTextToggler');
    helpers.pluginfy('OUCheckAll', widgets, 'CheckAll');
    helpers.pluginfy('OUTreeCheckAll', widgets, 'TreeCheckAll');
    helpers.pluginfy('OUStickyTableHeader', widgets, 'StickyTableHeader');
    helpers.pluginfy('OUMultiSelect', widgets, 'MultiSelect');
    helpers.pluginfy('OUSwitchButtons', widgets, 'SwitchButtons');
    helpers.pluginfy('OUCheckboxButton', widgets, 'CheckboxButton');
    helpers.pluginfy('OUListbox', widgets, 'Listbox');
    helpers.pluginfy('OUTreeToggle', widgets, 'TreeToggle');
    helpers.pluginfy('OUTabs', widgets, 'Tabs');
    helpers.pluginfy('OUPanels', widgets, 'Panels');
    helpers.pluginfy('OURemainingCharactersCounter', widgets, 'RemainingCharactersCounter');

    //Widgets R1
    helpers.pluginfy('OUDropDownMenu', widgets, 'DropDownMenu');
    helpers.pluginfy('OUToggler', widgets, 'Toggler');
    helpers.pluginfy('OUAccordionToggler', widgets, 'AccordionToggler');
    helpers.pluginfy('OUPlaceholder', widgets, 'Placeholder');
    //Widgets R1 Global Handlers
    helpers.pluginfy('OUAlerts', widgets, 'Alerts');
    helpers.pluginfy('OUTipsyTooltip', widgets, 'TipsyTooltip');
    helpers.pluginfy('OUFormHelp', widgets, 'FormHelp');
    helpers.pluginfy('OUExpandableTables', widgets, 'ExpandableTables');

    //Chainable plugin version of fixes
    $.fn.oufix = function (widget, options) {
        var cases = ['ui-autocomplete', 'ui-combobox', 'ui-datepicker'],
            index = $.inArray(widget, cases);

        return this.each(function () {
            if (index === 0) {
                fix.jQueryUIAutoComplete($(this), options);
            }
            if (index === 1) {
                fix.jQueryUIComboBox($(this), options);
            }
            if (index === 2) {
                fix.jQueryUIDatePicker($(this), options);
            }
        });
    };

})(jQuery, OU.Widgets.helpers, OU.Widgets, OU.Widgets.fixes);