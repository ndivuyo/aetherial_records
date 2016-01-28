/*
Dillon Bastan, 2015.
This is the JavaScript for managing the individual artist pages.
*/


//Loads artists data from JSON file and renders project on HTML document
var renderArtist = function(artistName) {

	$.getJSON("js/json/artists.json", function(data) {

		$(data.artists).each( function() {

			if (this.name === artistName) {

				var i = 0,
					linkNames = this.linkNames;

				$('img.artistPhoto').attr('src', this.photo);
				$('img.artistPhoto').attr('alt', this.name);
				$('#artistName').html(this.name.toUpperCase());
				$('#question1').html(this.question1);
				$('#question2').html(this.question2);
				$('#question3').html(this.question3);
				$('#question4').html(this.question4);

				//Add Website links
				if(this.links.length != 0) {
					$(this.links).each( function() {
						var newA = document.createElement('a');
						$(newA).attr('href', this);
						$(newA).html(linkNames[i++]);
						$('#artistLinks').append(newA);
					});
				}

				//Add Albums with links
				if(this.albums.length != 0) {
					$(this.albums).each( function() {
						var newA = document.createElement('a'),
							newImg = document.createElement('img'),
							currentAlbum = this;

						$.getJSON("js/json/albums.json", function(data) {

							$(data.albums).each( function() {

								if (this.title == currentAlbum) {

									$(newA).attr('href', this.site);
									$(newImg).attr('src', this.cover);
									$(newImg).attr('alt', this.title);

									return false;
								} else {
									$(newImg).attr('src', "");
									$(newImg).attr('alt', "Not Found");
								}
							});
						});

						$(newA).append(newImg);
						$('#projectLinks').append(newA);
					});
				}

				//Add Projects with links
				if(this.projects.length != 0) {
					$(this.projects).each( function() {
						var newA = document.createElement('a'),
							newImg = document.createElement('img'),
							currentProject = this;

						$.getJSON("js/json/projects.json", function(data) {

							$(data.projects).each( function() {

								if (this.title == currentProject) {

									$(newA).attr('href', "index.php?pageName=projects_index&projectName=" + this.title);
									$(newImg).attr('src', this.mainImage);
									$(newImg).attr('alt', this.title);

									return false;
								} else {
									$(newImg).attr('src', "");
									$(newImg).attr('alt', "Not Found");
								}
							});
						});

						$(newA).append(newImg);
						$('#projectLinks').append(newA);
					});

					//Exit $.each loop
					return false;
				}
			}
		});
	});
};