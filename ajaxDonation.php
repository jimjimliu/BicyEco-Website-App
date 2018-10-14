<?php

/*
opened by ajacHistoryScreen.js included in infodisplay.php;
get users information from database, save in array, encode using JSON, pass it to ajaxHistoryScreen.js using echo;
*/

	include_once("connection.php");
	
//	safe now, only set cookie in login.php when user enters the correct password and has completed personal information;
	@ $email = $_COOKIE['useremail'];
	$donation = [];

	$result = pg_query("select country, sum(watts) from project4900.user_info group by country;");
	
	while($row = pg_fetch_array($result)){
		array_push($donation, [$row[0], $row[1]]);
	}

	$json_string = json_encode($donation);
	echo $json_string;
?>