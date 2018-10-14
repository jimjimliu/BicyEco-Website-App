<?php include_once("connection.php"); ?>

<!DOCTYPE html>
<!--
HTML page includes php scripts;
displays: 
	personal information,
	activity data charts,
	all countries donation chart,
	change country functionality,
	change password functionality

Initially set different division's visiblity to hidden, when clicking on categories, 
	JS controls to set a certain division to visible to display according data.
-->
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>userDataDisplay</title>
	<!--	header style -->
  <link rel="stylesheet" href="CSS/common.css">
	<!--	chartist.js library -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
  <script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
	<!--	page and control bar style -->
  <link rel="stylesheet" href="CSS/infoDisplayStyle.css">
	<script src='JS/ajaxChangePassword.js'></script>
  <script src="JS/ajaxHistoryScreen.js"></script>
<!--	js form validation-->
  <script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="JS/formValidation.js"></script>
</head>

<body onLoad="start()">
<div class="body-wrap">
	
	<div class="header">
		<nav class="wrapper-wider">
			<!-- icon, click to go back to main page -->
			<div class="head-left">
				<a href="HomePage.html"><i class="fa fa-home fa-2x"></i></a>
				<div class="iconheader">
				<h1>Bicy-Eco.</h1>
				</div>
			</div>
			
			<div class="head-right">
				<div class="nav-pc" style="">
					
					<a href="" class="login-trigger">
						<i class="fa fa-user"></i>
						<span>login/register</span>
					</a>
					<a onClick="logout()"><!-- function in leftComBar.js -->
						<i class="fa fa-arrow-right"></i>
						<button>log out</button>
					</a>
				</div>
			</div>
			
		</nav>
	</div>
	
	<div class="content-wrap" id="activity_overview" style="visibility: hidden;">
		<div id="ac_overview">
			<center>
				<p>
					<span id="overview"></span>
				</p>
			</center>
		</div>
	</div>
	
	<div class="content-wrap" id="user_info" style="visibility: hidden;">
		
			<center id="profile">
				
                  <div class=""> 
                  <table class="">
                    <tbody>
                      <tr>
                        <td>User Email:</td>
                        <td id="user_email"></td>
                      </tr>
                      <tr>
                        <td>User Name:</td>
                        <td id="user_name"></td>
                      </tr>
                      <tr>
                        <td>Age:</td>
                        <td id="age"></td>
                      </tr>
                      <tr>
                        <td>Weight:</td>
                        <td id="weight"></td>
                      </tr>
                      <tr>
                        <td>Height:</td>
                        <td id="height"></td>
                      </tr>
                      <tr>
                        <td>Country:</td>
                        <td id="country_choice"></td>
					  </tr>
                     
                    </tbody>
                  </table>
                  
                </div>
            
			</center>
		
	</div>
	
	
	<div class="content-wrap" id="chart" style="visibility: hidden;">
		<div id="duration">
			<center id="lst-week-activity">
			</center>
			<p>your last week activity duration</p>
		</div>
		<div id="calorie" style="margin-top: 100px">
			<center id="lst_week_calorie">
			</center>
			<p>your last week calories burned</p>
		</div>
		<div id="distance" style="margin-top: 100px">
			<center id="lst_week_distance">
			</center>
			<p>your last week distance traveled</p>
		</div>
		<div id="distance" style="margin-top: 100px">
			<center id="lst_week_watts">
			</center>
			<p>your last week watts generated</p>
		</div>
	</div>
	
	<div class="content-wrap" id="country" style="visibility: visible;">
		
		<?php
			echo 'current user: ';
			echo $_COOKIE['useremail'];
		?>
		
		<form action="countryChoice.php" method="post">
			<div class="dropdown js-dropdown">
			  <input type="hidden" name="frame" id="frame" class="js-dropdown__input">
			  <span class="c-button c-button--dropdown js-dropdown__current" name="country">Select a country to donate</span>
			  <ul class="dropdown__list">
				<li class="dropdown__item" data-dropdown-value="Haiti">Haiti---38kwh/capita</li>
				<li class="dropdown__item" data-dropdown-value="South Sudan">South Sudan---39kwh/capita</li>
				<li class="dropdown__item" data-dropdown-value="Niger">Niger---51kwh/capita</li>
				<li class="dropdown__item" data-dropdown-value="Ethiopia">Ethiopia---69kwh/capita</li>
				<li class="dropdown__item" data-dropdown-value="Tanzania">Tanzania---99kwh/capita</li>
			  </ul>
			</div>
	  		<input class="c-button c-button--dropdown" type="submit" value="Confirm">
	  
    	</form>
		<p><span>
			<?php
			//set the default time zone;
				date_default_timezone_set('Canada/Eastern');
			
				if( $current_user = $_COOKIE['useremail']){ 
			

					//get current date;
					@ $current_date = date("Y-m-d");
					$get_date_query = "select MAX(date_of_choice) from project4900.country where user_email = '$current_user';";
				@	$r1 = pg_query($get_date_query);
					$date = pg_fetch_array($r1)[0];
			
					//compute how many days has passed since last time country change;
					@ $diff = date_diff(date_create($current_date),date_create($date));
					//convert to int;
					$difference = (int) $diff->format('%a');

					if(is_null($date)){
						echo "Please select the country you like to donate.";
					}
					else if($difference <= 30){
						$wait_time = 30 - $difference;
						echo "you can change country in $wait_time days.";
					}
					else{
						echo "";
					}
				}
				else{
					echo "<script>setTimeout(function(){window.location.href='loginPage.html';});</script>";
				}
			?>
			</span></p>
	</div>
	
	<div class="content-wrap" id="second-chart" style="visibility: hidden;">
		<center id="lst_month_duration" >
		</center>
		<p>duration</p>
		<center id="lst_month_calorie" style="margin-top: 100px">
		</center>
		<p>calories burned</p>
		<center id="lst_month_distance" style="margin-top: 100px">
		</center>
		<p>distance traveled</p>
		<center id="lst_month_watts" style="margin-top: 100px">
		</center>
		<p>watts generated</p>
	</div>
	
	<div class="content-wrap" id="donation_chart" style="visibility: hidden;">
		<center id="donation" >
		</center>
		<p>donation(watts)</p>
		
	</div>
	
	<div class="content-wrap" id="change_password" style="visibility: hidden;">
	
			<center>
				
				<form id="reg-form">

					<div class="field-wrap">

						<input type="text" placeholder="original password." name="re-enter-password" class="input password"
							   easyform="length:6-16;real-time;" message="password length must between 6-16 digits" easytip="disappear:lost-focus;theme:green;" id="pw"/>
					</div>

					<div class="field-wrap">
						<input type="password" placeholder="new password" name="password" class="input password"
							   easyform="length: 6-16; real-time" message="password length must between 6-16 digits"
							   easytip="disappear:lost-focus;theme:green;" id="pw1"/>
					</div>
					
					<div class="field-wrap">
						<input type="password" placeholder="re-enter password" name="re-enter" class="input password"
							   easyform="length: 6-16;equal:#pw1; real-time" message="password does not match"
							   easytip="disappear:lost-focus;theme:green;" id="pw2"/>
					</div>
					
					<input onClick="update_password()" value="confirm" class="pw_confirm" readonly="true">
				</form>
				
			</center>
		
	</div>
	
