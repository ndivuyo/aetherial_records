/*
Dillon Bastan, 2015
Class for an project and methods for rendering the html.
*/

var Project = function() {

	this.tr = document.createElement('tr'),
	this.tdImage = document.createElement('td'),
	this.aImage = document.createElement('a'),
	this.imageMain = document.createElement('img'),
	this.tdCaption = document.createElement('td'),
	this.divCaption = document.createElement('div'),
	this.hTitle = document.createElement('h1'),
	this.pDescription = document.createElement('p'),
	this.aContinue = document.createElement('a');

	this.setAttr = function(element, attr, value) {

		$(element).attr(attr, value);
	}

	this.setHTML = function(element, value) {

		$(element).html(value);
	}

	//Append together the elements
	this.appendElements = function() {

		$(this.aImage).append(this.imageMain);
		$(this.tdImage).append(this.aImage);
		$(this.pDescription).append(this.aContinue);
		$(this.divCaption).append(this.hTitle, this.pDescription);
		$(this.divCaption).addClass("projectsDescription");
		$(this.tdCaption).append(this.divCaption);
		$(this.tr).append(this.tdImage, this.tdCaption);
	}
};