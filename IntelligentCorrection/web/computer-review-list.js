
var initPageUrl = "/v2.0/writing/initComputerReviewPage"
var saveModifyUrl = "/v2.0/writing/saveDraftForWritingArea"  // 提交机评
var submitTeacherUrl = "/v2.0/writing/saveDraftForWritingArea" // 提交师评
var contCr = 1
// 页面初始化数据
var pageInitData = {}

var currentData = {};

var errorType = "machine";
// 1:全文点评 2：逐句点评
var currentTab = "1";

// 换行
var regExpN = /\n/gi;

// 当前版本序号-评分详情用
var currentVersion = "0";
// 对比用
var versionLeft = "0";
var timeLeft = "";
var contentLeft = "";
var versionRight = "0";
var timeRight = "";
var contentRight = "";
var getCRTimes = 0;
//评分类型
setType = "";
var usTp = iw.userType()
// 评价类型
var listType = getUrlInfo().type
var initData = ""
var initSubject = ""
var wtTp = getUrlInfo().freeWriting //1：练习
var rversion;
var isNew = false
// 机评显示状态
var titleState = 0;
/*
//function tabselect(tab, initStatic) {
//	$(".nav.nav-tabs.writing-tabs li").removeClass("active")
//	if (tab == "1") {
//		$(".nav.nav-tabs.writing-tabs li :eq(0)").addClass("active")
//		$("#sent_by_sent_wapper").hide();
//		$("#section3").hide()
//		$("#table_anno_wapper").show();
//		currentTab = "1";
//		if (initStatic == "1") {
//			init_static(errorType);
//			now_item_null();
//			updateSysInfo();
//		}
//	} else if (tab == "2") {
//		$(".nav.nav-tabs.writing-tabs li :eq(1)").addClass("active")
//		$("#table_anno_wapper").hide();
//		$("#section3").hide()
//		$("#sent_by_sent_wapper").show();
//		currentTab = "2";
//		$(".qtip").remove()
//		// $("#go-off-tangent").hide();
//	} else {
//		$(".nav.nav-tabs.writing-tabs li :eq(2)").addClass("active")
//		$("#table_anno_wapper").hide();
//		$("#sent_by_sent_wapper").hide();
//		$("#section3").show()
//		currentTab = "3";
//		// $("#table_anno_wapper").hide();
//		// $("#sent_by_sent").hide();
//		// $("#go-off-tangent").hide();
//	}
//	setScreenHeight()
//}*/

function tabselect(tab, initStatic) {
	$(".nav.nav-tabs.writing-tabs li").removeClass("active")
	$(".nav.nav-tabs.writing-tabs li a").css({'backgroundColor' : 'white'})
	if (tab == "1") {
		$(".nav.nav-tabs.writing-tabs li :eq(0)").addClass("active")
		$(".nav.nav-tabs.writing-tabs li:eq(0) a").css({'backgroundColor' : 'greenyellow'})
		$("#sent_by_sent_wapper").hide();
		$("#section3").hide()
		$("#table_anno_wapper").show();
		currentTab = "1";

	} else if (tab == "2") {
		$(".nav.nav-tabs.writing-tabs li :eq(1)").addClass("active")
		$(".nav.nav-tabs.writing-tabs li:eq(1) a").css({'backgroundColor' : 'greenyellow'})
		$("#table_anno_wapper").hide();
		$("#section3").hide()
		$("#sent_by_sent_wapper").show();
		currentTab = "2";
		$(".qtip").remove()

	} else {
		$(".nav.nav-tabs.writing-tabs li :eq(2)").addClass("active")
		$(".nav.nav-tabs.writing-tabs li:eq(2) a").css({'backgroundColor' : 'greenyellow'})
		$("#table_anno_wapper").hide();
		$("#sent_by_sent_wapper").hide();
		$("#section3").show()
		currentTab = "3";

	}
	setScreenHeight()
}

