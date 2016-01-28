/*
Dillon Bastan, 2015.
This is the JavaScript for managing the artists page.
*/


$(document).ready( function() {

	//Render artists on HTML
	displayArtists();

});


//Loads artist data from JSON file and renders artist on HTML document
var displayArtists = function() {

	$.getJSON("js/json/artists.json", function(data) {

		$(data.artists).each( function() {

			var artistName = document.createElement('a');

			$(artistName).attr("href", "index.php?pageName=artists_index&artistName=" + this.name);
			$(artistName).html(this.name.toUpperCase());

			$("nav.mainContent").append(artistName);
		});
	});
};