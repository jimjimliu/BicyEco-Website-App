<?php	

/*
osted from signUpInfo.html;
Update users personal information database table;
*/
		//connect the databse
		include_once("connection.php");
		//or die('Could not connect: ' . pg_last_error());
		//end

//		--------------------------------
//		input values are safe, easyform.js prevents null input values and prevents illegal input values;
//		--------------------------------
		$user_email = $_POST['email'];
		$first_name = $_POST['firstName'];
		$last_name = $_POST['lastName'];
		$bodyweight = $_POST['body-weight'];
		$height = $_POST['height'];
		$activity_time = $_POST['activityTime'];
		$age = $_POST['age'];
	
		if($user_email==null || $first_name==null || $last_name==null || $bodyweight==null || $height==null || $activity_time==null||$age==null){
			echo "empty form";
			exit;
		}
		else{
				
			setcookie('signupUser', null);//clear cookie;

			//query that checking if the given user email is already in the database
			$update_personal_information = "update project4900.users set user_first_name = '$first_name', user_last_name = '$last_name',user_age= '$age', user_weight='$bodyweight', user_height='$height',
			user_weekly_activity_time = '$activity_time' where user_email='$user_email';";

			//execute the query
			@ $query_result = pg_query($update_personal_information) or die("Query failed." .pg_last_error());
				echo("<script> alert('register successfully. Please re-login') </script>");
				echo "
						  <script>
								setTimeout(function(){window.location.href='loginPage.html';});
						  </script>";
			
			exit;

		}
			
		
	?>
