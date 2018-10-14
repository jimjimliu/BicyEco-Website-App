//-----------------------------------
//automatically fill in the email input in the signing up form when loading signUpInfo.html page;
//html <body> tag calls autoload() method to fill in email input;
//-----------------------------------


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
		if(word.includes("%40")){
			var result = word.split('%40');//solve the problem by replacing %40 by @;
			return result[0]+"@"+result[1];
		}
	    else{
			return word;
		}
	}
  }
  return "";
}

function autoload(){
//	automatically fill the input with id=email using signupuser cookie to make sure user does not enter wrong email;
	var cookie = getCookie("signupUser");

	document.getElementById("email").value = cookie;
}