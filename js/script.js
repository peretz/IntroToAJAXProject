
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

    // load New York Times articles.
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "",
        'q': city,
        'sort': "newest"
    });

    $.getJSON( url, function( data ) {
        $nytHeaderElem.text("New York Times articles about " + city);

        var articles = data.response.docs;
        var items = [];
        $.each( articles, function( key, article) {
            var articleAsHTML = "<li class='article'>";
            articleAsHTML += "<a href='" + article.web_url + "'>";
            articleAsHTML += article.headline.main;
            articleAsHTML += "</a>";
            articleAsHTML += "<p>" + article.snippet + "</p>";
            articleAsHTML += "</li>";

            items.push( articleAsHTML );
        });

        $nytElem.append(items.join(""));
    }).fail(function () {
        $nytHeaderElem.text("New York Times articles could not be loaded.");
    });

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
