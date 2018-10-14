$("#leftside-navigation .sub-menu > a").click(function(e) {
  $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
  e.stopPropagation()
});

//-----------------------------------------------------
//this js sheet including functionalities that control the action of left side bar,
//and including functions control the display of different charts, getCookie, check_cookie, and user log out;
//
//-----------------------------------------------------


function getCookie(cname){
//retrive the value coded in cookie, returns only one string;
//the format of returned string is jliu187%40uottawa.ca, @ character is somehow still coded; solved 2018-02-10;
	
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0){ 
		var word = c.substring(name.length,c.length);//this will return cookie like this:jliu187%40uottawa.ca;
		return word;
	}
  }
  return "";
}


function check_cookie(){
//check if user is time out by checking the if the cookie has expired yet;
//if it is time out, return null string;
	"use strict";
	
	var email = getCookie("useremail");

	if(email == ""){
		return "";
	}else{
		return email;
	}
}

/*
Set html DOM id='change_password' division to visible;
and set other division to hidden;
*/
function change_password(){
	//when click on 'change your password' button, set the 'change_password' division visible
	//and set all other divisions hidden;
	'use strict';
	var cookie = check_cookie();
	if(cookie == ""){
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
	}
	else{
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="visible";
	}
}

/*
Set html DOM id='activity_overview' division to visible;
*/
function display_overview(){
	//when click on 'change your password' button, set the 'change_password' division visible
	//and set all other divisions hidden;
	"use strict";
	var cookie = check_cookie();
	if(cookie == ""){
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
	}
	else{
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="visible";
	}
	
}

/*
Set html DOM id='user_info' division to visible;
and set other division to hidden;
*/
function display_user_info(){
	//when click on 'personal information' button, set the 'user_info' division visible
	//and set all other divisions hidden;
	"use strict";
	var cookie = check_cookie();
	if(cookie == ""){
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
	}
	else{
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="visible";
	}
	
}

/*
Set html DOM id='chart' division to visible;
and set other division to hidden;
*/
function display_frist_chart(){
	//when click on 'change your password' button, set the 'change_password' division visible
	//and set all other divisions hidden;
	"use strict";
	var cookie = check_cookie();
	if(cookie == ""){
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
	}
	else{
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
		document.getElementById("chart").style.visibility="visible";
	}
	
}

/*
Set html DOM id='second-chart' division to visible;
and set other division to hidden;
*/
function display_second_chart(){
	"use strict";
	var cookie = check_cookie();
	if(cookie == ""){
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
	}
	else{
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="visible";
	}
}

/*
Set html DOM id='country' division to visible;
and set other division to hidden;
*/
function display_country(){
	"use strict";
	var cookie = check_cookie();
	if(cookie == ""){
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
	}
	else{
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="visible";
	}
}

/*
Set html DOM id='donation_chart' division to visible;
and set other division to hidden;
*/
function display_donation(){
	"use strict";
	var cookie = check_cookie();
	if(cookie == ""){
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="hidden";
	}
	else{
		document.getElementById("second-chart").style.visibility="hidden";
		document.getElementById("chart").style.visibility="hidden";
		document.getElementById("user_info").style.visibility="hidden";
		document.getElementById("activity_overview").style.visibility="hidden";
		document.getElementById("change_password").style.visibility="hidden";
		document.getElementById("country").style.visibility="hidden";
		document.getElementById("donation_chart").style.visibility="visible";
	}
}

function deleteCookie(){
	var exp = new Date(); 
    exp.setTime(exp.getTime() - 100); 
    var cval=getCookie("useremail"); 
    if(cval!== null){ 
        document.cookie= "useremail" + "="+cval+";expires="+exp.toGMTString();
	}
}

function setCookie(name,value,second){

	var exp = new Date();
	exp.setTime(exp.getTime() + second*1);	
	var cookie = value;
	deleteCookie();
	document.cookie = name +"="+ cookie +";expires="+ exp.toGMTString();

}

/*
clear user name cookie; direct page to home page;
*/
function logout(){
	deleteCookie();
	setTimeout(function(){window.location.href='HomePage.html';});
}

//-----------------------------------------------------
//The session is 30 minutes, if there is no action(mouse move) in 30 minutes, 
//the user will be forced log out;
//-----------------------------------------------------


var lastTime = new Date().getTime();
var currentTime = new Date().getTime();
var timeOut = 1000*60*30; //length of session is 30 minutes;

$(function(){
	
	$(document).mouseover(function(){
		lastTime = new Date().getTime(); 
		var cookie = getCookie("useremail");
		if(cookie !== ""){
			/*if cookie is not null, then re-set cookie, if cookie is null, 
			then do not do anything, since getCookie() would return "" empty string, and 
			cookie value will be set to empty string; it would be illegal for other checking 
			function, like in HomePage, when checking getCookie(), in this case, it would not return "", 
			and it gives a wrong chekcing condition;*/
			setCookie("useremail",cookie, 1000*60*40);//40 minutes;
		}
	});
});

/*
Test if a mouse has moved for more than 30 minutes, log out;
*/
function testTime(){
	currentTime = new Date().getTime(); 
	if(currentTime - lastTime > timeOut){ 
		alert("your session has expired.");
		logout();
	}
}

window.setInterval(testTime, 1000);