// 进度条
function setProgress(t, d) {
	d = JSON.parse(d).o
	if (t == "cr") {
		var s1 = d.dim_score[3] * 20
		var s2 = d.dim_score[1] * 20
		var s3 = d.dim_score[2] * 20
		var s4 = d.dim_score[0] * 20
	} else {
		var s1 = d.dim_score_teacher[3] * 20
		var s2 = d.dim_score_teacher[1] * 20
		var s3 = d.dim_score_teacher[2] * 20
		var s4 = d.dim_score_teacher[0] * 20
	}
	$("#s1").css("width", s1 + "%")//词汇使用
	$("#s2").css("width", s2 + "%")//文章结构
	$("#s3").css("width", s3 + "%")//语言表达
	$("#s4").css("width", s4 + "%")//内容相关
	// }

}
// 画布
function drawInit(score) {
	if (score) {
		var canvas = `<canvas width="264" height="120" id="canvas1"></canvas>
	<canvas width="264" height="120" id="canvas2"></canvas>
	<canvas width="264" height="120" id="canvas3"></canvas>
	<img src="img/evaluation/wh.png" style="margin-left: 13px;margin-top: 3px;width: 235px;">
	<img src="img/evaluation/zz.png" alt="" id="zz" name="zz" width="6" height="18" style="display: none;">`
		$("#canvas-group").html(canvas)
		var can1 = document.getElementById("canvas1")
		ctx1 = can1.getContext('2d');

		var can2 = document.getElementById("canvas2")
		ctx2 = can2.getContext('2d');

		var can3 = document.getElementById("canvas3")
		ctx3 = can3.getContext('2d');

		ctx1.clearRect(0, 0, 300, 200);
		ctx2.clearRect(0, 0, 300, 200);
		ctx3.clearRect(0, 0, 300, 200);
		var deg = setScore(score)
		initText(ctx3, score)
		initBackground(ctx2, deg)
		initPrograss(ctx1)
		initImg(ctx3, deg)
	}

}
// 分数转换为角度
function setScore(score) {
	var deg = score * 1.8
	return deg;
}
// 1-100数字文本
function initText(ctx, score) {
	ctx.beginPath()
	ctx.font = '12px SFUDINMitAlt';
	ctx.fillStyle = '#99A9BF'
	for (var i = 0; i < 11; i++) {
		var txtX = 0
		var txtY = 0
		txtX = 132 - (Math.cos((Math.PI / 180) * i * 18) * 78)
		txtY = 112 - (Math.sin((Math.PI / 180) * i * 18) * 78)


		ctx.fillText(i * 10, txtX - 6, txtY, 18);
	}
	ctx.closePath()
	ctx.beginPath()
	ctx.font = '52px SFUDINMitAlt';
	ctx.fillStyle = '#20A0FF'
	ctx.fillText(score, 105, 112, 54);
	ctx.closePath()
}
// 背景圆环
function initBackground(ctx, deg) {
	// 灰色背景
	ctx.beginPath();
	ctx.lineWidth = 1
	ctx.strokeStyle = '#E0E6ED'
	ctx.arc(132, 112, 94, (Math.PI / 180) * 0, (Math.PI / 180) * 180, true);
	ctx.stroke()
	// 遮盖灰色背景
	ctx.translate(132, 112);
	ctx.rotate(Math.PI)
	ctx.fillStyle = '#ffffff'
	ctx.lineWidth = 2
	ctx.lineCap = 'butt'

	ctx.beginPath();
	this.drawSector(ctx, 0, 0, 94, (Math.PI / 180) * 0, (Math.PI / 180) * deg);
	ctx.lineWidth = 3
	ctx.strokeStyle = '#ffffff'
	ctx.stroke()
	ctx.closePath();

	ctx.beginPath();
	this.drawSector(ctx, 0, 0, 94, (Math.PI / 180) * 0, (Math.PI / 180) * deg);
	ctx.lineWidth = 2
	const grd = ctx.createLinearGradient(0, 0, 170, 0);
	grd.addColorStop(0, 'rgba(32,160,255,1)');
	grd.addColorStop(0.5, 'rgba(32,160,255,0.3)');
	grd.addColorStop(1, 'rgba(32,160,255,0.1)');
	ctx.strokeStyle = grd
	ctx.stroke()
	ctx.closePath();

	ctx.fill()
	ctx.restore()

}
// 渐变进度条
function initPrograss(ctx) {
	ctx.beginPath();
	ctx.translate(132, 112);
	ctx.rotate(Math.PI)
	drawSector(ctx, 0, 0, 94, (Math.PI / 180) * 0, (Math.PI / 180) * this.deg);
	const grd = ctx.createLinearGradient(0, 0, 170, 0);
	grd.addColorStop(0, 'rgba(32,160,255,1)');
	grd.addColorStop(0.5, 'rgba(32,160,255,0.3)');
	grd.addColorStop(1, 'rgba(32,160,255,0.1)');
	ctx.strokeStyle = grd
	ctx.fillStyle = '#ffffff'
	ctx.lineWidth = 2
	ctx.stroke()
	ctx.fill()
	ctx.restore()
}
// 指针图片
function initImg(ctx, deg) {
	let pointer
	pointer = new Image()
	pointer.src = 'img/evaluation/zz.png'
	pointer.onload = function () {

		ctx.save()
		// pointer = document.getElementsByName('zz')
		let imgX = 132 - (Math.cos((Math.PI / 180) * deg) * 94)
		let imgY = 112 - (Math.sin((Math.PI / 180) * deg) * 94)
		if (deg < 90) {
			imgX = imgX - 1
			imgY = imgY - 1
		} else if (90 <= deg && deg < 135) {
			// imgX = imgX - 1
			// imgY = imgY - 1
		} else if (135 <= deg && deg < 175) {
			// 135
			imgX = imgX
			imgY = imgY - 1
			// 175
		} else if (175 <= deg && deg < 180) {
			imgX = imgX + 1
			imgY = imgY - 1
		}
		// imgX = imgX - 1
		// imgY = imgY - 1
		ctx.translate(imgX, imgY);
		const angel = deg * Math.PI / 180 - Math.PI / 2
		ctx.rotate(angel)

		ctx.drawImage(pointer, 0 - 3, 0, 6, 18)
		ctx.restore()
	}

}
// 绘制扇形方法
function drawSector(ctx, x, y, radius, sDeg, eDeg) {
	// 初始保存
	// ctx.save();
	// 位移到目标点
	ctx.translate(x, y);
	ctx.beginPath();
	// 画出圆弧
	ctx.arc(0, 0, radius, sDeg, eDeg);
	// 再次保存以备旋转
	ctx.save();
	// 旋转至起始角度
	ctx.rotate(eDeg);
	// 移动到终点，准备连接终点与圆心
	ctx.moveTo(radius, 0);
	// 连接到圆心
	// ctx.lineTo(0, 0);
	// 还原
	ctx.restore();
	// 旋转至起点角度
	ctx.rotate(sDeg);
	// 从圆心连接到起点
	// ctx.lineTo(radius, 0);
	ctx.closePath();
	// 还原到最初保存的状态
	ctx.restore();
	return ctx;
	// }
}
// 重新定义页面高度
function setScreenHeight() {
	var main = $(window.parent.document).find("#if");
	setTimeout(function () {
		var h = $("#ccc").height();
		// main.height(h+50);
		if (h > 0) {
			main.animate({
				"height": h + 200
			})
		}
	}, 400);

	function MaxMe(o) {
		o.style.height = o.scrollTop + o.scrollHeight + "px";
	}
	function getComputerReview(reviewVersion) {
		var post_data = {
			'courseId': iw.val("courseid_hidden"),
			'subjectId': iw.val("subjectid_hidden"),
			'reviewVersion': reviewVersion
		};

		$.post("doGetComputerReview.action", post_data, func_callback, "json");
		getCRTimes++;
		function func_callback(data) {
			var jsondata = JSON.parse(data);
			if (jsondata.cr == "" || jsondata.cr == undefined || jsondata.cr.o.score == "--") {
				//getComputerReview(reviewVersion);
				iw.endLoading(true, "机评处理中，请稍后刷新页面查看！");
			} else {
				$("#review" + reviewVersion).val(JSON.stringify(jsondata.cr))
				$("#score_" + reviewVersion).text(jsondata.cr.o.score);
				var review = jsondata.cr;
				currentData = jsondata;
				iw.endLoading(true, "机评结果查询完成。");
				$("#reviewDiv").css("display", "block");
				$("#copyDiv").css("display", "block");
				initReviewDetails(review, "machine");
			}

		}
	}


	// 显示与隐藏评分详情
	function showOrHideReview(reviewVersion) {
		$("#compareDiv").css("display", "none");
		$("#compareLeftContent").html("");
		$("#compareRightContent").html("");
		versionLeft = "0";
		versionRight = "0";
		if (currentVersion != reviewVersion) {
			var review = $("#review" + reviewVersion).val();
			if (review == "") {
				iw.startLoading("机评结果查询中，请耐心等待...");
				getComputerReview(reviewVersion);
			} else {
				$("#reviewDiv").css("display", "block");
				$("#copyDiv").css("display", "block");
				var data = JSON.parse(review);
				initReviewDetails(data, "machine");
			}
			currentVersion = reviewVersion;
		} else {
			var display = $("#reviewDiv").css("display");
			if (display == "none") {
				$("#reviewDiv").css("display", "block");
				$("#copyDiv").css("display", "block");
			} else if (display == "block") {
				$("#reviewDiv").css("display", "none");
				$("#copyDiv").css("display", "none");
			}
		}
	}

	// function copyToWritingArea(a) {
	// a.href = 'IW_InitForWritingArea.action?courseId=' + '<s:property value="courseId"/>' + '&subjectId=' + '<s:property value="subjectId"/>'
	// 		+ '&userId=' + '<s:property value="userId"/>' + '&type=01&' + currentVersion;
}
//
function initPageView(urlInfo) {
	// var post_data = {'courseId':iw.getUrlParam("courseId"),'subjectId':iw.getUrlParam("subjectId")};
	var post_data = { 'courseId': urlInfo.courseId, 'subjectId': urlInfo.subjectId, 'userId': urlInfo.userId };
	// var post_data = {'courseId':0,'subjectId':2519,'userId':100033191};
	// 默认显示机评还是师评
	setType = urlInfo.type;
	var user = JSON.parse(localStorage.getItem('user'))
	var userId = getUrlInfo().userId;
	var type = setType
	if (listType == "cr") {
		$("#computer-review-type").html("机器评分")
		// $("#computer-review-history").html("机评历史")
	} else {
		$("#computer-review-type").html("老师评分")
		// $("#computer-review-history").html("老师评分历史")
		// $("#djdp").hide()
		$("#ywdp-table").hide()
	}
	// 默认显示的版本号
	var version = urlInfo.version
	// var version=type!=undefined ? type : undefined;
	initData = ""
	$.ajax(iw.server + initPageUrl, {
		type: 'post',
		data: JSON.stringify(post_data),
		headers: { Authorization: iw.auth() },
		success: func_callback,
		contentType: "application/json"
	});
	function setError(err) {
		$(".nodata-reset").css("opacity", 1)
		$(".nodata-reset").css("display", "block")
		$(".nodata-reset").html(err)
		var errImg = `<br>
			<img src="img/img-nothing.png" alt="" >
			<br>`
		$(".nodata-reset").append(errImg)

		var main = $(window.parent.document).find("#if");
		setTimeout(function () {
			var h = $(document).height();
			// main.height(h+50);
			main.animate({
				"height": h
			})
		}, 1000);
		$("#pop-reset").hide()
		// localStorage.setItem('errMessage', JSON.stringify(err))
		setTimeout(function () {
			location.href = window.history.go(-1);
		}, 3000);
	}
	function nextReview() {
		var typ = listType
		if (typ == "cr") {
			setTimeout(function () {
				if (contCr < 9) {
					initPageView(getUrlInfo());
					contCr++

				} else {
					$("#loadFont").html("机评中，等待时间过长请刷新页面")
					// setError("没有机评数据")
				}
			}, 1000);
		}
		// if (typ == "tr") {
		// 	setTimeout(function () {
		// 		if (contCr < 3) {
		// 			initPageView(getUrlInfo());
		// 			contCr++

		// 		} else {
		// 		}
		// 	}, 1000);
		// }

	}
	function func_callback(data) {
		if (titleState == 2) {
			$(".nav.nav-tabs.writing-tabs").hide()
			$("#trHistory").hide()
			$("#teacher-name").html("作文点评 ：")
		}
		initData = data;
		pageInitData = data;

		// JSON.parse(
		var subject = pageInitData.subject;
		if (subject == undefined || subject == null) {
			console.log("作业信息读取失败")
			// setError("作业信息读取失败")
			// $(".nodata-reset").css("opacity",1)
			// $("#nodata-reset").html("作业信息读取失败")
		} else {
			// 初始化作业信息
			console.log("初始化作业信息")
			initSubjectInfo(subject);
			setScreenHeight()
			$(".nodata-reset").css("opacity", 0)
			var crList = pageInitData.crList;
			if (crList == undefined || crList == null || crList.length == 0) {
				console.log("没有机评数据")
				var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
								<div class="jp2-reset">
									<p>暂无数据</p>
							</div>`
				$("#crList1").html("")
				$("#crList1").append(info)
				$("#crListMore").hide()
				$("#crListLess").hide()
				$("#crHistory").hide()
				nextReview()
			} else {
				// 初始化机评列表
				console.log("初始化机评信息")
				initCrList(crList);
				setScreenHeight()
				// $(".nodata-reset").css("opacity",0)
				$(".nodata-reset").css("display", "none")
				//
			}

			var trList = pageInitData.trList;
			if (trList == undefined || trList == null || trList.length == 0) {
				console.log("没有师评数据")
				var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
								<div class="jp2-reset">
									<p>暂无数据</p>
							</div>`
				$("#trList1").append(info)
				$("#trListMore").hide()
				$("#trListLess").hide()
				$("#trHistory").hide()
				// $(".nodata-reset").css("opacity",1)
				// $("#nodata-reset").html("没有师评数据")
				// setError("没有师评数据")
			} else {
				// 初始化师评列表
				console.log("初始师评评信息")
				initTrList(trList);
				setScreenHeight()
				$(".nodata-reset").css("display", "none")
				//
			}

			var reviewDetail;
			var reviewList;
			// 显示默认的机评
			if (type == "cr") {
				errorType = "machine";
				reviewList = crList;
				$("#teacher-name").html("机器总评 ：")
				if (pageInitData.crList[0].review != null || pageInitData.crList[0].review != undefined) {
					drawInit(parseInt(pageInitData.crList[0].score), 10)
					setProgress("cr", pageInitData.crList[0].review)
				}

			} else {
				errorType = "teacher";
				reviewList = trList;
				$("#teacher-name").html("老师总评 ：")
				if (pageInitData.trList[0].review != null || pageInitData.crList[0].review != undefined) {
					drawInit(parseInt(pageInitData.trList[0].score), 10)
					setProgress("tr", pageInitData.trList[0].review)
				}

			}
			// 音频数据
			if (pageInitData.trList.length !== 0) {
				if (pageInitData.trList[0].soundRecordUrl) {
					$("#voice2").attr("src", pageInitData.trList[0].soundRecordUrl)
				} else {
					$("#voiceplay").hide()
				}
			} else {
				$("#voiceplay").hide()
			}

			if (reviewList == undefined || reviewList == null) {
				console.log("没有评阅数据")
				// $(".nodata-reset").css("opacity",1)
				// $("#nodata-reset").html("没有评阅数据")
				// setError("没有评阅数据")
			} else {
				// 初始化机评
				if (version == undefined || version == null || version == "") {
					// 默认显示第一条
					reviewDetail = reviewList[0];

					version = type == "cr" ? reviewDetail.reviewVersion : reviewList[0].submitVersion
				} else {
					// 显示指定版本的数据
					for (var i = 0; i < reviewList.length; i++) {
						if (reviewList[i].reviewVersion == version || version == reviewList[i].submitVersion) {
							reviewDetail = reviewList[i];
							break;
						}
					}
				}
				if (reviewDetail == undefined | reviewDetail == null) {
					console.log("没有评阅数据2")
					// 	$(".nodata-reset").css("opacity",1)
					// $("#nodata-reset").html("没有评阅数据")
					// setError("没有评阅数据")
					nextReview()
				} else {
					if (reviewDetail.review == "" || reviewDetail.review == undefined || reviewDetail.score == "--") {
						console.log("没有评阅数据3")
						// $(".nodata-reset").css("opacity",1)
						// $(".nodata-reset").html("没有评阅数据")
						// setError("没有评阅数据")
						nextReview()
					} else {
						$("#review" + version).val(reviewDetail.review)
						$("#score_" + version).text(reviewDetail.score);
						var review = JSON.parse(reviewDetail.review);
						$("#reviewDiv").css("display", "block");
						$("#copyDiv").css("display", "block");
						currentData = reviewDetail;
						initReviewDetails(review, errorType);
					}
				}
			}
		}
	}
}

function initSubjectInfo(subject) {
	initSubject = subject
	$("#composition-title").html("标题：" + subject.title)
	$("#composition-requirement").html("作文要求：" + subject.requirement)
	// $("#teacher-name").html(subject.userName+"的点评 ：")
	var n = subject.userName.split("老师")[0]
	$("#teacher-icon").html(n.substring(n.length - 2, n.length))
}

var editable = false;
function editableControl() {
	var user = JSON.parse(localStorage.getItem('user'))
	var userId = getUrlInfo().userId;

	$("#save_and_return_").show()
	$("#print_zw").show()
	// 学生本人
	if (usTp !== "teacher" && userId == user.id) {
		console.log(typeof wtTp,wtTp);
		if (wtTp != 1) {
			$("#submit_teacher").show()
			//机评次数设置TODO
			$("#save_and_return").show()
		} else {
			// 学生练习
			$("#save_and_return").show()
		}
		if (titleState == 1) {
			$("#submit_zw").show()
		}
		return true;
	} else if (usTp == "teacher" && wtTp == 1) {
		//老师练习
		$("#save_and_return").show()
	} else {
		//非老师、学生本人
		return false;
	}

}

