<?php

/*
opened by ajacHistoryScreen.js included in infodisplay.php;
get users information from database, save in array, encode using JSON, pass it to ajaxHistoryScreen.js using echo;
*/


	include_once("connection.php");
	
//	safe now, only set cookie in login.php when user enters the correct password and has completed personal information;
	@ $email = $_COOKIE['useremail'];
	$profile = [];

	$result = pg_query("select * from project4900.users where user_email='$email';");
	$r2 = pg_query("select country from project4900.country where user_email='$email';");
	
	while($row = pg_fetch_array($result)){
		array_push($profile, $row[0],$row[2].' '.$row[3],$row[4],$row[5],$row[6]);
	}

	while($row = pg_fetch_array($r2)){
		array_push($profile, $row[0]);
	}

	$json_string = json_encode($profile);
	echo $json_string;
?>