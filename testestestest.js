function displayArtist(response) {

    for (var i = 0; i < response.results.length; i++) {

        var imgURL = response.results[i].artworkUrl100;
        if (imgURL) {
            imgURL = imgURL
            var image = $("<img class='img-fluid' alt='Image Unavailable'>").attr("src", imgURL);
            var artistDiv = $("<div class='movie'>");
            $(".movie").attr("style", "border: 1px solid black;");
            $(artistDiv).attr("style", "border: 4px solid yellow;");
            artistDiv.attr("data-artistName", response.results[i].artistName);
            artistDiv.append(image);
            artistDiv.hide();
            $("#movie-search-movies").append(movieDiv);
        };
    };

function getArtists(){
    term = $(this).attr("data-artistName");
    queryURL = queryURL = "https://itunes.apple.com/search?artistTerm=" + term + "&descriptionTerm=Soundtrack";
    $(".movie").attr("style", "border: 1px solid black;");
    $(this).attr("style", "border: 4px solid yellow;");
    displayArtist();
    if (term === $(this).attr("data-artistName")) { return false };

    $(".soundtrack-count").text(" - Searching...");

    $("#movie-search-soundtracks").empty();
    $("#soundtrack-table").empty();
    $("#soundtrack-header").text("Soundtrack");

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "JSON"
    }).then(function(response) {
        console.log(response);
        displayArtists();

        }
    });
}


    var artistCount = $("#movie-search-movies").children().length;
    if (artistCount > 0) {
        $(".movie-count").text(" - " + artistCount + " artist(s) found");
        $("#movie-search-wrapper").show();
    } else {
        $(".movie-count").text(" - 0 artists found");
        $('#modal-title').text("Artist Search Search");
        $('#modal-message').text("No artists found based on your search.");
        $('#modal-box').modal('show');
    };

    $(".movie").fadeIn("slow", function() {
        //animation complete
    });
};



switch ($("#search-by").val()) {
    case "Movie":
        resetMovieSearch();
        page = 1; // start on page one of possible movie search results
        searchTMDB();
        break;
     case "Music Artist":
        resetMovieSearch();
        page = 1
        getArtists();
        break;
};
});