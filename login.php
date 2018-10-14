<?php
	
/*
posted from loginPage.html;
check if users have complete their personal information by checking user_weight, 
if it is -1, then users have not completed info, direct users to do so.
if not, direct users to personal account page.
*/
	
	//connect the databse
	include_once("connection.php");
	//or die('Could not connect: ' . pg_last_error());
	//end

    $user_email = $_POST['email'];//get the user input email
    $passowrd = $_POST['password']; //get the user input password

    if ($user_email==null || $passowrd==null){//if input fields are null
			 echo "incomplete form, enter again.";
			echo "
				  <script>
						setTimeout(function(){window.location.href='loginPage.html';},1000);
				  </script>";

                        

    }else{
               
		
		 //checking if there is a valid match in the database
             $sqlQuery = "select user_weight from project4900.users where user_email = '$user_email' and 								user_password='$passowrd'";
		
             $queryResult = pg_query($sqlQuery);//execute the query
		
             $validity =pg_num_rows($queryResult);//returned 0 or 1 if there is not a match or one
		
		
//			 if user has not complete personal information, direct user to sign up info page;
			 if(pg_fetch_assoc($queryResult)["user_weight"] == -1){
//				 if true, set cookie;
				 setcookie('signupUser', $user_email, time()+300);
				 //this cookie is for auto complete the input field, not for login;
				 
//				 user has not complete personal information, direct user to do so;
				 echo "
				 	  <script>
                            setTimeout(function(){window.location.href='signUpInfo.html';},1000);
                      </script>";
				 exit;
				 
			 }
			 //if connected successfully,and personal information completed, direct user to account page;
             elseif($validity){//0 false 1 true
//				   if true, then the useremail is correctedly entered, set the cookie;
//				   only set "useremail" cookie if the user enter correct email and password and completed personal information;
				   setcookie('useremail', $user_email, time()+60*60*2);//2 hours;
                   echo "
                      <script>
                            setTimeout(function(){window.location.href='infoDisplay.php';});
                      </script>";//if successfully connected jump to other page
				 
                   exit();
             }
			
			else{
//				 if not true, then user has enter an incorrect email, then delete cookie
//				 to prevent login button in homepage redirecting user to activity or display page.
//				 since no users are logged in currently.
				 setcookie('useremail',null);
                echo("<script> alert('user name/email or password incorrect.') </script>");
                echo "
                      <script>
                            setTimeout(function(){window.location.href='loginPage.html';});
                      </script>";
				exit();
             }
             
    }

   
?>