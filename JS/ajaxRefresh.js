// JavaScript Document

//this is the ajax file for refreshing the html tags without refresing the entire webpage;
//it linked with php script, automatically display the database data to html tags;
//Junhan Liu 2018-02-26;


    var xmlobj;
	var stop = false; //to guard if a users has pressed stop button;
    var sentinel;//sentinel of autofresh();
	var guard;//sentinel of motivationMessage()
	var mm;//sentinel of message();
	var timer = 0;//store time in seconds;
 	var wat = 0; //store total watts generated;
	var sp; //speed
	var ctry; //country
	var user_weight;


	/*
	Create a httpRequest object whenever one needs to open a php page;
	*/
    function createXMLHttpRequest(){
      if(window.ActiveXObject){
        xmlobj=new ActiveXObject("Microsoft.XMLHTTP");
      }
      else if(window.XMLHttpRequest){
        xmlobj=new XMLHttpRequest();
      }
    }

	/*
	Autoloaded in currentActivity.html body;
	If there is a usr logged in, then set interval of displaying messages of every 5 minutes;
	*/
	function start(){
		if(getCookie("useremail") !== ""){
			
			//display motivation message every 5 minutes;
			guard = setInterval("motivationMessage()",1000*60*5); //every 5 minutes;
		}
		Autofresh();
	}


	/*
	Calls createXMLHttpRequest to create a request object,
	Opens a certain php page to interact,
	Calls doAjax to perform necessary actions;
	*/
    function Autofresh(){
	  
		  createXMLHttpRequest();    
		   //count=count+1;    
		  xmlobj.open("GET","ajaxCurActivity.php",true);
		  xmlobj.onreadystatechange=doAjax;
		  xmlobj.send("r="+Math.random());
    }

	/*
	bind variables to DOM object by using ids,
	get result passed from php page,
	the format of the data being passed is a string,
	re-set user cookie every per second to keep user logged in while he is exercising,
	calls Autofresh every per second to fresh html elements;
	*/
    function doAjax(){
		//get html element tags' id and display messages;
      if(xmlobj.readyState==4 && xmlobj.status==200){
        var time_span=document.getElementById("currenttime");
		var speed = document.getElementById("speed");
		var current_user = document.getElementById("user");
		var country = document.getElementById("country");
		var energy = document.getElementById("energy");
		var content = document.getElementById("content");
	
		var result = xmlobj.responseText.split(","); //result is the data passed by php script using echo;
		if(result.length < 5){
//			if users have not choose a country, or session has expired, it goes here;
			content.innerHTML = result[0];
			document.getElementById("stop_button").disabled=true;
		}
        else{
			time_span.innerHTML= result[0];
			energy.innerHTML = accumulate_watt(parseFloat(result[1]));//parseInt(result[1])*100+"(w)";
			speed.innerHTML = parseFloat(result[1]).toFixed(2)+' km/h';
			sp = parseFloat(result[1]).toFixed(2);//average speed;
			current_user.innerHTML = result[2];//result[2] is the cookie got from php varible, not javascript;
			country.innerHTML = result[3];
			ctry = result[3];
			user_weight = result[4];
			
			//counting time every second
			counter();
			
			var cookie = getCookie("useremail");
			//re set cookie every second;
			if(cookie !== ""){
				/*if cookie is not null, then re-set cookie, if cookie is null, 
				then do not do anything, since getCookie() would return "" empty string, and 
				cookie value will be set to empty string; it would be illegal for other checking 
				function, like in HomePage, when checking getCookie(), in this case, it would not return "", 
				and it gives a wrong chekcing condition;*/
				setCookie("useremail",cookie, 1000*60*40);//40 minutes;
			}
			
			sentinel = setTimeout("Autofresh()",1000); //refresh every 1 second;
		}
      }
    }

	
	/*
	called when user presses stop buttion, invoke updateActivityDB.php to update the database;
	variable values are passed by cookies;
	*/
	function updateUserActivity(){
	//	calls updateActivity.php to update user database;
		if(!stop){
			createXMLHttpRequest();
			xmlobj.open("GET", "updateActivityDB.php", true);
			xmlobj.send("r="+Math.random());//使用随机数处理缓存
			stop = true;//prevent user hitting stop button multiple times and updata databse multiple times;

		}

	}

	function deleteCookie(name){
		var exp = new Date(); 
		exp.setTime(exp.getTime() - 100); //将date设置为过去的时间
		var cval=getCookie(name); 
		if(cval!== null){ 
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
	}
	function getCookie(cname){
	//retrive the value coded in cookie, returns only one string;
	//the format of returned string is jliu187%40uottawa.ca, @ character is somehow still coded; solved on 2018-02-10;

	  var name = cname + "=";
	  var ca = document.cookie.split(';');
	  for(var i=0; i<ca.length; i++) 
	  {
		var c = ca[i].trim();
		if (c.indexOf(name)===0){ 
			var word = c.substring(name.length,c.length);//this will return cookie like this:jliu187%40uottawa.ca;
			return word;
		}
	  }
	  return "";
	}

	function setCookie(name,value,second){

		var exp = new Date();
		exp.setTime(exp.getTime() + second*1);	
		var cookie = value;
		deleteCookie(name);
		document.cookie = name +"="+ cookie +";expires="+ exp.toGMTString();

	}

	/*
	accumulating timer every second, 
	convert to unit in minute or hour;
	*/
	function counter(){
	//	counting time in seconds;
		'use strict';
		if(Math.floor(timer/3600) > 0){
			document.getElementById("timer").innerHTML = Math.floor(timer/3600)+"hr"+Math.floor((timer%3600)/60)+"m"+(timer%3600)%60+"s";
		}
		else if(Math.floor(timer/60) > 0){//over a minute;
			document.getElementById("timer").innerHTML = Math.floor(timer/60)+"m"+timer%60+"s";
		}
		else{
			document.getElementById("timer").innerHTML = timer+"s";
		}
		timer++;
	}

	/*
	accmulating energy generated every seconds based on average speed;
	*/
	function accumulate_watt(speed){
		
		if(speed >0 && speed<=5){
			wat += 0.028;
		}
		else if(speed >=6 && speed <= 11){
			wat += 0.06;
		}
		else if(speed >= 12 && speed <=17){
			wat += 0.083;
		}
		else{
			wat = wat;
		}
		return wat.toFixed(2);
	}

	/*
	when press stop, stop activity, and update database;
	clear timeout and timeInterval, calculate statistics, display message, disable stop button;
	*/
	function stopActivity(){
		'use strict';
		if(getCookie("useremail") != ""){
			clearTimeout(sentinel);
			clearInterval(guard);
			clearTimeout(mm);

		//	------------------------------
		//	set cookies to pass variable values to updateActivityDB.php
			var duration = Math.ceil(timer/60);
			document.cookie = "duration"+"="+duration+";";
			
			document.cookie = "energy"+"="+wat+";";
			var cal = cal_calories();
			document.cookie = "calory"+"="+cal+";";
			var distance = ((timer/3600)*sp).toFixed(2);
			document.cookie = "distance"+"="+distance+";";
			document.cookie = "country"+"="+ctry+";";
		//	------------------------------
			document.getElementById("content").innerHTML="<h2>You have biked "+distance+"km, burned "+cal+"calorie, generated "+wat.toFixed(2)+" watts for "+ctry+".</h2>";

			updateUserActivity();

			document.getElementById("stop_button").disabled=true;

			deleteCookie("duration");
			deleteCookie("energy");
			deleteCookie("calory");
			deleteCookie("distance");
			deleteCookie("country");
		}
		else{
			document.getElementById("stop_button").disabled=true;
		}

	}


	/*
	display motivation message every 5 minutes;
	and play the prompt audio for once;
	display the message for 30 seconds, then clear it.
	*/
	function motivationMessage(){
		'use strict';
		var energy = getEnergy(5);
		var message = "<h2>Keep going for 5 minutes, you will generate "+energy+" more watts.</h2>";
		dingdong();
		document.getElementById("content").innerHTML= message;

		mm = setTimeout("message()", 1000*30);//clear message after displaying 30 seconds;
	}

	//clear motivation message after displaying 30 seconds;
	function message(){
		document.getElementById("content").innerHTML="";
	}

	/*
	calculate calory burned based on speed;
	*/
	function cal_calories(){

		var met = 0.0;
		if(sp<=(10*1.603944)){
			met = 4.0;
		}
		else if(sp>=10*1.603944 && sp<11.9*1.603944){
			met = 6.0;
		}
		else if(sp>=11.9*1.603944 && sp< 13.9*1.603944){
			met = 8.0;
		}
		else if(sp>=13.9*1.603944 && sp<15.9*1.603944){
			met = 10.0;
		}
		else if(sp>=15.9*1.603944 && sp<19*1.603944){
			met = 12.0;
		}
		else{
			met = 16.0;
		}

		var cal = (0.0175*met*user_weight*(timer/60)).toFixed(1);
		return cal;
	}

	/*
	calculate watts will be generated for 5 minutes based on current average speed;
	*/
	function getEnergy(duration){
		
		var result = 0;
		if(sp >0 && sp<=5){
			result = 0.028*300;
		}
		else if(sp >=6 && sp <= 11){
			result = 0.06*300;
		}
		else if(sp >= 12 && sp <=17){
			result = 0.083*300;
		}
		else{
			result = result;
		}
		return result.toFixed(2);
	}

	/*
	play the prompt audio for once;
	*/
	function dingdong(){
			var audio = document.createElement("audio");
			audio.src = "Source/tip_audio.ogg";
			audio.play();

		}