function viewVersionData(e, type, version, errorType, reversion) {
	rversion = reversion
	contCr = 1
	listType = type
	$(".qtip").remove();
	// 机评和师评的不同页面显示
	if (listType == "cr") {
		$("#computer-review-type").html("机器评分")
		$("#djdp").show()
		$("#ywdp-table").show()
		$("#teacher-name").html("机器总评 ：")
		if (pageInitData.crList[version].review != null || pageInitData.crList[0].review != undefined) {
			drawInit(parseInt(pageInitData.crList[version].score, 10))
			setProgress("cr", pageInitData.crList[version].review)
			var tt=JSON.parse(pageInitData.crList[version].review).o.report
			sectionTheer(tjJson, tt)
		}

	} else {
		// tabselect('1')
		$("#computer-review-type").html("老师评分")
		$("#teacher-name").html("老师总评 ：")
		// $("#computer-review-history").html("老师评分历史")
		$("#ywdp-table").hide()
		if (pageInitData.trList[version].review != null || pageInitData.trList[version].review != undefined) {
			drawInit(parseInt(pageInitData.trList[version].score, 10))
			setProgress("tr", pageInitData.trList[version].review)
		}

	}
	var params = JSON.parse(localStorage.getItem('queryParamsCr'))
	params.type = type
	// var params={}
	localStorage.setItem('queryParamsCr', JSON.stringify(params))
	// $(".jp1-reset").css("background","#D3DCE6")
	// $(this).next().css("background","#ff8800")
	if (errorType == "machine") {
		initReviewDetails(JSON.parse(pageInitData.crList[version].review), errorType);
	} else {
		initReviewDetails(JSON.parse(pageInitData.trList[version].review), errorType);
	}
	setScreenHeight()

}

function initCrList(crList) {
	$("#crHistory").show()
	$("#crList").html("")
	// $("#teacher-name").html("机器的点评 ：")
	$("#crHistory").hide()
	if (crList.length > 0 && crList[0].review) {
		var tt=JSON.parse(crList[0].review).o.report
		// var tt=JSON.parse(crList[0].review).o.report
		// console.log(JSON.parse(crList[0].review).o)
		if(tt!=null && tt!=undefined){
			$("#tjb").show()
			sectionTheer(tjJson, tt)
		}

		if (crList.length < 1) {
			var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
			<div class="jp2-reset">
				<p>暂无数据</p>
			</div>`
			$("#crList").append(info)
			$("#crHistory").hide()
		} else {
			$("#crHistory").show()
			$("#crList1").html("")
			$("#crList2").html("")
			$("#crList2").hide()
			if (crList.length > 3) {
				// 多于3条
				for (var i = 0; i < crList.length; i++) {
					var versionStyle = ``
					var vs = getUrlInfo().review_version;
					var tp = getUrlInfo().type;
					if (isNew && i == 0) {
						versionStyle = `background:#ff8800`
					} else {
						if (!vs || vs == undefined || vs == null) {
							if (i == 0 && tp == "cr") {
								versionStyle = `background:#ff8800`
							}
						}
						// if(crList[i].reviewVersion==undefined||vs==null){
						// 	crList[i].reviewVersion=rversion
						// }
						if (vs == crList[i].reviewVersion) {
							versionStyle = `style=background:#ff8800`
						}
					}

					var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
									<a class="jp4-reset" onclick="compareData(this,'cr',${i},'machine',${crList[i].reviewVersion},${crList.length - i})" value="${crList[i].courseId},${crList[i].subjectId},${crList[i].reviewVersion}">对比</a>
									<a class="jp3-reset" onclick="viewVersionData(this,'cr',${i},'machine',${crList[i].reviewVersion})" value="${crList[i].courseId},${crList[i].subjectId},${crList[i].reviewVersion}"> 查看</a>
								<div class="jp1-reset" style="${versionStyle}">${crList.length - i}</div>
								<div class="jp2-reset">
									<span>成绩 ${crList[i].score}分 </span>
									<p>${crList[i].creatTime}</p>
									</div>
								</div>`
					if (i < 3) {
						$("#crList1").append(info)
					} else {
						$("#crList2").append(info)
					}
					// $("#crList2").append(info)
					$("#crListMore").show()
				}
			} else {
				// 少于3条
				for (var i = 0; i < crList.length; i++) {
					var versionStyle = ``
					var vs = getUrlInfo().version;
					var tp = listType;
					if (vs == undefined || vs == null) {
						if (i == 0 && tp == "cr") {
							versionStyle = `background:#ff8800`
						}
					}
					if (vs == crList[i].reviewVersion && tp == "cr") {
						versionStyle = `background:#ff8800`
					}

					if (crList[i].reviewVersion == undefined || crList[i].reviewVersion == null) {
						crList[i].reviewVersion = 1
					}
					var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
									<a class="jp4-reset" onclick="compareData(this,'cr',${i},'machine',${crList[i].reviewVersion},${crList.length - i})" value="${crList[i].courseId},${crList[i].subjectId},${crList[i].reviewVersion}">对比</a>
									<a class="jp3-reset" onclick="viewVersionData(this,'cr',${i},'machine',${crList[i].reviewVersion})" value="${crList[i].courseId},${crList[i].subjectId},${crList[i].reviewVersion}"> 查看</a>
								<div class="jp1-reset" style="${versionStyle}">${crList.length - i}</div>
								<div class="jp2-reset">
									<span>成绩 ${crList[i].score}分 </span>
									<p>${crList[i].creatTime}</p>
									</div>
								</div>`
					$("#crList1").append(info)
					$("#crListMore").hide()
				}
			}
			// {
			// 	// 少于3条
			// 	for (var i = 0; i < crList.length; i++) {
			// 		var versionStyle = ``
			// 		var vs = getUrlInfo().version;
			// 		var tp = getUrlInfo().type;
			// 		if(isNew && i==0){
			// 			versionStyle = `background:#ff8800`
			// 		}else{
			// 			if (!vs||vs == undefined || vs == null) {
			// 			if (i == 0 && tp=="cr") {
			// 				versionStyle = `background:#ff8800`
			// 			}
			// 		}
			// 		if (vs == crList[i].reviewVersion) {
			// 			versionStyle = `background:#ff8800`
			// 		}
			// 		}

			// 		var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
			// 			<a class="jp3-reset" onclick="viewVersionData('cr',${i},'machine',${crList[i].reviewVersion})" value="${crList[i].courseId},${crList[i].subjectId},${crList[i].reviewVersion}"> 查看</a>
			// 					<div class="jp1-reset" style="${versionStyle}">${crList.length-i}</div>
			// 					<div class="jp2-reset">
			// 						<span>成绩 ${crList[i].score}分 </span>
			// 						<p>${crList[i].creatTime}</p>
			// 						</div>
			// 					</div>`
			// 		$("#crList1").append(info)
			// 		$("#crListMore").hide()
			// 	}
			// }


			// 查看
			//	$(".jp3-reset").click(function(i){
			//initReviewDetails(crList[i].review)
			// let v=$(this).attr("value").split(",")
			// 	let url= parent.window.location.href
			// 	let vl=url.split("?")[1].split("&");
			// 	let reUrl=url.split("?")[0]+"?"+"courseId="+v[0]+"&subjectId="+v[1]+"&"+vl[2]+"&"+vl[3]+"&version="+v[2]
			// 	let queryParamsCrJson={
			// 		courseId:v[0],
			// 		subjectId:v[1],
			// 		userId:vl[2].split("=")[1],
			// 		version:v[2],
			// 		type:"cr"
			// 	}
			// if(crList.length>0){
			// 	localStorage.setItem('queryParamsCr', JSON.stringify(queryParamsCrJson))
			// 	$(window.parent.document).find("#if").attr("src","/assets/review/computer-review-list.html")
			// }
			// })
		}
	}

	$('.jp3-reset').click(function () {
		$(".jp1-reset").css("background", "#D3DCE6")
		$(this).next().css("background", "#ff8800")
	})

}

function initTrList(trList) {
	// $("#teacher-name").html("老师的点评 ：")
	var review = JSON.parse(trList[0].review);
	$("#dp-reset").html("")
	$("#dp-reset").html(review.o.global_remark_teacher)
	$("#trList").html("")
	if (trList.length > 0) {
		if (trList.length < 1) {
			var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
			<div class="jp2-reset">
				<p>暂无数据</p>
			</div>`
			$("#trList1").append(info)
			$("#trListMore").hide()
			$("#trListLess").hide()
			$("#trHistory").hide()
		} else {
			$("#trList1").html("")
			$("#trList2").html("")
			$("#trList2").hide()
			if (trList.length > 3) {
				// 多于3条
				for (var i = 0; i < trList.length; i++) {
					var versionStyle = ``
					var vs = getUrlInfo().version;
					var tp = getUrlInfo().type;
					if (vs == undefined || vs == null) {
						if (i == 0 && listType == "tr") {
							versionStyle = `background:#ff8800`
						}
					}
					// if (vs == trList[i].reviewVersion && listType == "tr") {
					// 	versionStyle = `style=background:#ff8800`
					// }
					if (trList[i].reviewVersion == undefined || trList[i].reviewVersion == null) {
						trList[i].reviewVersion = 1
					}
					var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
									<a class="jp4-reset" onclick="compareData(this,'tr',${i},'teacher',${trList[i].reviewVersion},${trList.length - i})" value="${trList[i].courseId},${trList[i].subjectId},${trList[i].reviewVersion}">对比</a>
									<a class="jp3-reset" onclick="viewVersionData(this,'tr',${i},'teacher',${trList[i].reviewVersion})" value="${trList[i].courseId},${trList[i].subjectId},${trList[i].reviewVersion}"> 查看</a>
								<div class="jp1-reset" style="${versionStyle}">${trList.length - i}</div>
								<div class="jp2-reset">
									<span>成绩 ${trList[i].score}分 </span>
									<p>${trList[i].updateTime}</p>
									</div>
								</div>`
					if (i < 3) {
						$("#trList1").append(info)
					} else {
						$("#trList2").append(info)
					}
					// $("#crList2").append(info)
					$("#trListMore").show()
				}
			} else {
				// 少于3条
				for (var i = 0; i < trList.length; i++) {
					var versionStyle = ``
					var vs = getUrlInfo().version;
					var tp = listType;
					if (vs == undefined || vs == null) {
						if (i == 0 && tp == "tr") {
							versionStyle = `background:#ff8800`
						}
					}
					// if (vs == trList[i].reviewVersion && tp == "tr") {
					// 	versionStyle = `background:#ff8800`
					// }

					if (trList[i].reviewVersion == undefined || trList[i].reviewVersion == null) {
						trList[i].reviewVersion = 1
					}
					var info = `<div style="border-bottom: 1px solid rgba(224,230,237,.6);">
									<a class="jp4-reset" onclick="compareData(this,'tr',${i},'teacher',${trList[i].reviewVersion},${trList.length - i})" value="${trList[i].courseId},${trList[i].subjectId},${trList[i].reviewVersion}">对比</a>
									<a class="jp3-reset" onclick="viewVersionData(this,'tr',${i},'teacher',${trList[i].reviewVersion})" value="${trList[i].courseId},${trList[i].subjectId},${trList[i].reviewVersion}"> 查看</a>
								<div class="jp1-reset" style="${versionStyle}">${trList.length - i}</div>
								<div class="jp2-reset">
									<span>成绩 ${trList[i].score}分 </span>
									<p>${trList[i].updateTime}</p>
									</div>
								</div>`
					$("#trList1").append(info)
					$("#trListMore").hide()
				}
			}
			// $("#crList1").append(info)
			// $("#crListMore").hide()
			// $("#trList").append(info)
			// }
		}
	}

	$('.jp3-reset').click(function () {
		$(".jp1-reset").css("background", "#D3DCE6")
		$(this).next().css("background", "#ff8800")
	})
	// 查看
	// $(".jp3-reset").click(function () {
	// 	let v = $(this).attr("value").split(",")
	// 	let url = parent.window.location.href
	// 	let vl = url.split("?")[1].split("&");
	// 	let reUrl = url.split("?")[0] + "?" + "courseId=" + v[0] + "&subjectId=" + v[1] + "&" + vl[2] + "&" + vl[3] + "&version=" + v[2]
	// 	let queryParamsCrJson = {
	// 		courseId: v[0],
	// 		subjectId: v[1],
	// 		userId: vl[2].split("=")[1],
	// 		version: v[2],
	// 		type: "cr"
	// 	}
	// 	if (trList.length > 0) {
	// 		localStorage.setItem('queryParamsCr', JSON.stringify(queryParamsCrJson))
	// 		$(window.parent.document).find("#if").attr("src", "/assets/review/computer-review-list.html")
	// 	}
	// })


}
// 获得传值类型
function getUrlInfo() {
	var vl = JSON.parse(localStorage.getItem('queryParamsCr'));
	if (iw.userType == "teacher") {
		$(".mark_check").parent().hide()
		$(".modify_by_sent").prev().hide()
	}
	return vl;
}

