
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
    var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytURL += '?' + $.param({
        'api-key': "", // Add your own New York Times API KEY.
        'q': city,
        'sort': "newest"
    });

    $.getJSON( nytURL, function( data ) {
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

    // Load wikipedia articles using JSONP
    var wikipediaURL = "https://en.wikipedia.org/w/api.php";
    wikipediaURL += '?' + $.param({
        'action': "opensearch",
        'search': city,
        'format': "json"
    });

    var wikiTimeoutRequest = setTimeout(function(){
        $wikiElem.text("Failed to get wikipedia resources");    
    }, 8000);

    $.ajax( {
        url: wikipediaURL,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var linksToArticles = data[1];
            console.log(linksToArticles);
            var items = [];
            $.each( linksToArticles, function(key, link) {
                console.log(link);
                var articleAsHTML = "<li>";
                articleAsHTML += "<a href='http://en.wikipedia.org/wiki/" + link + "'>";
                articleAsHTML += link;
                articleAsHTML += "</a>";
                articleAsHTML += "</li>";

                items.push( articleAsHTML );
            });

            $wikiElem.append(items.join(""));

            clearTimeout(wikiTimeoutRequest);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
