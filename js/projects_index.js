/*
Dillon Bastan, 2015.
This is the JavaScript for managing the individual project pages.
*/


var slideshowLength, 
	renderedIndex = 0;


//Observing DOM changes, then starting slideshow when render complete
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver( function(mutations) {
	mutations.forEach( function() {

 		renderedIndex++;

		//Upon completion of appending elements, evaluate slideshow function
		if (renderedIndex - 1 === slideshowLength) {
			slideshow();
			observer.disconnect();
		}
	})
});
var mutationTarget = document.querySelector('ul.slideshow');
observer.observe(mutationTarget, { childList: true });


//Loads projects data from JSON file and renders project on HTML document
var renderProject = function(projectName) {
	$.getJSON("js/json/projects.json", function(data) {

		$(data.projects).each( function() {

			if (this.title === projectName) {

				slideshowLength = $(this.slideshow).length - 1;

				//Add Images or Videos for slideshow
				$(this.slideshow).each( function() {
					var newLi = document.createElement('li'),
						newSpan = document.createElement('span'),
						newContent;

					//Determine if image or video
					if(this.indexOf("images/") !== -1) {
						newContent = document.createElement('img');
						$(newContent).attr('alt', this);
					} else {
						newContent = document.createElement('iframe');
						$(newContent).attr('frameborder', 0);
					}

					$(newContent).attr('src', this);
					$(newSpan).addClass('center');
					$(newLi).append(newSpan, newContent);
					$('ul.slideshow').append(newLi);
				});

				var navArtists = document.createElement('nav'),
					strTitle;

				//Add all artists involved
				$(this.artists).each( function() {

					var aArtist = document.createElement('a');

					$(aArtist).html(this.toUpperCase() + ".");
					$(aArtist).attr('href', "index.php?pageName=artists_index&artistName=" + this);
					$(navArtists).append(aArtist);
				});

				strTitle = this.title.toUpperCase() + "." + this.year;

				$('#projectTitle').append(navArtists, strTitle);
				$('p.projectInfo').html(this.description);

				//Exit $.each loop
				return false;
			}
		});
	});
};


//Slideshow function
var slideshow = function() {

	var target,
		$moveImages = $('ul.slideshow li'),
		lastImage = $moveImages.length - 1,
		$slideshowMask = $('div.slideshow ul.slideshow'),
		imageWidth = $moveImages.width();

	//Active class to show current image
	$moveImages.addClass('active');
	$slideshowMask.css('width', imageWidth * (lastImage + 1) + 'px');

	//Function to slide the image
	var slideImage = function(target) {

		$slideshowMask.stop(true, false).animate(
			{'left': '-' + imageWidth * target + 'px'}, 300
		);
		$moveImages.removeClass('active').eq(target).addClass('active');
	};

	//Previous Image
	$('.prevImage').on('click', function() {

		target = $('ul.slideshow li.active').index();
		target === 0 ? target = lastImage : target --;
		slideImage(target);
	});

	//Next Image
	$('.nextImage').on('click', function() {

		target = $('ul.slideshow li.active').index();
		target === lastImage ? target = 0 : target ++;
		slideImage(target);
	});
};