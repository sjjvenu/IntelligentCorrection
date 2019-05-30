$.ajaxSetup({cache:false});

$(function() {
	// 新版本加载教师端页面块

	if ($('#teacherMenu').length == 0) {
		
		$('#teacherHeader').load(getNoncacheURL('/pv1/teacher/teacher_header.html'), function() {
			
			$('.body').show();
			
			$.get('/teacherAction_loadProfile', function (response) {

				if (response.result == false) {
					showWarningToast('提示', response.message, response.errorKey);
					return;
				}
				
				var data = response.data;
				
				$('.teacherName').text(data.name);
				$('.schoolName').text(data.schoolName);
				$('.headImage').attr('src', getNoncacheURL(data.headImage));
				
			});
			
		});
		
	} else {
		$('#teacherHeader').load(getNoncacheURL('/pv1/teacher/teacher_header.html'), function() {
			$('#trueLeft').css({left : $('#headLogoImage').offset().left + 'px'});
		});
	}
	
	$('#teacherMenu').load(getNoncacheURL('/pv1/teacher/teacher_menu.html'), function() {
		$('.body').show();
		
		$.get('/teacherAction_loadProfile', function (response) {

			if (response.result == false) {
				showWarningToast('提示', response.message, response.errorKey);
				return;
			}
			
			var data = response.data;
			
			$('.teacherName').text(data.name);
			$('.schoolName').text(data.schoolName);
			$('.headImage').attr('src', getNoncacheURL(data.headImage));
			
			$('#trueLeft').css({left : $('#headLogoImage').offset().left + 'px'});
			
		});
		
	});
	
	$(document).on('click', '#btnTeacherMenuWritingBank', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_writing_bank.html');
	});
	
	$(document).on('click', '#btnTeacherSetting,.teacherSetting', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_setting.html');
	});
	
	$(document).on('click', '#btnTeacherMenuHomePage,#btnTeacherMenuHomePage2', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_home.html');
	});
	
	$(document).on('click', '#btnTeacherMenuSelfWritingBank', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_self_writing_bank.html');
	});
	
	$(document).on('click', '#btnTeacherMenuSelfPractice', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_self_practice_list.html');
	});
	
	$(document).on('click', '#btnTeacherMenuHomework', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_homework_list.html');
	});
	
	$(document).on('click', '#btnTeacherMenuExamination', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_examination_list.html');
	});
	
	$(document).on('click', '#btnTeacherMenuClassEntityManage', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_classentity_manage.html');
	});
	
	$(document).on('click', '#btnTeacherMenuReport', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_report_list.html');
	});
	
	$(document).on('click', '#btnTeacherSetting', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_setting.html');
	});
	
	$(document).on('click', '.btnCreateHomework', function() {
		window.location.href = getNoncacheURL('/pv1/teacher/teacher_homework_step1.html');
	});
	
	// 新版本加载学生端页面块
	if ($('#studentMenu').length == 0) {
		
		$('#studentHeader').load(getNoncacheURL('/pv1/student/student_header.html'), function() {
			
			$('.body').show();
			
			$.get('/studentAction_loadProfile', function (response) {

				if (response.result == false) {
					showWarningToast('提示', response.message, response.errorKey);
					return;
				}
				
				var data = response.data;
				
				$('.studentName').text(data.name);
				$('.headImage').attr('src', getNoncacheURL(data.headImage));
				
			});
			
		});
		
	} else {
		$('#studentHeader').load(getNoncacheURL('/pv1/student/student_header.html'));
	}
	
	$('#studentMenu').load(getNoncacheURL('/pv1/student/student_menu.html'), function() {
		$('.body').show();
		
		$.get('/studentAction_loadProfile', function (response) {

			if (response.result == false) {
				showWarningToast('提示', response.message, response.errorKey);
				return;
			}
			
			var data = response.data;
			
			$('.studentName').text(data.name);
			$('.headImage').attr('src', getNoncacheURL(data.headImage));
			
		});
		
	});
	
	$(document).on('click', '#btnStudentMenuOpenStylePractice', function() {
		
		 $.post('/selfPracticeAction_createOpenStyle', {}, function(response) {

		    if (response.result == false) {
		      showWarningToast('提示', response.message, response.errorKey);
		      return;
		    }
	
		    window.location.href = getNoncacheURL('/pv1/student/student_self_practice_step1.html?id=' + response.data);
		  });

	});
	
	$(document).on('click', '#btnStudentMenuWritingBank', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_writing_bank.html');
	});
	
	$(document).on('click', '#btnStudentSetting,.studentSetting', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_setting.html');
	});
	
	$(document).on('click', '#btnStudentMenuHomePage,#btnStudentMenuHomePage2', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_home.html');
	});
	
	$(document).on('click', '#btnStudentMenuSelfWritingBank', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_self_writing_bank.html');
	});
	
	$(document).on('click', '#btnStudentMenuSelfPractice', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_self_practice_list.html');
	});
	
	$(document).on('click', '#btnStudentMenuHomework', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_homework_list.html');
	});
	
	$(document).on('click', '#btnStudentMenuExamination', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_examination_list.html');
	});
	
	$(document).on('click', '#btnStudentMenuClassEntity', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_classentity.html');
	});
	
	$(document).on('click', '#btnStudentSetting', function() {
		window.location.href = getNoncacheURL('/pv1/student/student_setting.html');
	});
	
	// 新版本加载教务端页面块
	if ($('#rectorMenu').length == 0) {
		
		$('#rectorHeader').load(getNoncacheURL('/pv1/rector/rector_header.html'), function() {
			
			$('.body').show();
			
			$.get('/rectorAction_loadProfile', function (response) {

				if (response.result == false) {
					showWarningToast('提示', response.message, response.errorKey);
					return;
				}
				
				var data = response.data;
				
				$('.rectorName').text(data.name);
				$('.headImage').attr('src', getNoncacheURL(data.headImage));
				
			});
			
		});
		
	} else {
		$('#rectorHeader').load(getNoncacheURL('/pv1/rector/rector_header.html'));
	}
	
	$('#rectorMenu').load(getNoncacheURL('/pv1/rector/rector_menu.html'), function() {
		$('.body').show();
		
		$.get('/rectorAction_loadProfile', function (response) {

			if (response.result == false) {
				showWarningToast('提示', response.message, response.errorKey);
				return;
			}
			
			var data = response.data;
			
			$('.rectorName').text(data.name);
			$('.headImage').attr('src', getNoncacheURL(data.headImage));
			
		});
		
	});
	
	$(document).on('click', '#btnRectorHome', function() {
		window.location.href = getNoncacheURL('/pv1/rector/rector_home.html');
	});
	
	$(document).on('click', '#btnRectorSetting', function() {
		window.location.href = getNoncacheURL('/pv1/rector/rector_setting.html');
	});
	
});

