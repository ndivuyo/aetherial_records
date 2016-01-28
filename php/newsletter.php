<?php

/*
Dillon Bastan 2015.
This is the PHP script for adding a client to a newsletter.
*/


//Has the function for filtering input
include 'inputFilter.php';


if (isset($_POST['clientEmail'])) {
	$clientEmail = input_filter($_POST['clientEmail']);
}

$masterEmail = "aetherialrecords@gmail.com";
$subject = "Add to newsletter";
$msg = "Add $clientEmail to the newsletter system.";
$headers = "From: newsletter@aetherialrecords.com";
$headers .= "Reply-To: $clientEmail";

$sendStatus = mail($masterEmail, $subject, $msg, $headers);

if (empty($clientEmail))
	echo "Email field is empty.";
else if ($sendStatus)
	echo "Success!";
else
	echo "Failed!";

?>