
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $("#street").val();
    var city = $("#city").val();

    var urlSource = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + street + ", " + city;  
    $body.append('<img class="bgimg" src="' + urlSource + '">');

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
