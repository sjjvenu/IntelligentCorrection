// /**
//  * Created by liumx on 18/04/2017.
//  */

// var header_errorclass = "help-inline red";
// function header_showinfo(e, info) {
//     $(e).next().remove();
//     var p = document.createElement("div");
//     p.className = "muted";
//     p.innerHTML = info;
//     e.parent().append(p);
// }
// function header_showok(e) {
//     header_removeError(e);
//     var p = document.createElement("span");
//     p.className = "red";
//     p.innerHTML = '<i class="ico-confirm"></i>';
//     e.parent().append(p);
// }
// function header_showerr(e, err) {
//     header_removeError(e);
//     var p = document.createElement("span");
//     p.className = header_errorclass;
//     p.innerHTML = '<i class="ico-error"></i>&nbsp;' + err;
//     e.parent().append(p);
// }
// function header_removeError(e) {
//     e.parent().children().each(function () {
//         if (this.className == header_errorclass) {
//             this.parentNode.removeChild(this);
//             return;
//         }
//     });
// }
// function header_clearError() {
//     $(".help-inline red").each(function () {
//         this.parentNode.removeChild(this);
//     });
// }
// function header_clearOk() {
//     $(".red").each(function () {
//         this.parentNode.removeChild(this);
//     });
// }
// function header_check_name(e) {
//     if (!iw.hasVal(e)) {
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000038.replace("{0}", "姓名"));
//         e.focus();
//         return false;
//     } else if (iw.bytelen(iw.val(e)) > 16) {// 总字节数大于16位
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000019);
//         e.select();
//         return false;
//     } else {
//         $(e).next().remove();
//         header_showok(e);
//     }
//     return true;
// }
// function header_check_studentId(e) {
//     if (!iw.hasVal(e)) {
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000038.replace("{0}", "学号/工号"));
//         e.focus();
//         return false;
//     } else if (iw.bytelen(iw.val(e)) > 15) { // 总字节数大于15位
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000020);
//         e.select();
//         return false;
//     } else {
//         $(e).next().remove();
//         header_showok(e);
//     }
//     return true;
// }
// function header_check_school(e) {
//     if (!iw.hasVal(e)) {
//         header_showinfo(e, '请填写学校名称');
//         return true;
//     }

//     // 总字节数大于16位
//     if (iw.bytelen(iw.val(e)) > 60) {
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000021);
//         e.select();
//         return false;
//     } else {
//         $(e).next().remove();
//         header_showok(e);
//     }
//     return true;
// }
// function header_check_departments(e) {
//     if (!iw.hasVal(e)) {
//         header_showinfo(e, '请填写院系名称');
//         return true;
//     }

//     // 总字节数大于16位
//     if (iw.bytelen(iw.val(e)) > 60) {
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000022);
//         e.select();
//         return false;
//     } else {
//         $(e).next().remove();
//         header_showok(e);
//     }
//     return true;
// }
// function header_check_oldpassword(e) {
//     if (!iw.hasVal(e)) {
//         return true;
//     }

//     if ($('#header_password').val().toUpperCase() != hex_md5(e.val()).toUpperCase()) {
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000037);
//         e.select();
//         return false;
//     } else {
//         $(e).next().remove();
//         header_showok(e);
//     }
//     return true;
// }
// function header_check_newpassword(e) {
//     if (!iw.hasVal(e)) {
//         header_showinfo(e, '密码需要由8-16位字母、数字及特殊符号组成');
//         return true;
//     }

//     if (!iw.checkPassword(e.val())) {
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000009);
//         e.select();
//         return false;
//     } else {
//         $(e).next().remove();
//         header_showok(e);
//     }
//     return true;
// }
// function header_check_confirmpassword(e) {
//     if (!iw.hasVal(e)) {
//         header_showinfo(e, '请再次输入密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
//         return true;
//     }

