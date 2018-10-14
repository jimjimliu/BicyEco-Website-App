<?php

	/***************************************************************
	 * 创建时间： 2018-10-14
	 * 为新用户注册，添加用户登录信息到数据库；
	 * 
	 * 数据接口: 
	 * 		email：用户注册邮箱
	 * 		password： 用户登录密码
	 * 
	 * 返回数据：
	 * 		{"data":{"success":xxx},"current_user":xxx}
	 * 
	***************************************************************/
	header("Access-Control-Allow-Origin: *");
	header('content-type: application/json');
	  
	//连接数据库
	include "../connection/connection.php";
	//导入方法
	include "../utility/utils.php";
	
	$email = $_POST['email'];
	$password = $_POST['password'];
	
	date_default_timezone_set('Canada/Eastern');
	$date = date('Y-m-d');

	//sql insertion
	$sql = "insert into users values('$email', '$password', 'NG','NG',-1,-1,-1,-1, '$date');";
	//执行query
	$result = $conn->query($sql);
	
	//插入成功，说明email没有被注册过
	if ($result === true ){
		$respond_json = array("success" => true);
		echo response_data($respond_json);
	}
	//插入出现问题
	else{
		echo response_message($conn->error);
	}

?>