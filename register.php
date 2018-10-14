<?php

/*
posted from registerPage.html;
Check if a user exists in database, if yes, direct users to log in;
if not, create a new row for the user in database;
*/
	//set the default time zone;
	date_default_timezone_set('Canada/Eastern');

	/*
	use it to locate current user, in autoLoardEmailInput.js included in signUpInfo.html,
		it will fill the email input of the from automatically,
		in case users enter an incorrect email that does not match as the one they created when register;
	*/
	@ setcookie('signupUser', $_POST['email'], time()+300);

	//connect the databse
	include_once("connection.php");
	//or die('Could not connect: ' . pg_last_error());
	//end

	$user_email = $_POST['email'];//get the user input email
	$password = $_POST['password']; //get the user input password

	echo $user_email;

	$date = date('Y-m-d');	

//		query that checking if the given user email is already in the database,
//		does not check password when the email is correct;
	$query_check_email_existed = "select*from project4900.users where user_email='$user_email';";
	//execute the query
	@ $query_result = pg_query($query_check_email_existed) or die("Query failed." .pg_last_error());
	//if the user email already exists, it returns something
	$rows = pg_num_rows($query_result);


	//if it is 1(true), then user email already in the database
	if($rows == 0){

		@ pg_query("insert into project4900.users values('$user_email', 																'$password', 'NG','NG',-1,-1,-1,-1, '$date');") or die("Query failed.".pg_last_error());
		//pg_query($query_insert_new_user_info) or die("Query failed.".pg_last_error());

		echo("<script> alert('register successfully. Please complete your personal information. OR you can complete later when you decide to start an activity.') </script>");
		echo "
				  <script>
						setTimeout(function(){window.location.href='signUpInfo.html';},1000);
				  </script>";
		

	}
	else{
		echo $rows;
		echo $user_email;

//			echo("User already exists, please login.");
//			echo("Wait for 3s to transfer u back to login please.");
//			//go back to login page in 3 seconds
		echo "
				  <script>
						setTimeout(function(){window.location.href='loginPage.html';},3000);
				  </script>";
		

	}



	pg_close();

	
?>
