<?php
	
      /* *************************************************************************
      posted from loginPage.html;
      check if users have complete their personal information by checking user_weight, 
      if it is -1, then users have not completed info, direct users to do so.
      if not, direct users to personal account page.
      **************************************************************************/
      
      header("Access-Control-Allow-Origin: *");
      header('content-type: application/json');
	//connect the databse
      include "../connection/connection.php";
      include "../utility/utils.php";
	
      $DATA = get_post_data();
      $user_email = $_POST['email'];
      $passowrd = $_POST['password'];
    
      $respond_json = array(
            "infoComplete" => false,
            "isRegistered" => false
      );                              
		
      //checking if there is a valid match in the database
      $sql = "select user_weight from project4900.users where user_email = '$user_email' and user_password='$passowrd'";
      $queryResult = $conn->query($sql);
      $validity = mysqli_num_rows($queryResult);//returned 0 or 1 if there is not a match or one

      $row = $queryResult->fetch_array();
      /* 用户有注册，但是未完成个人资料的填写； */
      if( $row[0]== -1 && $validity ){
        
            $respond_json["infoComplete"] = false; 
            $respond_json["isRegistered"] = true;      
      }
      /* 用户有注册，并且完成个人资料填写 */
      elseif($row[0]!=-1 && $validity){//0 false 1 true
          
            /* 设置为true，表示用户已经将资料填写完毕；前端需要跳转到个人中心； */
            $respond_json["infoComplete"] = true;
            $respond_json["isRegistered"] = true;
      }
      /* 验证用户出现错误 */
      else{
            /* if not true, then user has enter an incorrect email, then delete cookie
            to prevent login button in homepage redirecting user to activity or display page.
            since no users are logged in currently. */
            setcookie('useremail',null);
      }

      /* 返回数据 */
      if( $validity ){
            echo response_data($respond_json);
      }
      else{
            echo response_message("incorrect information.");
      }
      
   
?>