//     if (e.val() != $("#header_newPassword").val()) {
//         $(e).next().remove();
//         header_showerr(e, iw.message.E000011);
//         e.select();
//         return false;
//     } else {
//         $(e).next().remove();
//         header_showok(e);
//     }
//     return true;
// }
// function header_check_passwordgroup() {
//     var oldpwd = iw.val('header_oldPassword');
//     var newpwd = iw.val('header_newPassword');
//     var cfmpwd = iw.val('header_confirmPassword');

//     var chkVal = true;
//     var e;
//     if (oldpwd == "" && (newpwd != "" || cfmpwd != "")) {
//         e = $("#header_oldPassword");
//         e.next().remove();
//         showerr(e, iw.message.E000008);
//         e.focus();
//         chkVal = false;
//     }

//     if (newpwd == "" && (oldpwd != "" || cfmpwd != "")) {
//         e = $("#header_newPassword");
//         e.next().remove();
//         showerr(e, iw.message.E000008);
//         e.focus();
//         chkVal = false;
//     }

//     if (cfmpwd == "" && (oldpwd != "" || newpwd != "")) {
//         e = $("#header_confirmPassword");
//         e.next().remove();
//         showerr(e, iw.message.E000010);
//         e.focus();
//         chkVal = false;
//     }

//     return chkVal;
// }

// /**
//  * 更新用户信息处理
//  */
// function doHeaderUpdateUserSubmit(){
//     header_clearError();

//     var chkVal = true;
//     if (!header_check_name($("#header_name"))) {
//         chkVal = false;
//     }

//     if (!header_check_studentId($("#header_studentId"))) {
//         chkVal = false;
//     }

//     if (!header_check_school($("#header_school"))) {
//         chkVal = false;
//     }

//     if (!header_check_departments($("#header_departments"))) {
//         chkVal = false;
//     }

//     if (!header_check_oldpassword($("#header_oldPassword"))) {
//         chkVal = false;
//     }

//     if (!header_check_newpassword($("#header_newPassword"))) {
//         chkVal = false;
//     }

//     if (!header_check_confirmpassword($("#header_confirmPassword"))) {
//         chkVal = false;
//     }

//     if (!header_check_passwordgroup()) {
//         chkVal = false;
//     }

//     if (!chkVal) {
//         return false;
//     }

//     // 上传数据
//     var postdata = {'userBean.id':iw.val('header_user_id'),
//         'userBean.name':iw.val('header_name'),
//         'userBean.job_id':iw.val('header_studentId'),
//         'userBean.school':iw.val('header_school'),
//         'userBean.department':iw.val('header_departments'),
//         'userBean.password':iw.val('header_password'),
//         'userBean.oldpassword':hex_md5(iw.val('header_oldPassword')),
//         'userBean.newpassword':hex_md5(iw.val('header_newPassword')),
//         'userBean.confirmpassword':hex_md5(iw.val('header_confirmPassword')),
//         'userBean.update_time':iw.val('header_update_time')};

//     $.ajaxSetup({
//         contentType: "application/x-www-form-urlencoded; charset=utf-8"
//     });
//     $.post("doUpdateUser.action", postdata, func_callback, "json");
//     function func_callback(data) {
//         var jsondata = JSON.parse(data);
//         if (jsondata.status == false) {
//             $("#header_sp_err").html(jsondata.err_msg);
//         } else if (jsondata.status == true) {
//             var user = jsondata.user;

//             $("#header_name_lab").text(user.name);
//             $("#header_name").val(user.name);
//             $("#header_studentId").val(user.job_id);
//             $("#header_school").val(user.school);
//             $("#header_departments").val(user.department);
//             $("#header_password").val(user.password);
//             $("#header_update_time").val(user.update_time);

//             $("#header_oldPassword").val('');
//             $("#header_newPassword").val('');
//             $("#header_confirmPassword").val('');

//             header_clearOk();
//             header_showinfo($("#header_newPassword"), '密码需要由8-16位字母、数字及特殊符号组成');
//             header_showinfo($("#header_confirmPassword"), '请再次输入密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');