$(document).ready(function () {
	// 关闭遮罩
	$("#pop").hide()
	// 默认点评tab
	tabselect('2', '0')
	var a = getUrlInfo().source
	if (a == "st-active-cr") {
		titleState = 1
	} else if (a == "tc-active-cr") {
		titleState = 2
	}
	// document.getElementsByName('textarea').onselectstart = function(){ return false; }
	// console.log(parent.window.location.href)
	// iframe高度调整
	// 设置父页面高度
	$(window.parent.document).find("#if").load(function () {
		var main = $(window.parent.document).find("#if");
		var thisheight = $(document).height();
		var h = $(".indexbox").height();
		// setTimeout(() => {
		// 	var h = $("#ccc").height();
		// 	console.log(h)
		// 	// main.height(h+50);
		// 	main.animate({
		// 		"height":h+50
		// 	})
		// }, 2000);
		main.height(thisheight);
	});
	// setType=getType();
	// console.log(window.history.back)
	if (setType == "cr") {

	} else {

	}
	// getUrlInfo();
	initPageView(getUrlInfo());

	// 机评历史更多
	$("#crListMore").click(function () {
		$("#crListMore").hide()
		$("#crListLess").fadeIn()
		$("#crList2").slideDown()
		setScreenHeight()
		// let main = $(window.parent.document).find("#if");
		// setTimeout(() => {
		// 	var h = $("#ccc").height();
		// 	console.log(h)
		// 	// main.height(h+50);
		// 	main.animate({
		// 		"height":h+50
		// 	})
		// }, 500);
	})
	// 机评历史收起
	$("#crListLess").click(function () {
		$("#crListLess").hide()
		$("#crListMore").fadeIn()
		$("#crList2").slideUp()
		setTimeout(function () {
			setScreenHeight()
		}, 2000);
	})
	$('table tr').click(function () {
		$('table').find('td').removeClass('tr-bg');
		$(this).find('td').addClass('tr-bg');
	});
	// $("#showSubjectsOfJoin").attr('href','showSubjectsOfJoin.action?courseId=<s:property value="subjectData.courseId"/>&courseName=' +
	// 		encodeURI(encodeURI("<s:property value="subjectData.courseName"/>")));
	$('.uuwriting-morein').hover(function () {
		$(this).siblings('.uuwriting-more').toggle();
	});
	$('.uuwriting-more').hover(function () {
		$(this).toggle();
		$(this).parent('td').addClass('');
	});

	$(".input-append").tooltip();


	$('.writing-morein').hover(function () {
		$(this).siblings('.writing-more').toggle();
	});
	$('.writing-more').hover(function () {
		$(this).toggle();
	});

	$('.tip').tooltip('hide');

	$("#reviewDiv").css("display", "none");
	$("#copyDiv").css("display", "none");
	$("#compareDiv").css("display", "none");

	$("input,textarea").placeholder();

	$(".toggle").click(function () {
		$(this).nextAll(".none").toggle();
	});

	$(".bt-none").click(function () {
		$(this).parent().parent(".none").toggle();
	});

	var dlNum = $("#selectList").find("tr");
	for (var i = 0; i < dlNum.length; i++) {
		$(".hasbeenselected .clearList").append("<div class=\"selectedinfor selectedshow\" style=\"display:none\"><span></span><i class=\"ico-error\"></i></div>");
	};

	if (dlNum.length <= 2) {
		$('#selectList').find('button').attr('disabled', 'disabled');
	}

	$(".listindex button").on("click", function () {
		if (dlNum.length <= 2) {
			return;
		}

		var text = $(this).parents('tr').find('td:nth-child(1)').find('a').text();
		var time = $(this).parents('tr').find('td:nth-child(2)').text();
		var content = $(this).parents('tr').find('td:nth-child(4)').text();
		var selectedShow = $(".selectedshow");
		var textTypeIndex = $(this).parents("tr").index();

		index = dlNum.length - textTypeIndex;
		$(".selectedshow").eq(index).show().addClass("show");
		selectedShow.eq(index).find("span").text(text);
		if (versionLeft == "0") {
			versionLeft = text;
			timeLeft = time;
			contentLeft = content;
		} else {
			versionRight = text;
			timeRight = time;
			contentRight = content;
		}

		$(this).addClass("disabled");

		var t = $(".show").length;
		if (t >= 2) {
			$("#reviewDiv").css("display", "none");
			$("#copyDiv").css("display", "none");
			currentVersion = "0";
			if (parseInt(versionLeft) > parseInt(versionRight)) {
				var tempVersion = versionLeft;
				versionLeft = versionRight;
				versionRight = tempVersion;
				var tempTime = timeLeft;
				timeLeft = timeRight;
				timeRight = tempTime;
				var tempContent = contentLeft;
				contentLeft = contentRight;
				contentRight = tempContent;
			}
			diff();
			$('#compareLeftSpan').text(versionLeft);
			$('#compareLeftSpan').attr('title', timeLeft);
			//$('#compareLeftContent').html(contentLeft.replace(regExpN,"<br/>"));
			$('#compareRightSpan').text(versionRight);
			$('#compareRightSpan').attr('title', timeRight);
			// $('#compareRightContent').text(contentRight);
			$('#selectList').find('button').attr('disabled', 'disabled');
			$('#compareDiv').css("display", "block");
		} else {
			$('#selectList').find('button').attr('disabled', false);
			$('#compareDiv').css("display", "none");
		};
	});

	$(".selectedshow").on("click", function () {
		var version = $(this).find("span").text();
		$(this).hide().removeClass("show");
		if (versionLeft == version) {
			versionLeft = "0";
		}
		if (versionRight == version) {
			versionRight = "0";
		}
		$(this).find("span").empty();
		var textTypeIndex = $(this).index();
		index = dlNum.length - textTypeIndex;
		$(".listindex").eq(index - 1).find("button").removeClass("disabled");
		$('#selectList').find('button:not(:checked)').attr('disabled', false);
		$('#compareDiv').css("display", "none");

	});
	// 复制
	$("#copy_and_return").click(function () {
		var a = $('.sent_text')
		var b = ""
		for (var i = 0; i < a.length; i++) {
			b = b + $(a[i]).text();
		}
		$('#input-value').val(b)
		$('#input-value').trigger('select');
		document.execCommand('copy');
		localStorage.setItem('evaluation', "复制成功")
	})
	// 提交机评
	$('#save_and_return').click(function () {
		contCr = 0
		$("#crListLess").hide()
		$("#trListLess").hide()
		$(".jp1-reset").css("background", "#D3DCE6")
		$("#pop-reset").show()
		$(window.parent.document).find("html,body").animate({ scrollTop: 0 }, 1000);//回到顶端
		setScreenHeight()
		listType = "cr"
		var a = $('.sent_text')
		var b = ""
		for (var i = 0; i < a.length; i++) {
			b = b + $(a[i]).text();
		}
		var urlInfo = getUrlInfo();
		var post_data = {
			'courseId': urlInfo.courseId,
			'subjectId': urlInfo.subjectId,
			'userId': urlInfo.userId,
			"title": currentData.title == "" ? initSubject.title : currentData.title,
			"content": b
			// "submitStatus": 0,
			//"maxComputerReviewVersion": 0,
			// "computerReviewTimes":20,
			// "updateTime": moment().format('YYYY-MM-DD HH:mm:ss'),
		};
		$.ajax(iw.server + "/v2.0/writing/submitComputerForWritingArea", {
			type: 'post',
			data: JSON.stringify(post_data),
			headers: { Authorization: iw.auth() },
			success: result,
			contentType: "application/json"
		});
		function result(data) {
			if (data.state == 0) {
				localStorage.setItem('evaluation', "机评成功")
				post_data.version = data.maxComputerReviewVersion
				post_data.type = "cr"
				post_data.usertype = "student"
				initPageView(post_data)
				isNew = true
				tabselect('2', '0')
				$("#computer-review-type").text("机器评分")
				$("#teacher-name").text("机器总评")
			} else if (data.state == 400) {
				localStorage.setItem('evaluation-score', data.detailMessage)
			}
		}

	})

	// 提交作文
	$('#submit_zw').click(function () {
		var a = $('.sent_text')
		var b = ""
		for (var i = 0; i < a.length; i++) {
			b = b + $(a[i]).text();
		}
		var urlInfo = getUrlInfo();
		var post_data = {
			courseId: urlInfo.courseId,
			subjectId: urlInfo.subjectId,
			userId: urlInfo.userId,
			title: currentData.title == "" ? initSubject.title : currentData.title,
			content: b
		}
		// if (!initData.trList || parseInt(initData.trList.length, 10) < parseInt(initData.subject.modifyTimes, 10)) {
		$.ajax(iw.server + "/v2.0/writing/submitTeacherForWritingArea", {
			type: 'post',
			data: JSON.stringify(post_data),
			headers: { Authorization: iw.auth() },
			success: result,
			contentType: "application/json"
		});
		// } else {
		// 	// 达到评阅上限
		// 	localStorage.setItem('evaluation-score', "已达到评阅上限")
		// }

		function result(data) {
			if (data.state == 400) {
				localStorage.setItem('evaluation-score', data.detailMessage)
			} else if (data.state == 0) {
				var d = {
					source: getUrlInfo().source,
					message: "提交师评成功",
					submitStatus: '1',
				}
				// localStorage.setItem('active-detail', JSON.stringify(d))
				// 师评成功跳转
				localStorage.setItem('evaluation-back', JSON.stringify(d))
			}
		}
	})
	// 提交师评
	$('#submit_teacher').click(function () {
		var a = $('.sent_text')
		var b = ""
		for (var i = 0; i < a.length; i++) {
			b = b + $(a[i]).text();
		}
		var urlInfo = getUrlInfo();
		var post_data = {
			courseId: urlInfo.courseId,
			subjectId: urlInfo.subjectId,
			userId: urlInfo.userId,
			title: currentData.title == "" ? initSubject.title : currentData.title,
			content: b
		}
		// if (!initData.trList || parseInt(initData.trList.length, 10) < parseInt(initData.subject.modifyTimes, 10)) {
			$.ajax(iw.server + "/v2.0/writing/submitTeacherForWritingArea", {
				type: 'post',
				data: JSON.stringify(post_data),
				headers: { Authorization: iw.auth() },
				success: result,
				contentType: "application/json"
			});
		// } else {
			// 达到评阅上限
		// 	localStorage.setItem('evaluation-score', "已达到评阅上限")
		// }

		function result(data) {
			if (data.state == 400) {
				localStorage.setItem('evaluation-score', data.detailMessage)
			} else if (data.state == 0) {
				// 师评成功跳转

				var examination = getUrlInfo().examination
				if (examination) {
					localStorage.setItem('examination', "提交师评成功")
				} else {
					localStorage.setItem('evaluation-tr', "提交师评成功")
				}
				// }else{
				// localStorage.setItem('evaluation-tr', "提交成功")
				// }
			}
		}
	})
	// 打印点评
	$('#print_zw').click(function () {
		// 点评状态为展开
		$(".fold_button").attr("value", "t")
		// 展开所有隐藏点评
		$(".sentences").show()
		// 图片收起全部为展开
		$(".sentences").children().attr("src", "img/add.png")
		setScreenHeight()
		var a = $("#sent_by_sent").html()
		$(".print").html(a)
		window.print()
	})
	$('#print_zw2').click(function () {
		$(".fold_button").attr("value", "t")
		$(".sentences").show()
		$(".sentences").children().attr("src", "img/add.png")
		// $(this).parent().next().show()
		setScreenHeight()
		var a = $("#sent_by_sent").html()
		$(".print").html(a)
		window.print()
	})
	// function GetQueryString(name)
	// {
	// 	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	// 	 var r = window.location.search.substr(1).match(reg);
	// 	 if(r!=null)return  unescape(r[2]); return null;
	// }
	var curReviewVersion = $("#reviewVersion").val();
	if (curReviewVersion == "" || curReviewVersion == null || curReviewVersion == "0") {
		$(".listindex").eq(0).find('td:nth-child(1)').find('a').click();
	} else {
		//var maxVersion = $(".listindex").eq(0).find('td:nth-child(1)').find('a').text();
		//showOrHideReview(maxVersion);
		var findok = false;
		var historylist = $(".listindex");
		if (historylist != null && historylist.size() > 0) {
			for (var i = 0; i < historylist.size(); i++) {
				var version = historylist[i].children[0].firstChild.text;
				if (version == curReviewVersion) {
					historylist[i].children[0].firstChild.click();
					findok = true;
					break;
				}
			}
		}
		if (!findok) {
			$(".listindex").eq(0).find('td:nth-child(1)').find('a').click();
		}
	}

	// 倒计时
	if (iw.val('courseid_hidden') != '0') {
		startSecs($("#computerview_endsecond").val(), 'computerview_leave_time');
	}
});
window.setTimeout("wordStatic()", 1000);
function wordStatic() {
	var a = $('.sent_text')
	var b = ""
	for (var i = 0; i < a.length; i++) {
		b = b + $(a[i]).text();
	}
	var byteCount = 0;
	var value = b
	// 替换标点符号为空格
	value = value.replace(/[\?\.,:;!]/g, " ");
	// 替换中文字符为空格
	if (!iw.isChinese(value)) {
		value = value.replace(/[\u4e00-\u9fa5]+/g, " ");
	}
	// 将换行符，前后空格不计算为单词数
	value = value.replace(/(\n)|(\r)|(^\s+)|\s+$/gi, " ");
	// 多个空格替换成一个空格
	value = value.replace(/\s+/gi, " ").trim();
	// 更新计数
	var length = 0;
	if (!iw.isChinese(value)) {
		var match = value.match(/\s/g);
		if (match) {
			length = match.length + 1;
		} else if (value) {
			length = 1;
		}
	} else {
		for (var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 255) {
				length++;
			}
		}
	}
	$("#writingarea_curtextcount").html(length);
	window.setTimeout("wordStatic()", 1000);
}
function saveModified() {

	var array_p = anno.content.p;//原文所有段落数组

	var charCount = 0; //字符计数
	var sid = 0;//全局句子编号
	var pid = 0;//段落编号(原文译文段落数相等)，从0开始
	var p_max = array_p.length;
	var tr = "";
	for (var i = 0; i < p_max; i++) {
		pid = i;
		var array_s = (array_p[i] ? array_p[i].s : []);//原文句数组
		var co = '';
		//span to be substituted
		var array_s_l = array_s.length;
		for (var j = 0; j < array_s_l; j++) {//original passage sentences
			sid++;
			var tmp = array_s[j];
			co += tmp;
		}
		tr += "  " + co + "\r\n";
	}

	var content = tr;
	var urlInfo = getUrlInfo();
	var post_data = {
		'courseId': urlInfo.courseId, 'subjectId': urlInfo.subjectId, 'userId': urlInfo.userId,
		"title": currentData.title == "" ? initSubject.title : currentData.title, "content": content
	};

	$.ajax(iw.server + saveModifyUrl, {
		type: 'post',
		data: JSON.stringify(post_data),
		headers: { Authorization: iw.auth() },
		success: func_callback,
		contentType: "application/json"
	});

	function func_callback(data) { }
	return true;
}

