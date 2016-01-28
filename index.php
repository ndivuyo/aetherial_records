<?php
/*
Dillon Bastan 2016.
This is the index PHP document that manages 
indexing of all pages for Aetherial Records
*/


//Has the function for validating input
include 'php/inputFilter.php';


//Determine what page browser is on
$pageName = "home";
if (isset($_GET['pageName'])) {
	$pageName = input_filter($_GET['pageName']);
}


//Render the Header and global Head inclusions.
echo file_get_contents("html/header.html");


//Render the main body of the selected page, if the file exists
$current_page = "html/" . $pageName . ".html";
if (file_exists($current_page))
	echo file_get_contents($current_page);
else
	echo file_get_contents("html/missing.html");


//If at the Artists or Projects Index page, render individual artist or project content
if (isset($_GET['artistName'])) {
	$artistName = input_filter($_GET['artistName']);

	//Render the content of the selected artist as HTML
	echo "<script> renderArtist('$artistName'); </script>";
} else if (isset($_GET['projectName'])) {
	$projectName = input_filter($_GET['projectName']);

	//Render the content of the selected project as HTML
	echo "<script> renderProject('$projectName'); </script>";
}


//Render the footer
echo file_get_contents("html/footer.html");


//Underlines the link of the current page
echo "<script> underlineLink('$pageName'); </script>";

?>