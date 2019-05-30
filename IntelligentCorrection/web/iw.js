
 var iw = function () { };


(function($){
	$(document).ready(function(){
	   //判断浏览器版本，如果太低，就不能做任何事情，具体内容修改下面的代码
	   if (navigator.userAgent.indexOf("MSIE")>0 &&
			   navigator.appVersion.replace(/.*MSIE (\d+)..*/, "$1") < 8) {
		   $($(".container")[1]).html(
		   '<div style="margin-top:100px">' +
		   '<p><center><img src="../../img/ie.png"></center></p>' +
		   '<p>&nbsp;</p>' +
		   '<h3>浏览器不兼容</h3>' +
		   '<p>您的浏览器版本过低，<a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie">请升级IE到最新版本</a>或更换火狐、谷歌等浏览器。</p>' +
		   '</div>'
	   );
	   }
	});
	})(jQuery);

iw.message = {
	E000000 : "服务器忙，请稍后再试",
	E000001 : "邮箱/密码/验证码不能为空",
	E000002 : "输入的邮箱无效",
	E000003 : "无此邮箱/密码错误",
	E000004 : "请输入您注册的邮箱",
	E000005 : "请输入真实的邮箱地址",
	E000006 : "此邮箱不存在，请换一个",
	E000007 : "此邮箱已存在，请换一个",
	E000008 : "请输入密码",
	E000009 : "密码需要由8-16位字母、数字及特殊符号组成",
	E000010 : "请输入确认密码",
	E000011 : "确认密码错误",
	E000012 : "请输入验证码",
	E000013 : "验证码输入错误，请重新输入",
	E000014 : "用户还没有激活,请登陆到邮箱激活",
	E000015 : "激活信息非法",
	E000016 : "<a href=\"/page/user/login.jsp\">该用户已经被激活，请直接登录</a>",
	E000017 : "<a href=\"/page/user/login.jsp\">用户激活成功.请登陆.</a>",
	E000018 : "注册成功，请登陆注册邮箱激活。",
	E000019 : "【真实姓名】最大长度位16个英文字符（一个汉字为等于两个字符）",
	E000020 : "【学号/工号】最大长度位16个英文字符（一个汉字为等于两个字符）",
	E000021 : "【学校名称】最大长度位60个英文字符（一个汉字为等于两个字符）",
	E000022 : "【院系名称】最大长度位60个英文字符（一个汉字为等于两个字符）",
	E000023 : "必须输入课程名称",
	E000024 : "有错误字符",
	E000025 : "最长30汉字，等长字母或数字",
	E000026 : "课程介绍的最大长度为250字",
	E000027 : "必须有创建密钥才能创建课程",
	E000028 : "该课程密钥不可使用",
	E000029 : "该课程邀请码已被占用",
	E000030 : "课程邀请码不能为空",
	E000031 : "{0}处理成功",
	E000032 : "邀请码错误，请联系课程创建者",
	E000033 : "指定邀请码的课程已加入",
	E000034 : "指定邀请码的课程已退出",
	E000035 : "创建密钥错误，请确认创建密钥",
	E000036 : "该数据已被他人修改，请重新检索再执行处理",
	E000037 : "旧密码不正确",
	E000038 : "{0}不能为空",
	E000039 : "{0}字数最大长度位{1}个英文字符（一个汉字为等于两个字符）",
	E000040 : "该邮箱地址尚未在iwrite中注册，请重新注册。",
	E000041 : "未查看老师评阅，不能提交师评",
	E000042 : "该课程名已存在，是否继续使用该课程名",
	E000043 : "学校名称最长50汉字，等长字母或数字",

	E100001 : "标题不能超过150个英文字符",
	E100002 : "要求不能超过1500个英文字符",
	E100003 : "要求和标题不能同时为空",
	E100004 : "字数下限必须为20-2000以内的正整数",
	E100005 : "请选择作业开始时间",
	E100006 : "写作结束时间必须晚于写作开始时间",
	E100007 : "机评次数必须为0~99的整数",
	E100008 : "指定范文不能超过10000个英文字符",
	E100009 : "备注不能超过5000个英文字符",
	E100010 : "字数下限不能为空",
	E100011 : "作业开始时间不能为空",
	E100012 : "作业结束时间不能为空",
	E100013 : "互评结束时间不能为空",
	E100014 : "修改结束时间不能为空",
	E100015 : "互评结束时间必须晚于写作结束时间",
	E100016 : "修改结束时间必须晚于互评结束时间",
	//编辑作业
	E100017 : "不能为空",
	E100018 : "数字1-1000",
	E100019 : "一位字母A-Z不区分大小写",
	//复制作业
	E100020 : "复制成功！",
	E100021 : "选择作业为空！",
	E100022 : "选择课程为空！",
	E100023 : "查找作业失败！",
	E100024 : "导入成功！",
	E100025 : "请输入切题关键字",
	E100000 : ""

};


 iw.server = getUrl();
 function getUrl() {
	var  cur = window.document.location.origin;
	if (cur === 'http://localhost:4200') {
		// return 'http://localhost:8080/aw';
		return 'http://awrite.arkofenglish.com:8080/aw';
		// return 'http://39.106.13.146/aw';
	} else {
		return cur +'/aw';
	}
 }
 iw.auth = function() {
	 // 获得用户id
	 //var uId = JSON.parse(localStorage.getItem('user')).id
	 // 获得用户token
	 //var token =  'bearer' + ' ' + JSON.parse(localStorage.getItem('token')).access_token
   return 'token';
 };
 iw.uid=function(){
	  // 获得用户id
	  var uId = JSON.parse(localStorage.getItem('user')).id
	return uId;
 }
