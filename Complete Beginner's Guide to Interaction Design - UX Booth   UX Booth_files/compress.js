/*

Get Gravatar v1.0
Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.3 or newer

Thanks to Tim Van Damme for the inspiration and the pretty demo page

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Usage:

$("input#email-addresss").getGravatar();

Or you can specify some custom options:

$("input#email-address").getGravatar({
	url: '/includes/get-gravatar.php',
	fallback: 'http://mysite.com/images/default.png',
	avatarSize: 128,
	avatarContainer: "#gravatar-preview",
	start: function(){
		alert("starting!");
	},
	stop: function(){
		alert("stopping!");
	}
});

Enjoy!

*/

(function($) {
  $.fn.getGravatar = function(options) {
    //debug(this);
    // build main options before element iteration
    var opts = $.extend({}, $.fn.getGravatar.defaults, options);
    // iterate and reformat each matched element
    return this.each(function() {
      $this = $(this);
      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var t = "";
			//check to see if we're working with an text input first
      if($this.is("input[type='text']")){
				//do an initial check of the value
				$.fn.getGravatar.getUrl(o, $this.val());
				
				//do our ajax call for the MD5 hash every time a key is released
				$this.keyup(function(){
					clearTimeout(t);
					var email = $this.val();
					t = setTimeout(function(){$.fn.getGravatar.getUrl(o, email);}, 500);
				});
			}
    });
  };
  //
  // define and expose our functions
  //
	$.fn.getGravatar.getUrl = function(o, email){
		//call the start function if in use
		if(o.start) o.start($this);
		
		$.get(o.url, "email="+email, function(data){
			//when we have our MD5 hash, generate the gravatar URL
			var id = data.gravatar_id;
			var gravatar_url = "http://gravatar.com/avatar.php?gravatar_id="+id+"&default="+o.fallback+"&size="+o.avatarSize;
			//call our function to output the avatar to the container
     	$.fn.getGravatar.output(o.avatarContainer, gravatar_url, o.stop);
		}, "json");
	}
  $.fn.getGravatar.output = function(avatarContainer, gravatar_url, stop) {
		//replace the src of our avatar container with the gravatar url
		img = new Image();
		$(img)
		.load(function(){
			$(avatarContainer).attr("src", gravatar_url);
			if(stop) stop();
		})
		.attr("src", gravatar_url);
  };
  //
  // plugin defaults
  //
  $.fn.getGravatar.defaults = {
   	url: 'get-gravatar.php',
    fallback: '',
		avatarSize: 50,
		avatarContainer: '#gravatar',
		start: null,
		stop: null
  };
})(jQuery);



$(document).ready(function() {
  var SITEURL = "http://www.uxbooth.com";
    
  $('form.search .search-input.field input').focus(function(){
    $(this).parents('.search').addClass('focus');
  });
  
  $('form.search .search-input.field input').blur(function(){
    if ($(this).val() == "") {
      $(this).parents('.search').removeClass('focus');      
    };
  });
  
  // Anchors
   $('a.active.collapsible').live("click", function() {
     $(this).removeClass("active");
     var href = $(this).attr("href");
     $(href).fadeOut();
     $(this).find('span.response').html("Show");
     return false;
   });

   $('a.collapsible:not(.active)').live("click", function() {
     $(this).addClass("active");
     var href = $(this).attr("href");
     $(href).fadeIn();
     $(this).find('span.response').html("Hide");
     return false;
   });

   // Hide any elements that are not hidden but should be
   $('a.collapsible:not(.active)').each(function(){
     if($(this).attr("href") != '#search'){
       var href = $(this).attr("href");
       $(href).hide();
     }
   });
   
   $('.place-holder-text').focus(function() {
     if(this.value == this.defaultValue) {
       this.value = '';
       $(this).addClass('active')
     }
   });

   $('.place-holder-text').blur(function() {
     if(this.value == '') {
       this.value = this.defaultValue;
       $(this).removeClass('active')
     }
   });

   
   
   $('body#resource span.source a, ul.favicon-list li a').each(function(){ 
		 var hoststring = /^http:/;
     var hrefvalue = $(this).attr('href');
     var trackbackItem = $(this).parent();
     
     	if (hrefvalue.search(hoststring) != -1) {
				var domain = hrefvalue.match(/(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/);
				domain = RegExp.$2;
				var cuesrc = "http://"+domain+"/favicon.ico";
				
				var cue = document.createElement("img");
 				cue.setAttribute("src",cuesrc);
 				cue.onerror = function () {
 					this.src = "/images/external.gif"; 				
 			  }
        trackbackItem.prepend(cue);
		  }
   });
   
   
   
   //Soup up the Comment Form
   $("#commentform #author").blur(function() {
     var authorName = this.value;
     $("#commentform .preview .author h5").text(authorName);
   });
   
        
   $("#commentform #email").getGravatar({
   	url: 'http://www.uxbooth.com/wp-content/themes/uxbv2/includes/get-gravatar.php',
   	fallback: 'http://www.uxbooth.com/wp-content/themes/uxbv2/images/icons/gravatar.png',
   	avatarSize: 64,
   	avatarContainer: '#gravatar-preview'
   });
   

});

addComment={moveForm:function(d,f,i,c){var m=this,a,h=m.I(d),b=m.I(i),l=m.I("cancel-comment-reply-link"),j=m.I("comment_parent"),k=m.I("comment_post_ID");if(!h||!b||!l||!j){return}m.respondId=i;c=c||false;if(!m.I("wp-temp-form-div")){a=document.createElement("div");a.id="wp-temp-form-div";a.style.display="none";b.parentNode.insertBefore(a,b)}h.parentNode.insertBefore(b,h.nextSibling);if(k&&c){k.value=c}j.value=f;l.style.display="";l.onclick=function(){var n=addComment,e=n.I("wp-temp-form-div"),o=n.I(n.respondId);if(!e||!o){return}n.I("comment_parent").value="0";e.parentNode.insertBefore(o,e);e.parentNode.removeChild(e);this.style.display="none";this.onclick=null;return false};try{m.I("comment").focus()}catch(g){}return false},I:function(a){return document.getElementById(a)}};