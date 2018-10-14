/**********************************************************************
 * 创建时间：2018-10-14
 * 执行异步HTTP请求，注册新用户
**********************************************************************/


/**============================================
 * 执行异步请求，注册新用户
============================================*/
function register(){
	var email = document.getElementById('email').value;
	var password = document.getElementById('psw1').value;
	console.log('dfasdfa');
	$.ajax({
		type: "POST",
		url: 'http://localhost/CSI4900/api/api/user_register.php',
		data: {
			email: email,
			password: password
		},
		success: function(res){
			console.log(res);
			/* 后端验证出现错误 */
			if( res['message'] ){
				console.log(res['message']);
				setTimeout(function(){window.location.href='loginPage.html';alert('用户已存在');},1000);
			}
			/* 验证成功，成功添加用户 */
			else if( res['data']['success'] === true ){
				document.cookie = "signupUser"+"="+email+";";
				window.location.href = 'signUpInfo.html';
			}
			return;
		}
	});
}