function copyandsave() {
	if ($('#save_and_return').attr("disabled")) {
		return false;
	}
	$('#save_and_return').attr("disabled", true);
	var array_p = anno.content.p;//原文所有段落数组

	var charCount = 0; //字符计数
	var sid = 0;//全局句子编号
	var pid = 0;//段落编号(原文译文段落数相等)，从0开始
	var p_max = array_p.length;
	var tr = "";
	for (var i = 0; i < p_max; i++) {
		pid = i;
		var array_s = (array_p[i] ? array_p[i].s : []);//原文句数组
		var co = '';
		//span to be substituted
		var array_s_l = array_s.length;
		for (var j = 0; j < array_s_l; j++) {//original passage sentences
			sid++;
			var tmp = array_s[j];
			/*var tl = tmp.length
			 for (var k=0; k<tl; k++) {//characters per sentence
			 charCount++;
			 var ch=tmp[k]; //(k, 1);
			 co += '<span class="unit" id="uo_' + charCount + '" sid="' + sid + '">' + ch + '</span>';
			 }*/
			co += tmp;
		}
		//tr += "  " + co + "\r\n";
		tr += co;
	}

	var content = tr;
	var urlInfo = getUrlInfo();
	var post_data = {
		'courseId': urlInfo.courseId,
		'subjectId': urlInfo.subjectId,
		'userId': urlInfo.userId,
		"title": currentData.title, "content": content
	};

	$.ajax(iw.server + saveModifyUrl, {
		type: 'post',
		data: JSON.stringify(post_data),
		headers: { Authorization: iw.auth() },
		success: func_callback,
		contentType: "application/json"
	});

	function func_callback(data) {
		parent.window.location.href = "/#/shared/writing-introduction?subjectId=" + urlInfo.subjectId + "&classId=" + urlInfo.courseId + "&freeWriting=" + urlInfo.freeWriting
		$('#save_and_return').attr("disabled", false);
	}

	return true;
}

/*
function diff() {
 // var dmp = new diff_match_patch();
		var text1 = contentLeft;
		var text2 = contentRight;

	   // dmp.Diff_Timeout = parseFloat(3);
	   // dmp.Diff_EditCost = parseFloat(4);
	  //  var ms_start = (new Date()).getTime();
	  //  var d = dmp.diff_main(text1, text2);
	  //  var ms_end = (new Date()).getTime();
//	  dmp.diff_cleanupEfficiency(d);
	  //  var ds = my_prettyHtml(d);
		//$('#compareRightContent').html(ds.replace(regExpN,"<br/>"));

		  $('#compareDiv').mergely({
		cmsettings: { readOnly: true,lineWrapping: true,lineNumbers: false },
		sidebar	: false,
		editor_width: '48%',
		editor_height: '100%'
	});
		  $('#compareDiv').mergely('lhs', text1);
		  $('#compareDiv').mergely('rhs', text2);
}
 */

var dmp = new diff_match_patch();
function compareContent(leftText, leftversion, rightText, rightversion) {
	var timeout = 0;
	var editcost = 4;
	dmp.Diff_Timeout = timeout;
	dmp.Diff_EditCost = editcost;
	var ms_start = (new Date()).getTime();
	var d = dmp.diff_main(leftText, rightText);
	var ms_end = (new Date()).getTime();

	var ds = dmp.diff_prettyHtml(d);
	document.getElementById('compare').innerHTML = ds;
	$("#compare").css("display", "none");//TODO 注意分析这句话起什么作用
	ds = "<div style='height:10px'></div>" + ds;
	document.getElementById('compareLeftContent').innerHTML = ds;
	document.getElementById('compareRightContent').innerHTML = ds;



}
function diff(content, version, wordId, obj) {

	var text1 = contentLeft;
	var text2 = contentRight;

	//执行比较操作
	compareContent(text1, 1, text2, 2);
	//显示对比区域
	//$("#compare").css("display","block");

}

function my_prettyHtml(diffs) {
	var html = [];
	var pattern_amp = /&/g;
	var pattern_lt = /</g;
	var pattern_gt = />/g;
	var pattern_para = /\n/g;
	for (var x = 0; x < diffs.length; x++) {
		var op = diffs[x][0];
		var data = diffs[x][1];
		var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
			.replace(pattern_gt, '&gt;')
		switch (op) {
			case DIFF_INSERT:
				html[x] = '<span style="color:#ff0000" >' + text + '</span>';
				break;
			case DIFF_DELETE:
				break;
			case DIFF_EQUAL:
				html[x] = '<span >' + text + '</span>';
				break;
		}
	}
	return html.join('');
};
// <!--var scoreType = '<s:property value="subjectData.scoreType"/>';-->
// <!--var scoreScope = '<s:property value="subjectData.scoreScope"/>';-->
var scoreType = '1';
var scoreScope = '100';

