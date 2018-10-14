// JavaScript Document

/*
	Create a httpRequest object whenever one needs to open a php page;
	*/
var xmlobj;

function createXMLHttpRequest(){
  if(window.ActiveXObject){
	xmlobj=new ActiveXObject("Microsoft.XMLHTTP");
  }
  else if(window.XMLHttpRequest){
	xmlobj=new XMLHttpRequest();
  }
  return xmlobj;
}

function Autofresh(){
	if(document.getElementById("email").value == ''){
		
	}
	else{
	  document.getElementById('demo').innerHTML = 'Sending email, please wait...';
		createXMLHttpRequest();    
			 //count=count+1;  
		var email = document.getElementById("email").value;
		document.cookie = "email"+"="+email+";";
	
		xmlobj.open("GET","sendMail.php",true);
		xmlobj.onreadystatechange=doAjax;
		xmlobj.send("r="+Math.random());
	}
}

function doAjax(){
		//get html element tags' id and display messages;
    if(xmlobj.readyState==4 && xmlobj.status==200){
			console.log('dojax');
		document.getElementById('demo').innerHTML = ''; //clear the prompt message after email has been sent;
		var result = eval(xmlobj.response); //result is the data passed by php script using echo;
		alert(result);
	}
}