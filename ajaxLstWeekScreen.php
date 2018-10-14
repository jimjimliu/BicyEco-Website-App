<?php
	include_once("connection.php");
	
//	safe now, only set cookie in login.php when user enters the correct password and has completed personal information;
	@ $email = $_COOKIE['useremail'];
	$date = [];

	$result = pg_query("select activity_date, sum(activity_duration), sum(calory_burned), sum(biking_distance),sum(watts) from 					project4900.user_info where user_email='$email' group by activity_date order by activity_date DESC limit 7;");
	
	while($row = pg_fetch_array($result)){
		array_push($date,[substr($row[0],5),$row[1],$row[2],$row[3],$row[4]]);
	}
	//echo $date[0][1];
	$json_string = json_encode($date);
	echo $json_string;


?>