function initReviewDetails(review, reviewType) {
	var data = review;
	// var data = JSON.parse(review);
	$("#pop-reset").hide()
	editable = editableControl();
	anno.res_type = "view";
	anno.title = currentData.title;
	anno.content = data.o.content;
	anno.annotations = data.o.annotations;

	$('.score').text(data.o.score);
	$('#ReadabilityScore').val(data.o.dim_score[0]);
	$('#DescriptiveScore').val(data.o.dim_score[1]);
	$('#LexicalDiversityScore').val(data.o.dim_score[2]);
	$('#WordInformationScore').val(data.o.dim_score[3]);

	// initialize star region
	// 4
	$('#star-content').raty({
		path: "img/raty",
		hints: ['1', '2', '3', '4', '5'],
		score: data.o.dim_score[0],
		starOn: 'star-red.png',
		starOff: 'star-off-big.png',
		readOnly: true
	});
	$('#star-org').raty({
		path: "img/raty",
		hints: ['1', '2', '3', '4', '5'],
		score: data.o.dim_score[1],
		starOn: 'star-orange.png',
		starOff: 'star-off-big.png',
		readOnly: true
	});
	$('#star-vocab').raty({
		path: "img/raty",
		hints: ['1', '2', '3', '4', '5'],
		score: data.o.dim_score[2],
		starOn: 'star-blue.png',
		starOff: 'star-off-big.png',
		readOnly: true
	});
	$('#star-lang').raty({
		path: "img/raty",
		hints: ['1', '2', '3', '4', '5'],
		score: data.o.dim_score[3],
		starOn: 'star-green.png',
		starOff: 'star-off-big.png',
		readOnly: true
	});

	//alert($('#global_remark_mac').text());
	//
	if (reviewType == "machine") {
		if (data.o.global_remark_mac == "undefined" || data.o.global_remark_mac == "") {
			$('#dp-reset').text("没有机器点评。");
		} else {
			$('#dp-reset').text(data.o.global_remark_mac);
		}
	} else {
		if (data.o.global_remark == "undefined" || data.o.global_remark == "") {
			$('#dp-reset').text("没有老师点评。");
		} else {
			// $('#dp-reset').text(data.o.global_remark);
			$("#dp-reset").html(data.o.global_remark_teacher)
		}
	}


	// Security check, null object check ...
	$('#char_count').text(anno.charCount);

	$('#text_title').text(anno.title);
	if (currentTab == "1") {
		init_static(reviewType);
		now_item_null();
		updateSysInfo();
	}

	// var editable = false;
	// // 学生进入机器评阅
	// if ($('#computerreview_type_hidden').val() == '2') {
	//
	// 	var editableFlag = true;
	// 	editable = editableFlag;
	//
	// 	if (editableFlag == true) {
	// 		$('#save_and_return').show();
	// 	} else {
	// 		$('#save_and_return').hide();
	// 	}
	// }
	init_sent_by_sent(editable);

	$('.modify_by_sent').hide();

	$('.sentence .sent_left').on('click', '.mark_modify', function () {
		//$(this).parent().parent().parent().find('.sent_item').toggle();
		$(this).parent().parent().parent().find('.modify_by_sent').show();         // 新添
		var text = $(this).parent().prev().find('.hid_sent_text').val();                                  // 新添
		// var lines=text.length/50+1;
		// $(this).parent().parent().parent().find('.text_modify_by_sent').css("height",lines*20);
		//$(this).parent().parent().find('.text_modify_by_sent').text(text); // 新添
		$(this).parent().parent().parent().find('.text_modify_by_sent').text(text); // 新添
		// $(this).parent().parent().parent().find('.text_modify_by_sent').html(text);
		$(this).parent().parent().hide();
		$(this).attr("value", "t")
		$(this).find(".bjyc-reset_").html("隐藏")
		$(this).parent().parent().parent().find('.sent_right').show()
	});

	$('.sentence .sent_left').on('click', '.mark_check', function () {
		// $(this).parent().parent().parent().find('.sent_right').toggle();
		if ($(this).attr("value") == "t") {
			// 隐藏
			$(this).attr("value", "f")
			// $(this).children().get(0).attr("src","img/eye.svg")
			$(this).find(".bjyc-reset_").html("显示")
			$(this).parent().parent().parent().find('.sent_right').hide();
			$(this).find("img").attr("src", "img/eye.svg")

		} else {
			//打开
			$(this).attr("value", "t")
			$(this).find(".bjyc-reset_").html("隐藏")
			$(this).parent().parent().parent().find('.sent_right').show()
			$(this).find("img").attr("src", "img/cc-eye.svg")
			// $(this).children().get(0).attr("src","img/cc-eye.svg")
		}
	});
	$('.fold_button').click(function () {
		if ($(this).attr("value") == "t") {
			// 关闭
			$(this).attr("value", "f")
			$(this).children().attr("src", "img/minus.png")
			$(this).parent().next().hide()
		} else {
			// 打开
			$(this).attr("value", "t")
			$(this).parent().next().show()
			$(this).children().attr("src", "img/add.png")
		}
		setScreenHeight()

	});
	$('.sentence .modify_by_sent').on('click', '.mark_cancel', function () {

		$(this).parent().parent().hide()
		$(this).parent().parent().prev().show()
	})
	$('.sentence .modify_by_sent').on('click', '.mark_modify', function () {
		var new_text = $(this).parent().prev().find('.text_modify_by_sent').text().replaceAll("&nbsp;", "");
		var para_id = parseInt($(this).parents('.paragraph').attr('pid'));
		var s_id = parseInt($(this).attr('sid'));
		if ($.trim(new_text) == '') {
			$(this).parent().prev().val('');
			$(this).parent().parent().hide();
			$(this).parent().parent().prev().show();
			return;
		}
		$(this).parent().parent().prev().find('.sent_text').text(new_text);
		$(this).parent().parent().prev().find('.hid_sent_text').val(new_text);
		$(this).parent().parent().prev().show();                         // 新添
		// $(this).parent().prev().text('');
		$(this).parent().prev().val('');
		anno.content.p[para_id - 1].s[s_id - 1] = new_text;
		$(this).parent().parent().hide();

		// 保存作文内容到后端
		// saveModified();

		// 发起机器评阅
		// 更新本句机器评阅结果
	});
	$('.sentence .err_list').on('click', '.doubt_err', function () {

		var computerReview = $(this).prev().text() + " " + $(this).next().text();
		var sent_text = $(this).parent().parent().parent().parent().prev().find(".sent_text").next().val();

		// 参数
		var postdata = {
			'errorReport.courseId': '<s:property value="courseId"/>',
			'errorReport.subjectId': '<s:property value="subjectId"/>',
			'errorReport.userId': '<s:property value="userId"/>',
			'errorReport.reviewVersion': '<s:property value="reviewVersion"/>',
			'errorReport.sentence': sent_text,
			'errorReport.computerReview': computerReview
		};

		$.post("doReportError.action", postdata, func_callback, "json");
		function func_callback(data) {

			var jsondata = JSON.parse(data);
			if (jsondata.status == false) {
				iw.error(jsondata.err_msg);
				return;
			} else {
				iw.success("已经收到你对机评错误的报告，非常感谢，我们会尽快处理，必要时会通过电子邮件与你联系。");
			}
		}

		return true;
	});
}

var sentOffsetIndexs = []

// 定位机评的位置和文本
function locateTR(begin, end) {
	var ret = { sent_num: 0, locationText: "" };
	var sen_num = 0;
	var locationText = "";
	for (var i = 0; i < sentOffsetIndexs.length; i++) {
		if (begin >= sentOffsetIndexs[i].begin && begin < sentOffsetIndexs[i].end
		) {
			// 找到开始行
			sen_num = i;
			var offsetStart = begin - sentOffsetIndexs[i].begin;

			// 查找结束行
			for (var j = sen_num; j < sentOffsetIndexs.length; j++) {
				if (end >= sentOffsetIndexs[j].begin && end < sentOffsetIndexs[j].end
				) {
					var offsetEnd = end - sentOffsetIndexs[j].begin;
					var sentText = $("#sent_" + (sen_num + 1)).find(".sent_text").text();
					// 开始和结尾在同一行
					if (j == sen_num) {
						if (offsetEnd - offsetStart < 30) {
							locationText = sentText.substring(offsetStart - 1, offsetEnd);
						} else {
							locationText = sentText.substring(offsetStart - 1, offsetStart + 10) + "..." + sentText.substring(offsetEnd - 10, offsetEnd);
						}
					} else {
						// 取开始行开始位置后10个字符
						if (sentOffsetIndexs[i].end - begin > 10) {
							locationText = sentText.substring(offsetStart - 1, offsetStart + 10);
						} else {
							locationText = sentText.substring(offsetStart - 1, sentOffsetIndexs[i].end);
						}
						locationText += "...";
						// 取结束行结束位置前10个字符
						if (end - sentOffsetIndexs[j].begin > 10) {
							var endSentText = $("#sent_" + (j + 1)).find(".sent_text").text();
							locationText += endSentText.substring(offsetEnd - 10, offsetEnd);
						} else {
							locationText += sentText.substring(sentOffsetIndexs[j].begin, offsetEnd);
						}
					}

					break;
				}

			}
			ret.sent_num = sen_num;
			ret.locationText = locationText;

			break;
		}

	}
	return ret;
}


function getTRErrs() {
	var ret = [];
	for (var k = 0; k < anno.annotations.errs.length; k++) {
		var location = locateTR(anno.annotations.errs[k].ranges[0].begin, anno.annotations.errs[k].ranges[0].end);
		var notes = anno.annotations.errs[k].name_zh + "。" + location.locationText + anno.annotations.errs[k].notes;
		var err = { sen_num: location.sent_num, locationText: location.locationText, notes: notes };
		ret.push(err);
	}

	for (var k = 0; k < anno.annotations.modis.length; k++) {
		var name_zh = anno.annotations.modis[k].name_zh;
		var location = locateTR(anno.annotations.modis[k].ranges[0].begin, anno.annotations.modis[k].ranges[0].end);
		var notes = "";
		if (name_zh == "替换") {
			notes = "将" + location.locationText + "替换成" + anno.annotations.modis[k].notes;
		} else {
			if (anno.annotations.modis[k].ins_direction == "before") {
				notes = "在" + location.locationText + "前面插入" + anno.annotations.modis[k].notes;
			} else {
				if (anno.annotations.modis[k].ins_direction == "after") {
					notes = "在" + location.locationText + "后面插入" + anno.annotations.modis[k].notes;
				}
			}
		}
		var err = { sen_num: location.sent_num, locationText: location.locationText, notes: notes };
		ret.push(err);
	}

	for (var k = 0; k < anno.annotations.evals.length; k++) {
		var name_zh = anno.annotations.evals[k].name_zh;
		var location = locateTR(anno.annotations.evals[k].ranges[0].begin, anno.annotations.evals[k].ranges[0].end);
		var notes = name_zh + "。" + location.locationText + "是" + anno.annotations.evals[k].notes;
		var err = { sen_num: location.sent_num, locationText: location.locationText, notes: notes };
		ret.push(err);
	}
	if(anno.annotations.sents){
		for (var k = 0; k < anno.annotations.sents.length; k++) {
			var name_zh = anno.annotations.sents[k].name_zh;
			var location = locateTR(anno.annotations.sents[k].ranges[0].begin, anno.annotations.sents[k].ranges[0].end);
			var notes = name_zh + "。" + location.locationText + "是" + anno.annotations.sents[k].notes;
			var err = { sen_num: location.sent_num, locationText: location.locationText, notes: notes };
			ret.push(err);
		}
	}

	return ret;
}

