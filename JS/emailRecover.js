// JavaScript Document


$(function(){ 
	'use strict';
    $("#sub_btn").click(function(){ 
        var email = $("#email").val(); 
      
            //$("#sub_btn").attr("disabled","disabled").val('提交中..').css("cursor","default"); 
		
            $.post("sendMail.php",{mail:email},function(msg){ 
                if(msg==="noreg"){ 
                    $("#chkmsg").html("该邮箱尚未注册！"); 
                    //$("#sub_btn").removeAttr("disabled").val('提 交').css("cursor","pointer"); 
                }else{ 
                    $(".demo").html("<h3>"+msg+"</h3>"); 
                } 
            }); 
        }); 
    }); 
