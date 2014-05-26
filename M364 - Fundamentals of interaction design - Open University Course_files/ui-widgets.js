OUApp.Modules.ui_widgets = {
    
    toggler: function () {
        
        $('.int-toggler').each(function () {
            var trigger = $(this).find('.int-toggleTrigger');
            trigger.html('<a href="#"><b class="int-icon-btn closed"><i class="int-icon int-icon-plus"></i></b><b class="int-icon-btn open"><i class="int-icon int-icon-minus"></i></b><span> '+ trigger.text() +'</span></a>');                
        });
        $('.int-toggleTrigger').on('click', function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('int-active'); 
        });

    },
    
    accordion: function () {
        $('.int-accordion').accordion({
            heightStyle: "content"
        });
        //$('.int-accordion .ui-accordion-header').prepend('<span class="int-icon-btn int-accordion-closed"><i class="int-icon int-icon-chevron-right"></i></span><span class="int-icon-btn int-icon-btn-active int-accordion-open"><i class="int-icon int-icon-chevron-down"></i></span>');
    },
    
    init: function () {
        this.accordion();
        this.toggler();
    }
    
};