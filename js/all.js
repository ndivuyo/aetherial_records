/*
Dillon Bastan, 2015.
This is the JavaScript for managing small, general tasks for all pages.
*/


$(document).ready( function() {


	//Maintain a minimun background size
	$(window).resize( function() {
		backgroundSizing();
	});


	//Open the input for the clients email for the newsletter
	$('#newsletterButton').on("click", function() {

		$('#newsletterButton').toggleClass('em');

		if( $('#newsletterButton').hasClass("em")) {
			$('#newsletterInput').css('visibility', 'visible');
			$('#newsletterInput input[type="email"]').focus();
		} else
			$('#newsletterInput').css('visibility', 'hidden');
	});


	//Newsletter form handling. Calls on the newsletter.php file
	$('#newsletterForm').submit( function() {

		var url = "php/newsletter.php",
			value = $("#clientEmail").val(),
			data = {'clientEmail' : value};

		$.post(url, data, function(response) {

			$('#newsletterStatus').html(response);
		});

		return false;
	});

});


//Function to maintain a minimun background size
var backgroundSizing = function() {

	var $content = $('body'),
		contentWidth = $content.width();

	if (contentWidth <= 800) {
		$content.css('background-size', '800px 100%')
	} else {
		$content.css('background-size', '100% 100%')
	}
};


//Underlines the link of the current page
var underlineLink = function(pageName) {

	//First check if it's an index page or not
	var isIndex = pageName.indexOf('_');
	if (isIndex !== -1)
		pageName = pageName.substring(0, isIndex);

	$('#' + pageName + "_link").addClass('em');
};