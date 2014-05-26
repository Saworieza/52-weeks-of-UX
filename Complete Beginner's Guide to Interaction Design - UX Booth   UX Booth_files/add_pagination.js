function pageselectCallback(page_index, jq){			  
  var items_per_page = 10;
  var num_entries = $('#resources div.post').length;

  var max_elem = Math.min((page_index+1) * items_per_page, num_entries);

  var newcontent = document.createElement("div");
  var newcontent = $(newcontent).addClass("posts");
        
  // Iterate through a selection of the content and build an HTML string
  for(var i = page_index*items_per_page; i < max_elem; i++)
  {
      newcontent.append($('#resources div.post:eq('+i+')').clone());
  }

  // Replace old content with new content
  $('#pagination-panel').html(newcontent);
      return false;
}

/** 
 * Callback function for the AJAX content loader.
 */
function initPagination() {
    var num_entries = $('#author #resources div.post').length;
    // Create pagination element
    $("#pagination-navigation").pagination(num_entries, {
        num_edge_entries: 0,
        num_display_entries: 4,
        callback: pageselectCallback,
        items_per_page:10
    });
    $('#author #resources').hide();
 }
        
// Load HTML snippet with AJAX and insert it into the Hiddenresult element
// When the HTML has loaded, call initPagination to paginate the elements        
$(document).ready(function(){      
    initPagination();
});
      
