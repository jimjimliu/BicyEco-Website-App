// JavaScript Document

/*
	Create a httpRequest object whenever one needs to open a php page;
	*/
//var xmlobj;

function createXMLHttpRequest2(){
  if(window.ActiveXObject){
	xmlobj=new ActiveXObject("Microsoft.XMLHTTP");
  }
  else if(window.XMLHttpRequest){
	xmlobj=new XMLHttpRequest();
  }
  return xmlobj;
}

function update_password(){
	if(document.getElementById("pw").value == ''){
		
	}
	else{
	  
		xmlobj = createXMLHttpRequest2();    
			 //count=count+1;  
		var pwd = document.getElementById("pw").value;
		document.cookie = "pw"+"="+pwd+";";

		var new_pwd = document.getElementById('pw1').value;
		document.cookie = "pw1"+"="+new_pwd+";";
	
		xmlobj.open("GET","change_psw.php",true);
		xmlobj.onreadystatechange=change_psw;
		xmlobj.send("r="+Math.random());
	}
}

function change_psw(){
		//get html element tags' id and display messages;
    if(xmlobj.readyState==4 && xmlobj.status==200){
			console.log('dojax');
		//document.getElementById('demo').innerHTML = ''; //clear the prompt message after email has been sent;
		var result = eval(xmlobj.response); //result is the data passed by php script using echo;
		alert(result);
	}
}