//             //$("#header_my").modal('hide');
//             $("#header_my_cancel").click();
//         }
//     }
//     return false;
// }

// function logout() {
//     window.location.href="IW_Logout.action";
// }

// function getSchoolInfo(data) {
//     var jsondata = JSON.parse(data);
//     console.log(jsondata);
//     if(jsondata.schoolBadgeStatus == 1){
//     	 $("#school_logo").attr("src",jsondata.schoolBadge);
//     }
//     else{
//     	$("#school_logo").attr("src",basePath+"/"+jsondata.schoolBadge);
//     }
//     $("#school_name").text(jsondata.schoolName);
// }


// $(document).ready(function(){
//     var courseId=iw.getRequestParam("courseId");
//     if(courseId==null || ""==courseId.trim() || "0"==courseId.trim()) {
//         // $("#school_logo").attr("src","<%= request.getContextPath() %>/img/logo.png");
//     } else {
// //            alert(courseId);
//         // var url="http://awrite.arkofenglish.com:8080/aw/v2.0/doSchoolBadge.action?courseId="+courseId;
//         // $.ajax({
//         //     url: url,
//         //     type:'GET',
//         //     success: getSchoolInfo,
//         //     dataType: 'json',
//         //     cache: true
//         // });
// //            alert(url);
// //            $.get(url, function(data){
// //
// //            });
//     }
//     /*
//      $.post("doGetUnreadCount.action", {}, func_callback, "json");
//      function func_callback(data) {
//      var jsondata = JSON.parse(data);
//      if (jsondata.status == false) {
//      alert(jsondata.err_msg);
//      return;
//      }

//      var count = jsondata.count;
//      if (count == 0) {
//      $("#newmsgcount").text("");
//      $("#newmsgcount").removeClass("badge badge-important");
//      } else {
//      $("#newmsgcount").text(count);
//      $("#newmsgcount").addClass("badge badge-important");
//      }
//      //class="navbar-unread"
//      }*/
//     var crHref = window.location.href;
//     if ((crHref.indexOf('showPersonalPractice.action')
//         + crHref.indexOf('courseId=0')) >= 0) {
//         $('#home_page').removeClass('active');
//         $('#teaching_research').removeClass('active');
//         $('#learning_analysis').removeClass('active');
//         $('#keyreportor_changepassword').removeClass('active');
//         $('#pernal_practice').addClass('active');
//     } else if (crHref.indexOf('dataCenter.action?type=1') >= 0) {
//         $('#home_page').removeClass('active');
//         $('#pernal_practice').removeClass('active');
//         $('#learning_analysis').removeClass('active');
//         $('#keyreportor_changepassword').removeClass('active');
//         $('#teaching_research').addClass('active');
//     } else if (crHref.indexOf('dataCenter.action?type=2') >= 0) {
//         $('#home_page').removeClass('active');
//         $('#pernal_practice').removeClass('active');
//         $('#teaching_research').removeClass('active');
//         $('#keyreportor_changepassword').removeClass('active');
//         $('#learning_analysis').addClass('active');
//     } else if (crHref.indexOf('changePassword_keyreportor.jsp') >=0 ) {
//     	$('#home_page').removeClass('active');
//         $('#pernal_practice').removeClass('active');
//         $('#teaching_research').removeClass('active');
//         $('#learning_analysis').removeClass('active');
//         $('#keyreportor_changepassword').addClass('active');
//     } else if((crHref.indexOf('corpusSearch_home.jsp') >=0 )||(crHref.indexOf('corpusSearch_result.jsp') >=0) ){
//     	$('#home_page').removeClass('active');
//     } else {
//         $('#home_page').addClass('active');
//         $('#pernal_practice').removeClass('active');
//         $('#teaching_research').removeClass('active');
//         $('#learning_analysis').removeClass('active');
//         $('#keyreportor_changepassword').removeClass('active');
//     }
// });