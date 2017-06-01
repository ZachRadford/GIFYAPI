
var games = ["Final Fantasy VII", "Deus Ex", "Devil May Cry", "World of Warcraft", "DOOM", "Duke Nukem", "Pac-man", "Counter-Strike"]

var queryURL = "//api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q="

var allowedRatings = ["g", "pg", "y", "pg-13"]



function createButtons(games){
	$("#buttonContainer").empty();

	for (i in games){
		$("#buttonContainer").append("<button class=\"gifSearch\" value='"+ games[i] +"'>" + games[i] + "</button>")
	}
}


function makeRequest(allowedRatings, queryURL){
	$("#gifContainer").empty();

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response){
		console.log(response)

		var results = response.data;

		for (i in results){
			console.log("ratings", allowedRatings, results[i].rating, allowedRatings.indexOf(results[i].rating))

			if (allowedRatings.indexOf(results[i].rating) >= 0){

				var gifDiv = $("<div class='main'>");

				var ratingP = $("<p>").text("Rating: " + results[i].rating);

				var gifIMG = $("<img>");

				gifIMG.attr("src", results[i].images.fixed_height_still.url);
				gifIMG.attr("alt-src", results[i].images.fixed_height.url)

				gifDiv.append(ratingP);
				gifDiv.append(gifIMG);
				console.log(gifDiv)

				$("#gifContainer").append(gifDiv);
			}

		}
	})
}










$(document).ready(function(){
	createButtons(games);

	$("#buttonContainer").on("click", ".gifSearch",  function(){
		makeRequest(allowedRatings, queryURL + $(this).val());

	})


	$("form").on("submit", function(event){
		event.preventDefault();
		games.push($("#inputBox").val());
		createButtons(games);
		makeRequest(allowedRatings, queryURL + $("#inputBox").val())
	})


	$("#gifContainer").on("click", ".main",  function(){
		var img = $(this).find("img");

		var src = img.attr("src");

		img.attr("src", img.attr("alt-src"));
		img.attr("alt-src", src);
	})

})