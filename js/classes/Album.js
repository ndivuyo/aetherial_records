/*
Dillon Bastan, 2015.
Class for an album release and methods for rendering the html.
*/

var Album = function() {

	this.figure = document.createElement('figure'),
	this.imageCover = document.createElement('img'),
	this.figcaption = document.createElement('figcaption'),
	this.aCover = document.createElement('a'),
	this.aSite = document.createElement('a'),
	this.aArtist = document.createElement('a'),
	this.divName = document.createElement('div'),
	this.divYear = document.createElement('div');

	this.setAttr = function(element, attr, value) {

		$(element).attr(attr, value);
	}

	this.setHTML = function(element, value) {

		$(element).html(value);
	}

	//Append together the elements
	this.appendElements = function() {

		$(this.aCover).append(this.imageCover);
		$(this.divName).prepend(this.aArtist);
		$(this.figcaption).append(this.divName, this.divYear, this.aSite);
		$(this.figure).append(this.aCover, this.figcaption);
	}
};