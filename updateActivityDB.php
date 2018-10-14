<?php
/*
Called by ajaxRefresh.js included in currentActivity.html;
When user clicks stop button ajaxRefresh.js: stopActivity() will be invoked, calls updateUserActivity() for help
	to open this php script. In stopActiivty(), activity data will be saved using cookies.
Fetch activity data here using cookies.
Update the database.
*/
	//set the default time zone;
	date_default_timezone_set('Canada/Eastern');

	@ $current_user = $_COOKIE['useremail']; //get cookie from php;
	
	if(isset($current_user)){ //if there is a user logged in;
		include_once("connection.php");
		
		
		$duration = $_COOKIE["duration"];
		$watts = $_COOKIE["energy"];
		$cal = $_COOKIE["calory"];
		$distance = $_COOKIE["distance"];
		$date = date("Y-m-d");
		$time = date("h:i:s");
		$country = $_COOKIE['country'];
		
		
		$q1= "insert into project4900.user_info values('$current_user','$date','$time',$duration,$cal,$distance,$watts,'$country');";
		pg_query($q1);
		
		pg_query("delete from project4900.test;");
		
	}
		
		
		
		
		
?>