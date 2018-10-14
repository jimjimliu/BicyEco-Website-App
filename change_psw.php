<?php

	include_once("connection.php");
	
	@ $current_user = $_COOKIE['useremail']; //get cookie from php;
	
	if(isset($current_user)){ //if there is a user logged in;
		
		$password = $_COOKIE['pw'];
		$new_psw = $_COOKIE['pw1'];
		$result = pg_query("select*from project4900.users where user_email='$current_user' and user_password='$password';");
		if(pg_num_rows($result)){
			pg_query("update project4900.users set user_password='$new_psw' where user_email='$current_user';");
			// echo "<script>setTimeout(function(){window.location.href='infoDisplay.php';});
			// 	alert('password updated successfully.');
			// 	</script>";
			echo json_encode(['password updated successfully']);
			exit();
		}
		else{
			// echo "<script>
            //                 setTimeout(function(){window.location.href='infoDisplay.php';});
			// 				alert('original password incorrect.');
			// 		  </script>";
			echo json_encode(['original password incorrect']);
			exit();
		}
	}

?>