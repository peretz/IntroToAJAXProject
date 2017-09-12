
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
        'api-key': "" // Write your New York Times API Key.
        'q': "harvey",
        'begin_date': "20170912",
        'sort': "newest"
    });
    console.log(url);

    $.getJSON( url, function( data ) {
        var articles = data.response.docs;
        var items = [];
        //console.log(articles);
        $.each( articles, function( key, article) {
            var articleAsHTML = "<li class='article'>";
            articleAsHTML += "<a href='" + article.web_url + "'>";
            articleAsHTML += article.headline.main;
            articleAsHTML += "</a>";
            articleAsHTML += "<p>" + article.snippet + "</p>";
            articleAsHTML += "</li>";
            //console.log(articleAsHTML);

            items.push( articleAsHTML );
        });

        $("#nytimes-articles").append(items.join(""));
    });

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
