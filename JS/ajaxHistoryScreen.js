// JavaScript Document


/*
Create a httpRequest object whenever one needs to open a php page;
*/
function createXMLHttpRequest(){
	var xmlobj;
      if(window.ActiveXObject){
        xmlobj=new ActiveXObject("Microsoft.XMLHTTP");
      }
      else if(window.XMLHttpRequest){
        xmlobj=new XMLHttpRequest();
      }
	return xmlobj;
    }

/*
functiona auto loaded in HTML body;
called Autofresh to start;
*/
function start(){
	Autofresh();
}


/*
create 5 http request objects, 
each opens a different php page to fetch according datas;
*/
function Autofresh(){
	  
		  obj = createXMLHttpRequest();  
		  obj2 = createXMLHttpRequest();
		  obj3 = createXMLHttpRequest();
		  obj4 = createXMLHttpRequest();
		  obj5 = createXMLHttpRequest();
		     
		  obj.open("GET","ajaxLstWeekScreen.php",true);
		  obj.onreadystatechange=doAjax;
		  obj.send("r="+Math.random());
	
		  obj2.open("GET","ajaxLastMonthHistory.php",true);
		  obj2.onreadystatechange=doAjax2;
		  obj2.send("r="+Math.random());
	
		  obj3.open("GET","ajaxActivityOverview.php",true);
		  obj3.onreadystatechange=doAjax3;
		  obj3.send("r="+Math.random());
	
	      obj4.open("GET","ajaxDonation.php",true);
		  obj4.onreadystatechange=doAjax4;
		  obj4.send("r="+Math.random());
	
		  obj5.open("GET","ajaxProfile.php",true);
		  obj5.onreadystatechange=doAjax5;
		  obj5.send("r="+Math.random());
    }


/*
Get HTML DOM element by ids;
Fetch data in the format of [] from php.
Using eval() to decode the array encode in JSON that passed from php;
Calls functions to write charts in HTML DOM elements;
*/
function doAjax(){
	//get data from ajaxLstWeekScreen.php and update HTML document 
	// display data of last week
	
		//get html element tags' id and write messages;
      if(obj.readyState==4 && obj.status==200){
		var content = document.getElementById("lst-week-activity");
		var calrie_dom_id = document.getElementById("lst_week_calorie");
		var distance_dom_id = document.getElementById("lst_week_distance");
		var watts_dom_id = document.getElementById("lst_week_watts");
		var result = eval(obj.response); //decode jason array;
		write_last_week_duration(content, result);
		write_lst_week_calorie(calrie_dom_id, result);
		write_lst_week_distance(distance_dom_id, result);
		write_lst_week_watts(watts_dom_id, result);
      }
    }

/*
Get HTML DOM element by ids;
Fetch data in the format of [] from php.
Using eval() to decode the array encode in JSON that passed from php;
Calls functions to write charts in HTML DOM elements;
*/
function doAjax2(){
	//get data from ajaxLastMonthHistory.php and update HTML document 
	// display data of last month
	
		//get html element tags' id and write messages;
      if(obj2.readyState==4 && obj2.status==200){
		var content = document.getElementById("lst_month_duration");
		var calrie_dom_id = document.getElementById("lst_month_calorie");
		var distance_dom_id = document.getElementById("lst_month_distance");
		var watts_dom_id = document.getElementById("lst_month_watts");
		var result = eval(obj2.response); //decode jason array;
		write_last_month_duration(content, result);
		write_lst_month_calorie(calrie_dom_id, result);
		write_lst_month_distance(distance_dom_id, result);
		write_lst_month_watts(watts_dom_id, result);
      }
    }


/*
Get HTML DOM element by ids;
Fetch data in the format of [] from php.
Using eval() to decode the array encode in JSON that passed from php;
Calls functions to write charts in HTML DOM elements;
*/
function doAjax3(){
	//get data from ajaxActivityOverview.php and update HTML document 
	// display data of users overall activity
	
		//get html element tags' id and write messages;
      if(obj3.readyState==4 && obj3.status==200){
		var content = document.getElementById("overview");
		var result = eval(obj3.response); //decode jason array;
		//alert(result)
		write_user_overview(content, result);
      }
    }

/*
Get HTML DOM element by ids;
Fetch data in the format of [] from php.
Using eval() to decode the array encode in JSON that passed from php;
Calls functions to write charts in HTML DOM elements;
*/
function doAjax4(){
	//get data from ajaxDonation.php and update HTML document 
	// display data of countries donation
	
		//get html element tags' id and write messages;
      if(obj4.readyState==4 && obj4.status==200){
		var content = document.getElementById("donation");
		var result = eval(obj4.response); //decode jason array;
//		  alert(result);
		write_donation(content, result);
		
      }
    }