//初始化函数  检测ie浏览器版本 如果版本低于10就给出提示
$(document).ready(function() {
	var userAgent = navigator.userAgent;
	//console.log(navigator);
	var appVersion = navigator.appVersion
	// console.log(appVersion);
	var a = appVersion.indexOf('IE')
	if (a === -1) {

	} else {
		var b = appVersion.substring(a + 3, a + 4)
		// console.log(b);
		var c = parseInt(b)
		if (b < 10) {
			alert('当前IE浏览器版本过低,请升级为IE10以上版本使用本系统')
		}
	}
});

var gradeMap = new Object();

gradeMap["3"] = "三年级";
gradeMap["4"] = "四年级";
gradeMap["5"] = "五年级";
gradeMap["6"] = "六年级";
gradeMap["7"] = "初一";
gradeMap["8"] = "初二";
gradeMap["9"] = "初三";
gradeMap["10"] = "高一";
gradeMap["11"] = "高二";
gradeMap["12"] = "高三";
gradeMap["13"] = "大学以上";

var hskGradeMap = new Object();

hskGradeMap["1"] = "1 Level";
hskGradeMap["2"] = "2 Level";
hskGradeMap["3"] = "3 Level";
hskGradeMap["4"] = "4 Level";
hskGradeMap["5"] = "the Five Level";
hskGradeMap["6"] = "6 Level";

function showSuccessToast(title) {
	$.toast({ 
		  heading : title, 
		  allowToastClose : true,
		  hideAfter : 5000,
		  position : 'top-center',
		  icon: 'success',
		  showHideTransition: 'slide',
		  loader: false
	});
}