iw.userType=function(){
	/*
	var userType = JSON.parse(localStorage.getItem('user')).userType
	if(userType==0){
		userType="student"
	}else{
		userType="teacher"
	}
	return userType;*/
	return '';
};
iw.ie6 = navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") > 0;

iw.parent = (parent || top || window);

iw.val = function (e) {
    return $.trim(((typeof e == "string") ? $("#" + e) : e).val());
};
iw.val2 = function (e) {
    return encodeURIComponent(csdn.val(e));
};
iw.hasVal = function (e) {
    var v = iw.val(e);
    return (v != "");
};
iw.closeWin = function (e) {
    window.opener = null;
    if (!window.close()) {
        location = 'http://www.iwriting.net/';
    }
    return false;
};

iw.checkEmail = function (em) {
    return /^([a-z0-9][a-z0-9_\-\.]*)@([a-z0-9][a-z0-9\.\-]{0,20})\.([a-z]{2,4})$/i.test(em);
};

iw.checkPassword = function (pw) {
    return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\da-zA-Z\W]{8,16}$/i.test(pw);
};

iw.checkAccount = function (account) {
    return /^[0-9a-zA-Z]{6,20}$/i.test(pw);
};

iw.bytelen = function (str) {
	return str.replace(/[\u4E00-\u9FA5]/g, "xx").length;
};

/* 判断是否按下了enter键*/
iw.isEnter = function (ev) {
    ev = ev || window.event;
    var code = (ev.keyCode || ev.which);
    return (code == 10 || code == 13);
};

/*获取一个指定长度随机数*/
iw.random = function (len) {
    if (!len) len = 6;
    var r = Math.random().toString();
    return r.substr(r.length - len);
};

/* 重新获取验证码*/
iw.changeValidateCode = function (obj) {
    var currentTime = new Date().getTime();
    obj.src = "IWriting_Rand.action?d=" + currentTime;
};

/* 重新获取验证码(4位)*/
iw.changeValidateCode4 = function (obj) {
    var currentTime = new Date().getTime();
    obj.src = "IWriting_Rand4.action?d=" + currentTime;
};

/* 获取URL参数 */
iw.getUrlParam = function (name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return ""; //返回参数值
};

/* 字符串格式化 */
iw.StringFormat = function(src){
    if (arguments.length == 0) {
    	return null;
    }
    var args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};