<!--left control bar-->
  <aside class="sidebar">
  <div id="leftside-navigation" class="nano">
    <ul class="nano-content">
      <li>
        <a>
			<i class="fa fa-dashboard"></i>
			<span onClick="display_overview()">Overview</span>
		</a>
      </li>
      <li class="sub-menu active">
        <a href="javascript:void(0);"><i class="fa fa-cogs"></i><span>Profile</span><i class="arrow fa fa-angle-right pull-right"></i></a>
        <ul>

          <li><a id="user" onClick="display_user_info()">Personal Information</a>
          </li>
		  <li><a id="personal_info" onClick="display_country()">Change country</a>
          </li>
          <li><a id="password_change" onClick="change_password()">Change your password</a>
          </li>
     
        </ul>
      </li>
      <li class="sub-menu">
        <a href="javascript:void(0);"><i class="fa fa-table"></i><span>Activity history</span><i class="arrow fa fa-angle-right pull-right"></i></a>
        <ul>
          <li><a id="table1" onClick="display_frist_chart()">Last week activity</a>
          </li>

          <li><a id="" onClick="display_second_chart()">Last 30 days activity</a>
          </li>
        </ul>
      </li>
 
      <li class="sub-menu">
        <a href="javascript:void(0);"><i class="fa fa-envelope"></i><span>Energy Donation</span><i class="arrow fa fa-angle-right pull-right"></i></a>
        <ul>
          <li><a onClick="display_donation()">Donation information</a>
          </li>
          
        </ul>
      </li>
 
     
    </ul>
  </div>
</aside>
</div>
<!--  <script src="js/leftCBar.js"></script>-->
  <script  src="js/leftComBar.js"></script> <!--	put it at bottom, otherwise it will not function-->
<!--  <script src="js/jquery.min.js"></script>-->
  <script  src="js/countrySelect.js"></script>
	

</body>
	<script type="text/javascript">

		$(document).ready(function(){$('#reg-form').easyform();});

	</script>
</html>