function showWarningToast(title, text, errorKey) {
	
	if (errorKey == 'mustLogin') {
		window.location.href = getNoncacheURL('/pv1/login.html?errorKey=' + errorKey);
	}
	
	$.toast({ 
		  heading : title, 
		  text : text,
		  allowToastClose : true,
		  hideAfter : 5000,
		  position : 'top-center',
		  icon: 'warning',
		  showHideTransition: 'slide',
		  loader: false
	});
}

function hasFlash() {  
    //navigator.mimeTypes是MIME类型，包含插件信息  
    if (navigator.mimeTypes.length > 0) {  
        //application/x-shockwave-flash是flash插件的名字  
        var flashAct = navigator.mimeTypes["application/x-shockwave-flash"];  
        return flashAct != null ? flashAct.enabledPlugin != null : false;  
    } else if (self.ActiveXObject) {  
        try {  
            new ActiveXObject('ShockwaveFlash.ShockwaveFlash');  
            return true;  
        } catch (oError) {  
            return false;  
        }  
    }  
} 

function promotionUnderline($segement) {
	$segement.find('u').contents().unwrap().wrap('<span style="border-bottom: 2px solid red;text-decoration:none;float:none;margin-right:0px;" />');
}

function insertOptionSymbol(index, $option) {
	if ($option.length >= 1) {
		$option.first().prepend(getOptionSymbol(index) + '. ');	
	}
}

function getSectionSymbol(index) {
	if (index == 1) {
		return '一';
	} else if (index == 2) {
		return '二';
	} else if (index == 3) {
		return '三';
	} else {
		return '四';
	}
}

function getValArray(selector) {
	var valArray = [];
	selector.each(function () {
		valArray.push($(this).val());
	});
	
	return valArray;
}

function addCookie(objName, objValue, timeoutMS, path){//添加cookie 
    var str = objName + "=" + escape(objValue) + '; path=' + path; 
    if (timeoutMS > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失 
    	var date = new Date(); 
        date.setTime(timeoutMS); 
        str += "; expires=" + date.toGMTString(); 
    }
    document.cookie = str; 
}
		
function getCookie(objName){//获取指定名称的cookie的值 
	
    var arrStr = document.cookie.split("; "); 
    for (var i = 0; i < arrStr.length; i++) { 
        var temp = arrStr[i].split("="); 
        if (temp[0] == objName) 
            return unescape(temp[1]); 
    } 
}

function delCookie(name, path){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
    var date = new Date(); 
    date.setTime(date.getTime() - 10000); 
    document.cookie = name + "=a; path=" + path + "; expires=" + date.toGMTString(); 
} 

function getQueryString(name) {
	
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) {
		return unescape(r[2]);
	} else {
		return null;
	}

}

function getParentQueryString(name) {
	
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = window.parent.location.search.substr(1).match(reg);
	if (r!=null) {
		return unescape(r[2]);
	} else {
		return null;
	}

}

function getNoncacheURL(url) {
	if (url.indexOf('?') >= 0) {
		return url + '&_' + + new Date().getTime();
	} else {
		return url + '?_' + + new Date().getTime();
	}
}

$(function () {
	$('.noCacheLink').each(function() {
		var $this = $(this);
		$this.attr('href', getNoncacheURL($this.attr('href')));
	});
});

function changeCheckboxStatus($span) {
	
	var $img = $span.find('img');
	
	if ($img.attr('ochecked') == 'false') {
		$img.attr('ochecked', 'true');
		$img.attr('src', '/v3_prototype/image/checked.png');
	} else {
		$img.attr('ochecked', 'false');
		$img.attr('src', '/v3_prototype/image/unchecked.png');
	}
}

function changeRadioStatus($span, oid) {
	$span.find('img').attr('src', '/v3_prototype/image/radio_unchecked.png').attr('ochecked', 'false');
	$span.find('img[oid=' + oid + ']').attr('src', '/v3_prototype/image/radio_checked.png').attr('ochecked', 'true');
}

function resetCheckboxStatus($span) {
	
	var $img = $span.find('img');
	
	$img.attr('ochecked', 'false');
	$img.attr('src', '/v3_prototype/image/unchecked.png');

}

function resetRadioStatus($span) {
	
	var $img = $span.find('img');
	
	$img.attr('ochecked', 'false');
	$img.attr('src', '/v3_prototype/image/radio_unchecked.png');

}

function handleErrorMessage(response) {
	
	if ($('#' + response.errorField).size() != 0) {
		$('#' + response.errorField).text(response.message);
	} else {
		alert(response.message);
	}

}