/**
 * get cookie's value
 */
function GetCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal(j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) {
			break;
		}
	}
	return null;
}
function getCookieVal(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}

/**
 * set cookie's value
 */
function SetCookie(name, value, expires) {
    var argv = SetCookie.arguments;
    //本例中length = 3
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape(value)
			+ ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
			+ ((path == null) ? "" : ("; path=" + path))
			+ ((domain == null) ? "" : ("; domain=" + domain))
			+ ((secure == true) ? "; secure" : "");
}

function setTdAlgin(tableId, tdIndex, tdCount) {
	$('#' + tableId).find('td').each(function(i){//搜寻表格里的每一个区间
		if(i%tdCount == tdIndex){ //‘4’代表表格总共有4列，如果区间编号被4整除，那么它就属于第一列
		$(this).css('text-align','center');} //给区间加上特定样式
	});
}

function setTableAlign(tableId) {
	if (tableId == 'createCourseListTable') {
		setTdAlgin('createCourseListTable', 2, 7);
		setTdAlgin('createCourseListTable', 3, 7);
		setTdAlgin('createCourseListTable', 4, 7);
		setTdAlgin('createCourseListTable', 5, 7);
		setTdAlgin('createCourseListTable', 6, 7);
	} else if (tableId == 'joinCourseListTable') {
		setTdAlgin('joinCourseListTable', 2, 3);
	}
}


iw.startLoading = function(message) {

	$(document.body).append("<div id='loading' class='loadingBackground' style='height:2000px'"
			+ "><div id='loadingMessage' class='loading'><span id='loadingText'>"
			+ message
			+ "</span><button type='button' class='loadingClose' style='display:none' onclick='iw.closeLoading()' id='loadingClose'>×</button></div></div>");
};

// iw.updateLoading = function(message) {
// 	$("#loadingText").text(message);
// };

// iw.endLoading = function(result, message) {
// 	if(result == true) {
// 		$("#loadingMessage").css("background", "green");
// 		window.setTimeout('$("#loading").remove();',3000);
// 	} else {
// 		$("#loadingMessage").css("background", "red");
// 	}
// 	$("#loadingText").text(message);
// 	$("#loadingClose").css("display", "block");
// };

iw.closeLoading = function() {
	$("#loading").remove();
};

iw.alert = function(message) {

	$(document.body).append("<div id='loading' class='loadingBackground' style='height:2000px;z-index:99998"
			+ ";position:fixed;'><div id='loadingMessage'  class='alertMessage'><span style='float:left;width:90%;z-index:99999;'  id='loadingText'>"
			+ message
			+ "</span><span style='float:right;z-index:99999'><button type='button'   class='msgClose' onclick='iw.closeLoading()' id='loadingClose'>×</button></span></div><</div></div>");

	// alert(message);
//	 $.teninedialog({
//         title:'系统提示',
//         content:"aaaa",
//         showCloseButton:true,
//         otherButtons:["确定","取消"],
//         otherButtonStyles:['btn-primary','btn-primary'],
//         bootstrapModalOption:{keyboard: true},
//         dialogShow:function(){
//            // alert('即将显示对话框');
//         },
//         dialogShown:function(){
//           //  alert('显示对话框');
//         },
//         dialogHide:function(){
//            // alert('即将关闭对话框');
//         },
//         dialogHidden:function(){
//            // alert('关闭对话框');
//         },
//         clickButton:function(sender,modal,index){
//             alert('选中第'+index+'个按钮：'+sender.html());
//             $(this).closeDialog(modal);
//         }
//     });


	//$("#loadingMessage").css("background", "yellow");
};

iw.error = function(message) {

	$(document.body).append("<div id='loading' class='loadingBackground' style='height:2000px;z-index:99998;position:fixed;'"
			+ "><div id='loadingMessage' class='errorMessage'><span style='float:left;width:90%;z-index:99999' id='loadingText'>"
			+ message
			+ "</span><span style='float:right;z-index:99999'><button type='button'  class='msgClose' onclick='iw.closeLoading()' id='loadingClose'>×</button></span></div></div>");
	// $("#loadingMessage").css("background", "red");
	// alert(message);
};

