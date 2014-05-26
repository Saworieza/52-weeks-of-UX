$(document).ready(function () {
    $('#headerSearch').keydown(function (e) {
        if (e.keyCode == 13) {
            var searchTerm = $('#headerSearch').val();
            ouSearch(searchTerm);
            return false;
        }
        return true;
    });

});

function ouSearch(searchTerm) {
    window.open('http://search.open.ac.uk/public/search/results?q=' + searchTerm, '_self');
}