function logout() {
	
	$.post('/userActionv3_logout', {}, function (response) {
		if (response.result) {
			//delCookie('rememberMeUserId', '/');
			//delCookie('rememberMeKey', '/');
			//delCookie('rememberMeExpiryTime', '/');
			//delCookie('rememberMeRoleName', '/');
			window.location.href = getNoncacheURL('/index.html');
		} else {
			handleErrorMessage(response);
		}
	});
	
}

function refreshUnreadMessageCount() {
	
	$.post('/messageAction_getUnreadMessageCount', {}, function (response) {
		if (response.result) {
			if (response.unreadMessageCount != 0) {
				$('#unreadMessageCount,#unreadMessageCountMenu').text(response.unreadMessageCount);
			} else {
				$('#unreadMessageCount,#unreadMessageCountMenu').parent().hide();
			}
		} else {
			handleErrorMessage(response.message);
		}
	});
	
}

function getOptionSymbol(index) {
	if (index == 0) {
		return 'A';
	} else if (index == 1) {
		return 'B';
	} else if (index == 2) {
		return 'C';
	} else if (index == 3) {
		return 'D';
	} else if (index == 4) {
		return 'E';
	} else if (index == 5) {
		return 'F';
	} else {
		return '？';
	}
}

var do_paper_model = true;

$(function() {
	
	$(document).on('click', '.in-checkbox', function() {
		
		var $this = $(this);
		
		var otype = $this.attr('otype');
		
		if (otype == 'radio') {
			
			var oname = $this.attr('oname');
			
			$('.in-checkbox[oname=' + oname + ']').removeClass('in-checkbox-active');
			$this.addClass('in-checkbox-active');
			
		} else if (otype == 'checkbox') {
			
			$this.toggleClass('in-checkbox-active');
			
		}
		
	});
	
	$(document).on('click', '.classEntityCheckbox', function() {
		
		var $this = $(this);
	
		$this.toggleClass('active');
	
	});
	
	$(document).on('click', '.classEntityRadio', function() {
		
		var $this = $(this);
	
		$this.addClass('active').siblings('li').removeClass('active')
	
	});
	
	$(document).on('click', '.classEntityCheckBox', function() {
		
		var $this = $(this);
	
		$this.toggleClass('active');
	
	});
	
	$(document).on('click', '.selectbox li', function() {
		
		if (do_paper_model == true) {
			$(this).addClass('selected').siblings('li').removeClass('selected');
		}
	
	});

});

function autoHeight($question) {
	
	var $dlist = $question.find(".dlist");
	
	// 阅读理解题可能有多个选择题项，因此需要迭代
	$dlist.each(function() {
		
		var $lis = $(this).find("li");
		
		var $optionA = $lis.eq(0);
		var $optionB = $lis.eq(1);
		
		optionSameHeight($optionA, $optionB);
				
		var $optionC = $lis.eq(2);
		var $optionD = $lis.eq(3);
		
		optionSameHeight($optionC, $optionD);
		
	});
	
}

function optionSameHeight($option1, $option2) {
	
	var option1Height = $option1.find('.exam-item').height();
	var option2Height = $option2.find('.exam-item').height();
		
	var maxHeight = option1Height > option2Height ? option1Height : option2Height;
	
	$option1.find('.exam-item').css("height", maxHeight);
	$option2.find('.exam-item').css("height", maxHeight);
	
	// 学生端不会有hd，所以不会有影响
	$option1.find('.exam-item').children(".hd").css({
		'height' : maxHeight+2 + 'px',
		'line-height' : maxHeight + 'px'
	});
	$option2.find('.exam-item').children(".hd").css({
		'height' : maxHeight+2 + 'px',
		'line-height' : maxHeight + 'px'
	});

}

function autoExtendFilling(selector, maxEmSize) {
	var $obj = selector;
	var minEmSize = parseInt($obj.get(0).style.minWidth);
	var maxEmSize = parseInt($obj.get(0).style.maxWidth);
	var currentLength = $obj.val().length + 1;
	var changeLength = currentLength > minEmSize ? currentLength : minEmSize;
	var changeLength = changeLength > maxEmSize ? maxEmSize : changeLength;
	$obj.css('width', changeLength + 'em');
}

function isInteger(value) {         //验证是否为数字
    var patrn = /^\d+$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