function init_sent_by_sent(editable, reviewType) {
	var sentBegin = 0;
	var sentEnd = 0;
	// empty default data
	$('#sent_by_sent').empty();
	// initialize sentences
	if (anno.content.p.length == 0) return;
	var sent_by_sent = '';
	var sent_count = 0;
	for (var i = 0; i < anno.content.p.length; i++) {
		var odd_even = i % 2 == 0 ? "odd" : "even";
		sent_by_sent += '<div pid="' + (i + 1) + '" class="para-' + odd_even + ' paragraph"><div class="title-' + odd_even + '">' + '<span class="fold_button" value="t"><img src="img/add.png" width="14" height="14" class="rotate"></span>' + ' 第' + (i + 1) + '段</div><div class="sentences">';
		for (var j = 0; j < anno.content.p[i].s.length; j++) {
			sent_count++;
			oldSentEnt = sentEnd;
			sentEnd += anno.content.p[i].s[j].length;
			sentOffsetIndexs.push({ begin: oldSentEnt, end: sentEnd - 1 })
			sent_by_sent += '<div id="sent_' + (sent_count)
				+ '" class="sentence"><div class="sent_left "><div class="sent_item span10 row-fluid"><span sid="' + (j + 1)
				+ '" class="sent_mark span1" style="min-height: 1px;">' + (i + 1) + '.' + (j + 1)
				+ '</span> <span sid="' + (j + 1) + '" class="sent_text  span10" style="color: #475669;font-size: 14px;min-height:20px;">' + anno.content.p[i].s[j]
				+ '</span><input type="hidden" class="hid_sent_text" value="' + anno.content.p[i].s[j]
				+ '" ></div><div class="span2" style="margin-left: 0;text-align: right;min-height:0px;"><span sid="' + (j + 1) + '" class="mark_check" value="t"><img src="img/cc-eye.svg" alt="" title="" width="18" height="18"/><span class="bjyc-reset bjyc-reset_">隐藏</span></span><span sid="' + (j + 1) + '" class="mark_modify mark_modify-st"><img src="img/edit.svg" alt="修改" title="修改" width="12" height="12"/><span class="bjyc-reset">编辑</span></span></div></div>' +
				'<div class="modify_by_sent row-fluid"><div class="sent_item span10"><div class="span1 sent_mark" style="min-height:0px;margin-left:8px">' + (i + 1) + '.' + (j + 1) + '</div><div contenteditable="true" sid="' + (j + 1) + '" class="text_modify_by_sent span10" style="margin-left: 14px;overflow:hidden;padding: 5px;" onpropertychange="MaxMe(this)" oninput="MaxMe(this)"></div></div>' +
				'<div class="span2" style="margin-left: -11px;text-align: right;min-height:0px"><span sid="' + (j + 1) + '"  class="mark_cancel"><img src="img/cancel.svg" alt="" title="" width="14" height="14"/><span class="bjyc-reset bjyc-reset_">取消</span></span><span sid="' + (j + 1) + '" class="mark_modify"><img src="img/save.svg" alt="保存" title="保存" width="14" height="14"/><span class="bjyc-reset">保存</span></span></div></div>' +
				'</div>';
		}
		sent_by_sent += '</div><div style="clear:both"></div></div>';
	}

	$('#sent_by_sent').append(sent_by_sent);

	// initialize annotations
	var CollocationError_count = 0;
	var SyntaxError_count = 0;
	var NormsError_count = 0;
	var OtherError_count = 0;
	/* var PhraseError_count=0;
	var ArticleError_count=0;
	var SentenceError_count=0;
	var GrammarSemanticError_count=0;
	var ComparisonError_count=0;
	var SentenceStructureError_count=0;
	var ModalVerbError_count=0;
	var ConsistencyError_count=0; */

	var err_style = '"display:inline-block; padding: 0px 5px; color:'
	var err_color = {
		'CollocationError': err_style + '#13CE66"',
		'SyntaxError': err_style + '#FF4949"',
		'OtherError': err_style + '#F5A623 "',
		'NormsError': err_style + '#009D91"',
		'TeacherError': err_style + '#20A0FF"'
	}
	var teacherErrs = getTRErrs();
	for (var k = 0; k < teacherErrs.length; k++) {
		var err = '<li errs_id="' + (k + 1) + '">';
		var err_type = "TeacherError";
		err += '<div class="span1" style="min-height: 5px;">&nbsp;</div><div class="span10 row-fluid" style="margin-left: 0;"><span class="err_type span2 ' + err_type + '" style=' + err_color[err_type] + '><span style="display: inline-block;position: relative;left: -3px;white-space: nowrap;min-width: 100px;">【老师点评】</span></span><span class="err_note span9" style="font-size: 12px;color: #475669;">' + teacherErrs[k].notes + '</span></div>';
		err += '<div class="span1" style="min-height: 5px;">&nbsp;</div><div style="clear:both"></div></li>';
		var sen_num = teacherErrs[k].sen_num + 1;
		// var sen_num = anno.annotations.errs[k].sen_num;
		// sen_num++;
		if ($('#err_list_' + sen_num).html() == undefined) {
			$('#sent_' + sen_num).append('<div class="sent_right row-fluid"><div id="sid_' + (sen_num) + '" sid="' + (sen_num) + '" class="err_list span10" style="margin-left: 5px;min-height:0px;margin-bottom:-10px"><ol id="err_list_' + (sen_num) + '" ></ol></div></div>')
		}
		$('#err_list_' + sen_num).append(err);
	}

	for (var k = 0; k < anno.annotations.errs_mac.length; k++) {

		var err_mac = '<li errs_mac_id="' + (k + 1) + '">';
		var err_type = "OtherError";
		var colorStyle = "#FF4949;"
		var name_zh = anno.annotations.errs_mac[k].name_zh;
		switch (name_zh) {
			case "中式英语":
				var err_type = "SyntaxError";
				SyntaxError_count++;
				break;
			case "拼写错误":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "写作规范":
				var err_type = "NormsError";
				NormsError_count++;
				break;
			case "搭配错误":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "单词警示":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "短语错误":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "风格错误":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "高级表达":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "冠词错误":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "句子错误":
				var err_type = "SyntaxError";
				SyntaxError_count++;
				break;
			case "句子警示":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "普通英语":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "冗余错误":
				var err_type = "SyntaxError";
				SyntaxError_count++;
				break;
			case "术语滥用":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "维基错误":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "语法错误":
				var err_type = "SyntaxError";
				var colorStyle = "#FF4949;"
				SyntaxError_count++;
				break;
			case "语义错误":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "比较级错误":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "标点错误":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "定冠词缺失":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "短语冗余":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "固定短语":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "行文习惯":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "近义词混用":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "句子结构有误":
				var err_type = "SyntaxError";
				SyntaxError_count++;
				break;
			case "口语化表达":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "情态动词错误":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "冗余表达":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "冗余短语":
				var err_type = "CollocationError";
				CollocationError_count++;
				break;
			case "冗长表达":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "学习提示":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			case "一致性错误":
				var err_type = "OtherError";
				OtherError++;
				break;
			case "其他错误":
				var err_type = "OtherError";
				OtherError_count++;
				break;
			default:
				var err_type = "OtherError";
				OtherError_count++;
		}
		//			err_mac+='<div class="span10"><span class="'+err_type+'">['+anno.annotations.errs_mac[k].name_zh+']</span><span class="err_note">'+anno.annotations.errs_mac[k].notes+'</span></div><span class="doubt_err span2">[举报错误]</span>';

		err_mac += '<div class="span1" style="min-height: 5px;">&nbsp;</div><div class="span10 row-fluid" style="margin-left: 0;"><span class="err_type span2 ' + err_type + '" style=' + err_color[err_type] + '><span style="display: inline-block;position: relative;left: -3px;white-space: nowrap;min-width: 100px;">【' + anno.annotations.errs_mac[k].name_zh + '】</span></span><span class="err_note span9" style="font-size: 12px;color: #475669;">' + anno.annotations.errs_mac[k].notes + '</span></div>';
		err_mac += '<div class="span1" style="min-height: 5px;">&nbsp;</div><div style="clear:both"></div></li>';
		var sen_num = anno.annotations.errs_mac[k].sen_num;
		sen_num++;
		if ($('#err_list_' + sen_num).html() == undefined) {
			$('#sent_' + sen_num).append('<div class="sent_right row-fluid"><div id="sid_' + (sen_num) + '" sid="' + (sen_num) + '" class="err_list span10" style="margin-left: 5px;min-height:0px;margin-bottom:-10px"><ol id="err_list_' + (sen_num) + '" ></ol></div></div>')
		}
		$('#err_list_' + sen_num).append(err_mac);
	}
	$("#CollocationError_count").html(CollocationError_count);
	$("#SyntaxError_count").html(SyntaxError_count);
	$("#OtherError_count").html(OtherError_count);
	$("#NormsError_count").html(NormsError_count);
	/* $("#PhraseError_count").text(PhraseError_count);
	$("#ArticleError_count").text(ArticleError_count);
	$("#SentenceError_count").text(SentenceError_count);
	$("#GrammarSemanticError_count").text(GrammarSemanticError_count);
	$("#ComparisonError_count").text(ComparisonError_count);
	$("#SentenceStructureError_count").text(SentenceStructureError_count);
	$("#ConsistencyError_count").text(ConsistencyError_count); */
	if (usTp == "teacher" && wtTp != 1) {
		// console.log()
		$(".mark_modify-st").hide()
	}

}

