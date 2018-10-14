<?php
/*
posted from infoDisplay.php;
check if a user is valid to change their country choice, if valid, update database;
*/


//set the default time zone;
		date_default_timezone_set('Canada/Eastern');

		if ($current_user = $_COOKIE['useremail']){ //get cookie from php;
			$country_choice = $_POST["frame"]; //get country choice from the hidded input field in the select drop down list;
			if($country_choice === ""){
				echo "<script> alert('please select a country.');
				setTimeout(function(){window.location.href='infoDisplay.php';});</script>";
				exit();
			}

//-----------------------------------------------------
//connecting database;
			
			include_once("connection.php");
//-----------------------------------------------------

//-----------------------------------------------------
//safe guard method, if user has been accidentally deleted from database, 
//inform message, and log out to registerPage.html;
			
			$user_exist = pg_query("select*from project4900.users where user_email='$current_user';");
			if(pg_num_rows(($user_exist))===0){
				echo "<script>alert('user does not exist, please sign up.');</script>";
				echo "<script>setTimeout(function(){window.location.href='registerPage.html';});</script>";
				setcookie("useremail",null);
				exit();
			}
//-----------------------------------------------------

			//check if the user can change country or not;
			@ $current_date = date("Y-m-d");
			$get_date_query = "select MAX(date_of_choice) from project4900.country where user_email = '$current_user';";
			$r = pg_query($get_date_query);
			$date = pg_fetch_array($r)[0];

			//get days passed;
			@ $diff = date_diff(date_create($date),date_create($current_date));
			//days passed since last time change;
			$difference = (int) $diff->format('%a');
			//days user has to wait;
			$wait_time = 30 - $difference;

			if($difference < 30 && ! is_null($date)){ //less than 30 days, cannot change country;
				echo "<script>alert('You can only change country after $wait_time days');</script>";
				echo "<script>setTimeout(function(){window.location.href='infoDisplay.php';});</script>";

			}
			else{

				@ $date = date("Y-m-d");

				$update_country_query = "insert into project4900.country values('$current_user','$country_choice', '$date');";
				pg_query($update_country_query);

				echo "<script>alert('country updated.');</script>";
				echo "<script>setTimeout(function(){window.location.href='infoDisplay.php';});</script>";
			}
		}
		else{
			echo "<script>alert('session expired due to no action performed for long time, please re-login.');</script>";
			echo "<script>setTimeout(function(){window.location.href='loginPage.html';});</script>";
		}
	
	?>
