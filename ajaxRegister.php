<?php

	include_once("connection.php");
	$user_email = $_COOKIE['email'];
	$password = $_COOKIE['password'];
	$result = [];
	
	date_default_timezone_set('Canada/Eastern');
	$date = date('Y-m-d');

	$query_check_email_existed = "select*from project4900.users where user_email='$user_email';";
	//execute the query
	@ $query_result = pg_query($query_check_email_existed) or die("Query failed." .pg_last_error());
	//if the user email already exists, it returns something
	$rows = pg_num_rows($query_result);

	if($rows == 0){
		@ pg_query("insert into project4900.users values('$user_email', 																'$password', 'NG','NG',-1,-1,-1,-1, '$date');") or die("Query failed.".pg_last_error());
		array_push($result, 1);
		echo json_encode($result);
		exit;
	}
	else{
		array_push($result, 0);
		echo json_encode($result);
		exit;
	}

?>