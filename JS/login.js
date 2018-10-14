
/**********************************************************************
 * 创建时间：2018-10-14
 * 执行异步HTTP请求，验证登录用户
**********************************************************************/



/* ===============================================
 * 登陆操作，后端验证用户；
=============================================== */
function login(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

	$.ajax({
		type: "POST",
		url: "http://localhost/CSI4900/api/api/login.php",
		data: {
			email: email,
			password: password
		},
		success: function(res){
            console.log( res );
            /* 用户验证出现错误 */
            if( res['message'] ){
                setCookie('useremail',null);
                console.log("用户不存在");
                alert("邮箱或密码错误，请重新输入");
                return;
            }
            /* 用户存在，并且个人信息填写完毕 */
            if ( res['data']['infoComplete']==true ){
                setCookie('useremail', email, 60*60*2);//2 hours;
                window.location.href='infoDisplay.php';
            }
            /* 用户存在，单未填写完整信息 */
            else if( res['data']['infoComplete']== false && res['data']['isRegistered']==true ){
                setCookie('signupUser', email, 300);
                window.location.href='signUpInfo.html';
            }
            /* 用户不存在 */
            else if(res['data']['isRegistered']==false){
                setCookie('useremail',null);
                console.log("用户不存在");
            }
		}
	});
}

/* ===============================================
 * 设置cookie
 * @param: 
 *      name: cookie 名称,
 *      value: 保存的cookie值,
 *      second: 需要保存的时长（秒）
 * @return: 
 *      void
=============================================== */
function setCookie(name,value,second){

    var exp = new Date();
    exp.setTime(exp.getTime() + second*1);	
    var cookie = value;
    //deleteCookie(name);
    document.cookie = name +"="+ cookie +";expires="+ exp.toGMTString();

}

/* ===============================================
 * 删除cookie
 * @param:
 *      name: cookie 名称
=============================================== */
function deleteCookie(name){
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 100); //将date设置为过去的时间
    var cval=getCookie(name); 
    if(cval!== null){ 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
}

/* ===============================================
 * 提取cookie值；
 * @param:
 *      cname: cookie name
 * @returns:
 *      与cname对应的cookie值
=============================================== */
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

/* =================================================
 * 创建 XMLHttpRequest 对象，用于和服务器交换数据
================================================= */
// var xmlobj;
// function createXMLHttpRequest(){
//     if(window.ActiveXObject){
//           xmlobj=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     else if(window.XMLHttpRequest){
//           xmlobj=new XMLHttpRequest();
//     }
//     return xmlobj;
// }

// function login(){
//     createXMLHttpRequest();
//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;

//     xmlobj.open("GET","http://localhost/CSI4900/api/api/login.php",true);
//     xmlobj.onreadystatechange=doAjax;
// 	xmlobj.send("r="+Math.random());
// }

// function doAjax(){
//     //get html element tags' id and display messages;
//     //if(xmlobj.readyState==4 && xmlobj.status==200){
	
//         console.log("doajax");
//         var result = eval(xmlobj.response); //result is the data passed by php script using echo;
//         alert(result['message']);
//     //}
// }



