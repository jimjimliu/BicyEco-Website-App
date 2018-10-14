<?php

/*
opened in ajaxRefresh.js included in currentActivity.html;
The page is opened every per second to update data displayed in activity screen;
*/

//set the default time zone;
	date_default_timezone_set('Canada/Eastern');
	
	if($current_user = $_COOKIE['useremail']){ //if there is a user logged in;
		include_once("connection.php");

//--------------------------------------------------------
//check if user has choosen a country, if not, direct him to do so;
		
		$check_country_selected = "select C.country from project4900.country C where C.user_email = '$current_user' and 				date_of_choice = (select max(date_of_choice) from project4900.country where user_email='$current_user');";
		$country_validity = pg_query($check_country_selected);
		$country = pg_fetch_assoc($country_validity)["country"];
		//	echo pg_num_rows($country_validity);


		if(pg_num_rows($country_validity)==0){
			echo @ "please select a <a href='infoDisplay.php' style='color:#252445;border-bottom:1px solid;'>country</a> to donate before you start.";
			exit();
		}
//--------------------------------------------------------
		else{	
			
			$r2 = pg_query("select user_weight from project4900.users where user_email='$current_user';");
			$weight = pg_fetch_array($r2)[0];
			
			$query = "select avg(speed) from project4900.test;";
			$result = pg_query($query);
			$temp = pg_fetch_array($result)[0];
			$average = 0;//if returned null from query; display 0;
			if(! is_null($temp)){ //if returned is average, display it;
				$average = $temp;
			}
			//echo @ $current_user;
			echo @ date("Y-m-d H:i:s").",".$average.",".$current_user.",".$country.",".$weight;
		}
	}
	else{
		//if the cookie is accidentally deleted. keeps the application safe.
		echo @ "session has expired due to no action performed for long time. please <a href='loginPage.html' 							style='color:#252445;border-bottom:1px solid;'>re-login</a>.";
		exit();
	}
	?>
