/*
Dillon Bastan, 2015.
This is the JavaScript for managing the releases page.
*/


$(document).ready( function() {

	//Render albums on HTML
	displayAlbums(0);

	//Offset Main content based on window size to get flush with left side.
	$("section.mainContent").bind("DOMNodeInserted", function() {
		offSetContent();
	});
	$(window).resize( function() {
		offSetContent();
	});
	
});


//Loads album data from JSON file and renders album on HTML document
var displayAlbums = function(pageNumber) {

	$.getJSON("js/json/albums.json", function(data) {

		$(data.albums).each( function() {
	
			var album = new Album();

			album.setAttr(album.figure, "id", this.title);
			album.setAttr(album.aCover, "href", this.site);
			album.setAttr(album.imageCover, "src", this.cover);
			album.setAttr(album.imageCover, "alt", this.title);
			album.setAttr(album.aSite, "href", this.site);
			album.setAttr(album.aArtist, "href", "index.php?pageName=artists_index&artistName=" + this.artists[0]);

			//May need to loop if multiple artists?
			var albumInfo = "." + this.title.toUpperCase();

			album.setHTML(album.aArtist, this.artists[0].toUpperCase());
			album.setHTML(album.divName, albumInfo);
			album.setHTML(album.divYear, this.year);

			if(this.year != "TBA")
				album.setHTML(album.aSite, "Buy");
			else
				album.setHTML(album.aSite, "coming soon");;

			//Append together elements in the figure
			album.appendElements();
			$("section.mainContent").append(album.figure);
		});
	});
};


//Offset Main content based on window size to get flush with left side.
var offSetContent = function() {

	var $content = $('section.mainContent'),
		contentWidth = $content.width();

	if (contentWidth >= 640)
		$content.css('left', '15px');
	else if (contentWidth >= 610)
		$content.css('left', ((contentWidth - 610) / 2) + 'px');
	else
		$content.css('left', '0');
}