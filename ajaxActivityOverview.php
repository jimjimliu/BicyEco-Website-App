<?php

	include_once("connection.php");
	
//	safe now, only set cookie in login.php when user enters the correct password and has completed personal information;
	@ $email = $_COOKIE['useremail'];
	$overview = [];

	$result = pg_query("select sum(activity_duration) as duration, sum(calory_burned), sum(biking_distance),sum(watts) from 							project4900.user_info where user_email='$email';");

	$validity = pg_query("select*from project4900.user_info where user_email='$email';");

	if ( pg_num_rows($validity) != 0 ){
		
		while($row = pg_fetch_array($result)){
			array_push($overview,[$row[0],$row[1],$row[2],$row[3]]);
			array_push($overview,[]);
		}

		$r2 = pg_query("select distinct(country) from project4900.user_info where user_email='$email';");
		while($row = pg_fetch_array($r2)){
			array_push($overview[1], $row[0]);
			array_push($overview, []);
		}

		$r3 = pg_query("select count(*) from project4900.user_info where user_email='$email'");
		while($row = pg_fetch_array($r3)){
			array_push($overview[2], $row[0]);
		}

		//echo $date[0][1];
		$json_string = json_encode($overview);
		echo $json_string;
	}
	else{
		array_push($overview, 'You have not perform activity yet, why not starting today.');
		$json_string = json_encode($overview);
		echo $json_string;
	}
?>