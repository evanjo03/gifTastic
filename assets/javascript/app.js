$(document).ready(function () {
    //create an array of our topics
    var topics = ["tennis", "basketball", "swimming", "ultimate frisbee"];
    genButtons();

    //generate our buttons
    function genButtons() {
        for (i = 0; i < topics.length; i++) {
            $("#buttonList").append(`<button type='button' class='btn topics btn-primary m-2' datatype='${topics[i]}'>${topics[i]}</button>`);
        }
    }

    //adding buttons
    $("#newButton").on("click", function () {
        var selection = $("#examplegifsearch1").val();
        if (selection) {
            $("#buttonList").empty();
            topics.push(selection);
            genButtons();
        }
    });

    //freezing and unfreezing the images
    $(document).on("click", ".image", function () {
        if ($(this).attr("data-state") === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        } else if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        }
    });

    //clicking a button to call images down
    $(document).on("click", ".topics", function () {
        console.log(topics);
        var chosen = $(this).attr("datatype").trim();

        //api call
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=V97eJAMN9XWcRk1EQqM2qMfEfTIaroKt&q=" + chosen + "&limit=25&offset=0&rating=G&lang=en"

        //ajax
        $.ajax({
            url: queryUrl,
            method: "Get"
        }).then(function (response) {
            for (i = 0; i < 10; i++) {
                var results = response.data;
                var imgUrl = results[i].images.original.url;
                var imgStill = results[i].images.original_still.url;
                var rating = results[i].rating;
                var gifRating = $("<div>").attr("class", "caption").text("Rating: " + rating);
                var gifImg = $('<img>').attr("src", imgStill).attr("class", "img-fluid image").attr("data-still", imgStill).attr("data-state", "still").attr("data-animate", imgUrl);
                var gifDiv = $("<div>").attr("class", "imageContainer m-2 p-2").append(gifImg).append(gifRating);
                $("#gifList").prepend(gifDiv);
            }
        });
    });
});