/*
Get HTML DOM element by ids;
Fetch data in the format of [] from php.
Using eval() to decode the array encode in JSON that passed from php;
Calls functions to write charts in HTML DOM elements;
*/
function doAjax5(){
	//get data from ajaxProfile.php and update HTML document 
	// display data of users' profile
	
		//get html element tags' id and write messages;
      if(obj5.readyState==4 && obj5.status==200){
		var user_email = document.getElementById("user_email");
		var user_name = document.getElementById("user_name");
		var age = document.getElementById("age");
		var weight = document.getElementById("weight");
		var height = document.getElementById("height");
		var country = document.getElementById("country_choice");
		var result = eval(obj5.response); //decode jason array;
//		  alert(result);
		write_profile(user_email, user_name,age,weight, height,country, result);
		
      }
    }

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_user_overview(idtag, array){
	'use strict';
	if(array.length === 1){
		idtag.innerHTML = "<p>"+array[0]+"</p>";
	}
	else{
		var country="";
		// a user may have already donated to several countries;
		for(var i=0; i<array[1].length;i++){
			country = country+array[1][i]+" ,";
		}
		idtag.innerHTML = "<p>Total activity duration: "+array[0][0]+" mins</p>"
			+"<p>Total calories burned: "+array[0][1]+"</p>"
			+"<p>Total distance traveled: "+array[0][2]+" km</p>"
			+"<p>Total watts generated: "+array[0][3]+" w</p>"
			+"<p>country donated: "+country+"</p>"
			+"<p>Total number of activity: "+array[2][0]+"</p>";
	}
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_last_week_duration(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart1" style="width: 600px; height: 300px;"></div>';
	var lable = [];
	var duration = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		duration.push(array[i][1]);
	}

	new Chartist.Line('#chart1', {
  		labels: lable,
  		series: [duration]
	}, {
  		fullWidth: false,
  		chartPadding: {
		right: 40
  	}

	});
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_lst_week_calorie(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart2" style="width: 600px; height: 300px;"></div>';
	var lable = [];
	var cal = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		cal.push(array[i][2]);
	}

	new Chartist.Bar('#chart2', {
  		labels: lable,
  		series: cal
		}, {
		distributeSeries: true
	});

}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_lst_week_distance(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart3" style="width: 600px; height: 300px;"></div>';
	var lable = [];
	var distance = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		distance.push(array[i][3]);
	}

	new Chartist.Line('#chart3', {
		labels: lable,
  		series: [distance]
	}, 
	{
		fullWidth: false,
  		chartPadding: {
		right: 40
  	}

	});
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_lst_week_watts(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart4" style="width: 600px; height: 300px;"></div>';
	var lable = [];
	var watts = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		watts.push(array[i][4]);
	}

	new Chartist.Bar('#chart4', {
  		labels: lable,
  		series: watts
		}, {
		distributeSeries: true
	});
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_last_month_duration(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart5" style="width: 900px; height: 300px;"></div>';
	var lable = [];
	var duration = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		duration.push(array[i][1]);
	}

	new Chartist.Line('#chart5', {
  		labels: lable,
  		series: [duration]
	}, {
  		fullWidth: false,
  		chartPadding: {
		right: 40
  	}

	});
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_lst_month_calorie(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart6" style="width: 900px; height: 300px;"></div>';
	var lable = [];
	var cal = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		cal.push(array[i][2]);
	}

	new Chartist.Bar('#chart6', {
  		labels: lable,
  		series: cal
		}, {
		distributeSeries: true
	});

}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_lst_month_distance(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart7" style="width: 900px; height: 300px;"></div>';
	var lable = [];
	var distance = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		distance.push(array[i][3]);
	}

	new Chartist.Line('#chart7', {
		labels: lable,
  		series: [distance]
	}, 
	{
		fullWidth: false,
  		chartPadding: {
		right: 40
  	}

	});
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_lst_month_watts(idtag, array){
	'use strict';
	idtag.innerHTML = '<div class="ct-chart ct-perfect-fourth" id="chart8" style="width: 900px; height: 300px;"></div>';
	var lable = [];
	var watts = [];
	
	for( var i=array.length-1; i>=0;i--){
		lable.push(array[i][0]);
		watts.push(array[i][4]);
	}

	new Chartist.Bar('#chart8', {
  		labels: lable,
  		series: watts
		}, {
		distributeSeries: true
	});
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_donation(idtag, array){
	'use strict';
	
	idtag.innerHTML = '<div class="ct-chart-donut ct-perfect-fourth" id="chart9" style="width: 500px; height: 450px;"></div>';
	var labels = [];
	var series = [];
	
	for(var i = 0; i<array.length; i++){
		if(Math.floor(array[i][1]) !== 0){
			series.push(parseFloat(array[i][1]).toFixed(1));
			labels.push(array[i][0]);
		}
	}
	
	new Chartist.Bar('#chart9', {
	  labels: labels,
	  series: series
	}, {
	  distributeSeries: true
	});
}

/*
@param: idtag: a HTML DOM element get by id.
		array: 2-D array
*/
function write_profile(email, name,age,weight, height,country, array){
	
	email.innerHTML = array[0];
	name.innerHTML = array[1];
	age.innerHTML = array[2];
	weight.innerHTML = array[3];
	height.innerHTML = array[4];
	country.innerHTML = array[5];
	
	
}





