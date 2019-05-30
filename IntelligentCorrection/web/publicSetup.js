//全局ajax控制，用于session超时 无权限时 提示
$.ajaxSetup({
	cache: false, //close AJAX cache
	contentType:"application/x-www-form-urlencoded;charset=utf-8", 
	complete:function(XHR,textStatus){   
		
        var resText = XHR.responseText;
        
        if(resText=='userAjaxSessionTimeOut'){   
        	
        	sessionTimeOut("login.jsp");
        } else if (resText=='schoolManagerAjaxSessionTimeOut') {
        	//sessionTimeOut("page/user/login_keyreportor.jsp");
        } else if (resText=='keyManagerAjaxSessionTimeOut') {
        	//sessionTimeOut("page/user/login_keymanager.jsp");
        } else if(resText=='ajaxNoLimit'){   
        	noLimit();
        }        
    } 
});

function sessionTimeOut(url){
//	$.messager.alert('操作提示','用户登录会话已过期，请重新登录！','warning');
//	setTimeout('window.top.location.href = "' + url + '"', 3000);
	window.top.location.href = url;
}

function noLimit(){
	$.messager.alert('操作提示','无相应操作权限，请联系系统管理员！','warning');
}