function JsonToStr(o) {
	var r = [];
	if (typeof o == "string" || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{";
			for (var i in o) {
				r[r.length] = i;
				r[r.length] = ":";
				r[r.length] = JsonToStr(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "}";
		} else {
			r[0] = "[";
			for (var i = 0; i < o.length; i++) {
				r[r.length] = JsonToStr(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "]";
		}
		return r.join("");
	}
	return o.toString();
}

function init_static(reviewType) {
	$('#table_anno').html('');
	var array_p = anno.content.p;//原文所有段落数组

	var charCount = 0 //字符计数
	var sid = 0;//全局句子编号
	var pid = 0;//段落编号(原文译文段落数相等)，从0开始
	var p_max = array_p.length;
	var tr = '';
	for (var i = 0; i < p_max; i++) {
		pid = i;
		var array_s = (array_p[i] ? array_p[i].s : []);//原文句数组
		var co = '';
		//span to be substituted
		var array_s_l = array_s.length;
		for (var j = 0; j < array_s_l; j++) {//original passage sentences
			sid++;
			var tmp = array_s[j];
			var tl = tmp.length
			for (var k = 0; k < tl; k++) {//characters per sentence
				charCount++;
				var ch = tmp[k]; //(k, 1);
				co += '<span class="unit" id="uo_' + charCount + '" sid="' + sid + '">' + ch + '</span>';
			}
			// co += '<a href="javascript:void(0);" class="endlink" title="" sid="' + sid + '">¶</a>';
		}
		tr += '<ul class="para"><li class="num num-o w_1" pid="' + pid + '">' + (i + 1) +
			'</li><li pid="' + pid + '" class="paragraph-o w_3"><div class = "para">' + co +
			'</div></li></ul>';
	}
	$('#table_anno').append($(tr));
	anno.charCount = charCount;
	//alert("cc");
	init_render_static("table_anno", reviewType);
	//alert("dd");
}
// 体检表
function sectionTheer(json, report) {
	$("#section3").html("")
  if(report == undefined) return;
	for (var i = 0; i < json.length; i++) {
		// 表格行
		var td = ""
		// 行数
		var trCont = 0
		// 第一行值
		var line_1 = ""
		for (var j = 0; j < json[i].items.length; j++) {
			// 相同key 和 hidden=false
			if (report[json[i].items[j].key] && !json[i].items[j].hidden) {
				// 对比格式，范围值
				var vl = setItems(report[json[i].items[j].key], json[i].items[j].format, json[i].items[j].min, json[i].items[j].max)
				// 其他行的值
				var line = ""
				// flag=true为可以显示的行
				// 超出范围标记
				var f=""
				if (vl.flag) {
					if(!vl.limit){
						f=`<span style="color:red">*</span>`
					}
					if (trCont == 0) {
						line_1 = `<td>${json[i].items[j].key}</td>
								<td>${f}${vl.value}</td>
								<td>${json[i].items[j].min}~${json[i].items[j].max}</td>`
					} else {
						line = `<tr>
						<td>${json[i].items[j].key}</td>
						<td>${f}${vl.value}</td>
						<td>${json[i].items[j].min}~${json[i].items[j].max}</td>
					</tr>`
					}
					trCont++
					td = td + line
				}
			}
		}
		// 表格
		var tb = `<table class="tjTable">
					<tr>
						<th style="width:25%">项目</th>
						<th style="width:25%">维度</th>
						<th style="width:25%">测量值</th>
						<th style="width:25%">参考范围</th>
					</tr>
					<tr>
					<td rowspan="${trCont}" style="border: #E0E6ED 1px solid;">${json[i].class}</td>
					${line_1}
					</tr>
					${td}
				</table>`
		// 行数大于0渲染
		if (trCont > 0) {
			$("#section3").append(tb)
		}

	}
}
// 两组json对比格式和范围
function setItems(d, type, min, max) {
	// 是否为数字
	var flag = false
	// 是否在范围内
	var limit = true
	// 结果值
	var value = 0
	if (type == "int") {
		value = parseInt(d)
		min = parseInt(min)
		max = parseInt(max)
		flag = !isNaN(value)
		if (value < min || value > max) {
			limit = false
		}

	} else if (type == "float") {
		value = parseFloat(d).toFixed(1);
		min = parseFloat(min).toFixed(1);
		max = parseFloat(max).toFixed(1);
		flag = !isNaN(parseInt(d))
		if (value < min || value > max) {
			limit = false
		}
		// flag=isNaN(Number(d))

	} else if (type == "percent") {
		value = (parseFloat(d) * 100).toFixed(1);
		min = (parseFloat(min) * 100).toFixed(1);
		max =(parseFloat(max) * 100).toFixed(1);
		if (value < min || value > max) {
			limit = false
		}
		value = value + "%"
		flag = !isNaN(parseInt(d))

		// var value=parseInt(d)
		// flag=isNaN(parseInt(d))

	}
	var arr = {
		flag: flag,
		limit: limit,
		value: value
	}
	return arr;
}

var tjJson = [
	{
		"class": "词汇",
		"items": [
			{ "key": "形符数", "name": "形符数", "value": "", "min": "69", "max": "1128", "format": "int", "hidden": false },
			{ "key": "类符数", "name": "类符数", "value": "", "min": "88", "max": "385", "format": "int", "hidden": false },
			{ "key": "拼写正确率", "name": "拼写正确率", "value": "", "min": "98.5%", "max": "100%", "format": "percent", "hidden": false },
			{ "key": "词汇丰富度", "name": "词汇丰富度", "value": "", "min": "49%", "max": "68%", "format": "percent", "hidden": false },
			{ "key": "平均词长", "name": "平均词长", "value": "", "min": "3.9", "max": "4.8", "format": "float", "hidden": false },
			{ "key": "词长标准差", "name": "词长标准差", "value": "", "min": "1.3", "max": "2.9", "format": "float", "hidden": false },
			{ "key": "专家级单词占比", "name": "专家级单词占比", "value": "", "min": "", "max": "", "format": "percent", "hidden": true },
			{ "key": "研究生单词占比", "name": "研究生单词占比", "value": "", "min": "", "max": "", "format": "percent", "hidden": true },
			{ "key": "六级单词占比", "name": "六级单词占比", "value": "", "min": "", "max": "", "format": "percent", "hidden": true },
			{ "key": "四级单词占比", "name": "四级单词占比", "value": "", "min": "", "max": "", "format": "percent", "hidden": true },
			{ "key": "高中单词占比", "name": "高中单词占比", "value": "", "min": "", "max": "", "format": "percent", "hidden": true },
			{ "key": "初中单词占比", "name": "初中单词占比", "value": "", "min": "", "max": "", "format": "percent", "hidden": true }
		]
	},
	{
		"class": "词性",
		"items": [
			{ "key": "动词占比", "name": "动词占比", "value": "", "min": "13.9%", "max": "16.8%", "format": "percent", "hidden": false },
			{ "key": "名词占比", "name": "名词占比", "value": "", "min": "14.9%", "max": "15.4%", "format": "percent", "hidden": false },
			{ "key": "形容词占比", "name": "形容词占比", "value": "", "min": "14.9%", "max": "18.7%", "format": "percent", "hidden": false },
			{ "key": "副词占比", "name": "副词占比", "value": "", "min": "14.9%", "max": "15.4%", "format": "percent", "hidden": false },
			{ "key": "连词占比", "name": "连词占比", "value": "", "min": "13.9%", "max": "16.8%", "format": "percent", "hidden": false },
			{ "key": "标点占比", "name": "标点占比", "value": "", "min": "14.9%", "max": "15.4%", "format": "percent", "hidden": true }
		]
	},
	{
		"class": "句子",
		"items": [
			{ "key": "句子数", "name": "句子数", "value": "", "min": "23", "max": "78", "format": "int", "hidden": false },
			{ "key": "从句类型数", "name": "从句类型数", "value": "", "min": "", "max": "", "format": "int", "hidden": true },
			{ "key": "从句总数", "name": "从句总数", "value": "", "min": "18", "max": "68", "format": "int", "hidden": false },
			{ "key": "主语从句个数", "name": "主语从句个数", "value": "", "min": "", "max": "", "format": "int", "hidden": true },
			{ "key": "关系从句个数", "name": "关系从句个数", "value": "", "min": "", "max": "", "format": "int", "hidden": true },
			{ "key": "平均句长", "name": "平均句长", "value": "", "min": "4.8", "max": "15.3", "format": "float", "hidden": false },
			{ "key": "最短句词数", "name": "最短句词数", "value": "", "min": "3", "max": "8.3", "format": "float", "hidden": false },
			{ "key": "最长句词数", "name": "最长句词数", "value": "", "min": "25", "max": "128", "format": "int", "hidden": false },
			{ "key": "残句", "name": "残句", "value": "", "min": "69", "max": "1128", "format": "int", "hidden": true },
			{ "key": "病句", "name": "病句", "value": "", "min": "88", "max": "385", "format": "int", "hidden": true }
		]
	},
	{
		"class": "段落",
		"items": [
			{ "key": "段落数", "name": "段落数", "value": "", "min": "3", "max": "22", "format": "int", "hidden": false },
			{ "key": "平均每段句数", "name": "平均每段句数", "value": "", "min": "4.2", "max": "6.6", "format": "int", "hidden": false },
			{ "key": "平均每段词数", "name": "平均每段词数", "value": "", "min": "15", "max": "83", "format": "int", "hidden": false },
			{ "key": "首段句数占比", "name": "首段句数占比", "value": "", "min": "", "max": "", "format": "int", "hidden": true },
			{ "key": "首段词数占比", "name": "首段词数占比", "value": "", "min": "", "max": "", "format": "int", "hidden": true },
			{ "key": "尾段句数占比", "name": "尾段句数占比", "value": "", "min": "4.8", "max": "15.3", "format": "float", "hidden": true },
			{ "key": "尾段词数占比", "name": "尾段词数占比", "value": "", "min": "3", "max": "8.3", "format": "float", "hidden": true }
		]
	},
	{
		"class": "篇章",
		"items": [
			{ "key": "修改次数", "name": "修改次数", "value": "", "min": "3", "max": "22", "format": "int", "hidden": true }
		]
	}
]
var reportJson = {
	"词长内距": "5.0",
	"平均单词获取年龄": "5.1337762237762234",
	"句子数": "13",
	"词汇丰富度": "8.153846153846153",
	"初中单词占比": "0.7514792899408284",
	"句长标准差": "4.0",
	"词长标准差": "2.622713820162992",
	"平均词长": "4.6982248520710055",
	"四级单词占比": "0.029585798816568046",
	"研究生单词占比": "0.0",
	"尾段句数占比": "TODO",
	"名词占比": "0.27218934911242604",
	"形符数": "169",
	"首段词数占比": "TODO",
	"连词占比": "0.01775147928994083",
	"最短句词数": "9.0",
	"首段句数占比": "TODO",
	"六级单词占比": "0.08875739644970414",
	"专家级单词占比": "0.005917159763313609",
	"副词占比": "0.029585798816568046",
	"高中单词占比": "0.029585798816568046",
	"修改次数": "0",
	"拼写正确率": "0.9289940828402367",
	"类符数": "106",
	"单词平均难度": "-1.1124260355029585",
	"句长中位数": "12.0",
	"残句数": "TODO",
	"平均每段句数": "2.6",
	"平均每段词数": "33.8",
	"句长内距": "6.0",
	"段落数": "5",
	"各句子长度": "11.0, 16.0, 9.0, 12.0, 9.0, 10.0, 11.0, 17.0, 10.0, 16.0, 10.0, 16.0, 22.0",
	"形容词占比": "0.13609467455621302",
	"尾段词数占比": "TODO",
	"词长中位数": "4.0",
	"平均句长": "13.0",
	"动词占比": "0.21301775147928995",
	"病句数": "TODO",
	"从句总数": "6",
	"最长句词数": "22.0"
}