$("#searchButton").on("click", function(event) {
    event.preventDefault();
    term = $("#searchTerm").val().trim();
    term = term.replace(/\W+/g, '+').toLowerCase();
    console.log(term);
    $("#displayArea").empty();

    switch ($("#searchBy").val()) {
        case "Movie":
            page = 1; // start on page one of possible movie search results
            searchTMDB();
            break;
// ------------------------------------------------------------------------------//
        case "Music Artist":
        term = $(this).attr("data-artistName").val().trim().toLowerCase();
        var queryURL = "https://itunes.apple.com/search?term=" + term + "&limit=20&media=music&entity=album"
            page = 1;
            function searchByArtist()
        //     totalPages = response.total_pages;
        // var totalResults = response.total_results;
        
        if (totalResults === 0) {
            var divP = $("<p>").text("No Results Found");
            $("#displayArea").append(divP);
        } else {
            displayMovies(response);
            };
            break;
            }
    };
});

function getMovieSoundtrack() {
    $(".soundtrack-count").text(" - Searching...");
    $(".movie").attr("style", "border: 1px solid black;");
    $(this).attr("style", "border: 4px solid yellow;");

    $("#movie-search-soundtracks").empty();
    term = $(this).attr("data-title");
    queryURL = "https://itunes.apple.com/search?term=" + term.replace(/\W+/g, '+').toLowerCase() + "&limit=200&media=music&entity=album&country=us&genreId=" + genres.Soundtrack;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "JSON"
    }).then(function(response) {
        console.log(response);
        var soundtracks = response.results;
        var albumIDS = [];
        for (var i = 0; i < soundtracks.length; i++) {
            if (soundtracks[i].collectionName.replace(/,/g, '').includes(term.replace(/,/g, '')) && soundtracks[i].primaryGenreName === "Soundtrack" && soundtracks[i].trackCount > 1) {
                albumIDS.push(soundtracks[i].collectionId);
            }
        }

        if (albumIDS.length > 0) {
            $("#movie-search-soundtracks").empty();
            queryURL = "https://itunes.apple.com/lookup?id=" + albumIDS.toString() + "&entity=song";

            $.ajax({
                url: queryURL,
                method: "GET",
                dataType: "JSON"
            }).then(function(response) {
                console.log(response);
                displayMovieSoundtrack(response)
            });
        } else {
            $('#modal-title').text("Soundtrack(s)");
            $('#modal-message').text("No soundtracks were found for the selected movie.");
            $('#modal-box').modal('show');
            $(".soundtrack-count").text(" - 0 soundtrack(s) found");
        };
    });
};