iw.success = function(message) {

	$(document.body).append("<div id='loading' class='loadingBackground' style='height:2000px;z-index:99998;position:fixed;'"
			+ "><div id='loadingMessage' class='successMessage'><span  style='float:left;width:90%;z-index:99999' id='loadingText'>"
			+ message
			+ "</span><span style='float:right;z-index:99999'><button type='button' class='msgClose' onclick='iw.closeLoading()' id='loadingClose'>×</button></span></div></div>");

	// $("#loadingMessage").css("background", "green");
	// alert(message);

};

iw.confirm = function(title,message,confirmCallback) {
	var confirmModal = $("#_commonConfirm");
	var _html =
		'<div id="_commonConfirm" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="_commonConfirmTitle" aria-hidden="true"> \
		<div class="modal-header"> \
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> \
		<h3 id="_commonConfirmTitle">'+title+'</h3> \
		</div> \
		<div class="modal-body"> \
		<p>'+message+'</p> \
		</div> \
		<div class="modal-footer"> \
		<button id="_confirm" class="btn lyh btn-success">确认</button> \
		<button id="_cancel"class="btn lyh" data-dismiss="modal" aria-hidden="true">取消</button> \
		</div></div>';

	if(confirmModal.length>0){
		confirmModal.remove();
	}
	$(document.body).append(_html);

	//backdrop:static时,空白处不关闭.
	//keyboard:false时,esc键盘不关闭.
	$('#_commonConfirm').modal({backdrop: 'static', keyboard: false});
	//自动开关模态窗口
	//$('#_commonConfirm').modal('toggle');
	$('#_commonConfirm').modal('show');

	$("#_confirm").click(function(){
		$('#_commonConfirm').modal('hide');
		confirmCallback(true);
	});
	$("#_cancel").click(function(){
		$('#_commonConfirm').modal('hide');
		confirmCallback(false);
	});
}

iw.isChinese=function(text) {
	var cnLen = 0, enLen = 0;

	for(var i =0;i<text.length;i++) {
		text.charCodeAt(i) > 255 ? cnLen++ : enLen++;
	}
	return (cnLen > enLen);
};

iw.isCn=function() {
	return true;
}

iw.getRequestParam=function(strParame) {
	var args = new Object( );
	var query = location.search.substring(1);

	var pairs = query.split("&"); // Break at ampersand
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		value = decodeURIComponent(value);
		args[argname] = value;
	}
	return args[strParame];
};
/**
 * 分数转换
 */
var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
iw.scoreConverte = function(scoreType,scoreScope,score){
	if(iw.isBlank(scoreType,scoreScope,score)){
		return;
	}
	switch(scoreType){
	case "0":
		return (Number(score)/15*Number(scoreScope)).toFixed(1);
		break;
	case "1":
		return getRate(scoreScope,score);
		break;
	default:
		return (Number(score)/15*Number(scoreScope)).toFixed(1);
		break;
	}

	/**
	 * 获取评级
	 * @param scoreScope
	 * @param score
	 * @returns
	 */
	function getRate(scoreScope,score){
		var index =Math.ceil(Number(score)/15*(character.indexOf(scoreScope)+1));
		index = index<1?character.indexOf(scoreScope):index;
		index = character.indexOf(scoreScope)-index;
		return character.substring(index-1,index);
	}
}
/**
 * 判断是否为空
 */
iw.isBlank = function(){
	 for(var i=0; i<arguments.length; i++){
		 var obj = arguments[i];
		 if(obj==null||obj==undefined||obj.trim()==''){
			return true;
		 }
	}
	return false;
}
/**
 * 去掉两边空格
 */
String.prototype.trim = function() {
	  return this.replace(/(^\s*)|(\s*$)/g, '');
};

String.prototype.replaceAll = function(s1,s2){
   return this.replace(new RegExp(s1,"gm"),s2);
}
