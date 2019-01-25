artists = [];

// function displayArtist(response) {

//     for (var i = 0; i < response.results.length; i++) {
//         // artist[response.results[i]].push({"artistName", "artistID", "artworkUrl100"})
//         var imgURL = response.results[i].artworkUrl100;
//         if (imgURL) {
//             imgURL = imgURL
//             var image = $("<img class='img-fluid' alt='Image Unavailable'>").attr("src", imgURL);
//             var artistDiv = //artistDiv to be styled
//             artistDiv.attr("data-artistID", "data-collectionID", response.results[i].artistName);
//             artistDiv.append(image);
//             artistDiv.hide();
//             $("#movie-search-movies").append(movieDiv);
//     };
// };

function displayMovies(response) {

    for (var i = 0; i < response.results.length; i++) {

        var imgURL = response.results[i].artworkUrl100;
        if (imgURL) {
            imgURL = "https://image.tmdb.org/t/p/original/" + imgURL
            var image = $("<img class='img-fluid' alt='Image Unavailable'>").attr("src", imgURL);
            var movieDiv = $("<div class='movie'>");
            movieDiv.attr("data-title", response.results[i].title);
            movieDiv.append(image);
            movieDiv.hide();
            $("#movie-search-movies").append(movieDiv);
        };
    };

    var movieCount = $("#movie-search-movies").children().length;
    if (movieCount > 0) {
        $(".movie-count").text(" - " + movieCount + " movie(s) found");
        $("#movie-search-wrapper").show();
    } else {
        $(".movie-count").text(" - 0 movies found");
        $('#modal-title').text("Movie Search");
        $('#modal-message').text("No movies found based on your search.");
        $('#modal-box').modal('show');
    };

    $(".movie").fadeIn("slow", function () {
        //animation complete
    });
};

function getArtists() {
    queryURL = "https://itunes.apple.com/search?term=" + term + "&entity=musicArtist";


    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "JSON"
    }).then(function (response) {
        console.log(response);
        var artistId = [];
        var artists = response.results;
        for (var i = 0; i < artists.length; i++) {
            if (artistId.indexOf(artists[i].artistId) === -1) {
                artistId.push(artists[i].artistId);
            }//if
        }//for
        queryURL = "https://itunes.apple.com/lookup?id=" + artistId.toString() + "&entity=album&media=music&limit=1";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "JSON",
        }).then(function (response) {
            console.log(response);
            $("#music-search-albums").empty();
            for (var i = 0; i < response.results.length; i++) {
                if (response.results[i].wrapperType === "collection") {
                    var imgURL = response.results[i].artworkUrl100.replace("100x100", "200x200");
                    console.log(imgURL);
                    if (imgURL) {

                        var image = $("<img class='img-fluid' alt='Image Unavailable'>").attr("src", imgURL);
                        var albumDiv = $("<div class='album'>");
                        albumDiv.attr("data-id", response.results[i].artistId);
                        albumDiv.append(image);
                        $("#music-search-albums").append(albumDiv);
                    };//if
                };//if
            };//for
            console.log($("#music-search-albums").children().length);
            // displayArtists();
        });//then
    });//then
};


//     var artistCount = $("#movie-search-movies").children().length;
//     if (artistCount > 0) {
//         $(".movie-count").text(" - " + artistCount + " artist(s) found");
//         $("#movie-search-wrapper").show();
//     } else {
//         $(".movie-count").text(" - 0 artists found");
//         $('#modal-title').text("Artist Search Search");
//         $('#modal-message').text("No artists found based on your search.");
//         $('#modal-box').modal('show');
//     };

//     $(".movie").fadeIn("slow", function () {
//         //animation complete
//     });
// };

$("#search-button").on("click", function (event) {
    event.preventDefault();
    term = $("#search-term").val().trim();
    term = term.replace(/\W+/g, '+').toLowerCase();

    switch ($("#search-by").val()) {
        case "Movie":
            resetMovieSearch();
            page = 1; // start on page one of possible movie search results
            searchTMDB();
            break;
        case "Music Artist":
            getArtists();
            break;
    }

});

function getMovieSuggestions() {
    queryURL = "https://itunes.apple.com/lookup?id=" + $(this).attr("data-id") + "&entity=song&media=music";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "JSON",
    }).then(function (response) {
        console.log(response);
    });

};//function



$(document).on("click", ".album", getMovieSuggestions);



