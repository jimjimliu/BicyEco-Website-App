<?php

	include_once("connection.php");

	//generating random password;
	function generatePassword($length = 8) {
		$chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		$count = mb_strlen($chars);

		for ($i = 0, $result = ''; $i < $length; $i++) {
			$index = rand(0, $count - 1);
			$result .= mb_substr($chars, $index, 1);
		}

		return $result;
	}

	// get email from post
	$emailTo = $_COOKIE['email'];
	$result = pg_query("select user_password from project4900.users where user_email='$emailTo';");

	//generate random password;
	$temperate_pwd = generatePassword();
	pg_query("update project4900.users set user_password='$temperate_pwd' where user_email='$emailTo';");

	// fetch user's password;
	$validity = pg_num_rows($result);
	/*
	if validity == 0, no password fetched from database, the email is incorrect;
	*/
	if($validity == 0){
		// echo "<script>alert('please enter the correct email you used to register.');
		// 			  setTimeout(function(){window.location.href='emailRecover.html';});
		// 	  </script>";
		echo json_encode(['Please enter the correct email you used when register.']);
		exit();
	}

	// email content;
	$message = "Hello user: '$emailTo', 
		<br /><br /> This is a temperate password: '$temperate_pwd' you can use to login.<br />
		Please make sure to change you password in personal account the next time you login.
		<br />
		Please do not reply this email.
		<br /><br />
		Best, <br /> BicyEco System";
	


	require_once('class.phpmailer.php');
	require_once("class.smtp.php"); 
	$mail  = new PHPMailer(); 

	$mail->CharSet    ="UTF-8";                 //set email encoding, default ISO-8859-1
	$mail->IsSMTP();                            // set SMTP service
	$mail->SMTPAuth   = true;                   // enable SMTP authentification 
	$mail->SMTPSecure = "ssl";                  // SMTP security protocal
	$mail->Host       = "smtp.sina.cn";       // SMTP server
	$mail->Port       = 465;                    // SMTP server port
	$mail->Username   = "jimliujunhan@sina.cn";  // SMTP server user name
	$mail->Password   = "";        // SMTP server password
	$mail->SetFrom('jimliujunhan@sina.cn', 'BicyEco System');    // set sender email and name
	$mail->AddReplyTo("$emailTo","noreply"); // set receiver email and name
	$mail->Subject    = 'Email recover message.';                     //set email subject
	$mail->AltBody    = "testing email"; 
												
	$mail->MsgHTML("$message");                         // set email content
	$mail->AddAddress("$emailTo", "BicyEco System User");
	//$mail->AddAttachment("images/phpmailer.gif"); // attchment 
	if(!$mail->Send()) {
		echo json_encode(["Fail to send the email：" . $mail->ErrorInfo]);
	} else {
		echo json_encode(["Email sent!, you will receive your email in about 10 seconds. However, it might take longer to receive the email due to network issue."]);
		//update database after email has been successfully sent;
		// pg_query("update project4900.users set user_password='$temperate_pwd' where user_email='$emailTo';");
	}
	exit();

?>
