/**
 * 倒计时处理
 */
	
function startSecs(endsecond, id) {
    // 倒计时
    var myDate = new Date();
    var cursecond = parseInt(myDate.getTime() / 1000);
	var dis = endsecond - cursecond;
	if (dis > 0) {
		window.setTimeout('getSecs(' + endsecond + ',\'' + id + '\')', 1);
	}
}
function getSecs(endsecond, id) {
    var myDate = new Date();
    var cursecond = parseInt(myDate.getTime() / 1000);    //获取当前时间
	var dis = endsecond - cursecond;

	var msg = "";
	if (dis > 7200) {
		var day = parseInt(dis / 86400);
		if (day > 0) {
			msg = msg + day + "天";
		}
        msg = msg + parseInt((dis - day * 86400) / 3600) + "小时";
	} else if (dis<=0) {
		msg = "0小时0分0秒"
	} else { // 小于两小时
        var hour = parseInt(dis / 3600);
		msg = hour + "小时" + parseInt((dis - hour * 3600) / 60) + "分" + ( dis % 60) + "秒";
	}
	
	$("#" + id).text(msg);
	window.setTimeout('getSecs(' + endsecond + ',\'' + id + '\')',1000);
}

function resolveWritingPlan(planType, planText, writingPlan) {

    //var writingPlan = $("#textCopy");
    writingPlan.empty();
    if (planType == 0 || planText == null || planText == "") {
    	return;
    }
    var jsondata = JSON.parse(planText);
            
    var writingPlanHtml="";
    var prefix="";
    if (planType == 1) {
    	// 观点陈述型
    	prefix="stating";
    	for (var i=1; i < 12; i++)
    	{
    	   if (jsondata[prefix + i] != null && jsondata[prefix + i] != "")
    	   {
    	       if (i==1)
    	       {
    	    	   writingPlanHtml += "<h4>" + jsondata[prefix + i] + "</h4>";
    	       } else if (i == 2 || i==4 || i==6 || i==8 || i==10) {
    	    	   writingPlanHtml += "<h5>" + jsondata[prefix + i] + "</h5>";
    	       } else {
    	    	   writingPlanHtml += "<p>" + jsondata[prefix + i] + "</p>";
    	       }
    	   }
    	}
    } else if (planType == 2) {
    	// 事物对比型
    	prefix="comparison";
    	var list = [1,9,13,17,2,6,7,8,3,10,11,12,4,14,15,16,5,18,19,20];
    	for (var j=0; j < 20; j++)
    	{
    		var i = list[j];
    		if (jsondata[prefix + i] != null && jsondata[prefix + i] != "")
    	   {
    	       if (i<=5)
    	       {
    	    	   writingPlanHtml += "<h4>" + jsondata[prefix + i] + "</h4>";
    	       } else {
    	    	   writingPlanHtml += "<p>" + jsondata[prefix + i] + "</p>";
    	       }
    	   }
    	}
    } else if (planType == 3) {
    	// 对立观点型
    	prefix="oppose";
    	var list = [1,4,2,5,6,3,7];
    	for (var j=0; j < 7; j++)
    	{
    		var i = list[j];
    		if (jsondata[prefix + i] != null && jsondata[prefix + i] != "")
    	   {
    	       if (i<=3)
    	       {
    	    	   writingPlanHtml += "<h4>" + jsondata[prefix + i] + "</h4>";
    	       }  else {
    	    	   writingPlanHtml += "<p>" + jsondata[prefix + i] + "</p>";
    	       }
    	   }
    	}
    } else if (planType == 4) {
    	// 陈述利弊型
    	prefix="state";
    	var list = [1,6,2,4,5,3,7];
    	for (var j=0; j < 7; j++)
    	{
    		var i = list[j];
    		if (jsondata[prefix + i] != null && jsondata[prefix + i] != "")
    	   {
    	       if (i<=3)
    	       {
    	    	   writingPlanHtml += "<h4>" + jsondata[prefix + i] + "</h4>";
    	       } else {
    	    	   writingPlanHtml += "<p>" + jsondata[prefix + i] + "</p>";
    	       }
    	   }
    	}
    } else if (planType == 5) {
    	// 解决问题型
    	prefix="solve";
    	var list = [1,4,2,5,3,6,7,8,9];
    	for (var j=0; j<9; j++)
    	{
    		var i = list[j];
    		if (jsondata[prefix + i] != null && jsondata[prefix + i] != "")
    	   {
    	       if (i<=3)
    	       {
    	    	   writingPlanHtml += "<h4>" + jsondata[prefix + i] + "</h4>";
    	       } else {
    	    	   writingPlanHtml += "<p>" + jsondata[prefix + i] + "</p>";
    	       }
    	   }
    	}
    } else if (planType == 6) {
    	// 图表作文型
    	prefix="graph";
    	var list = [1,6,2,4,5,3,7];
    	for (var j=0; j < 7; j++)
    	{
    		var i = list[j];
    		if (jsondata[prefix + i] != null && jsondata[prefix + i] != "")
    	   {
    	       if (i<=3)
    	       {
    	    	   writingPlanHtml += "<h4>" + jsondata[prefix + i] + "</h4>";
    	       } else {
    	    	   writingPlanHtml += "<p>" + jsondata[prefix + i] + "</p>";
    	       }
    	   }
    	}
    } else if (planType == 7) {
    	// 自由提纲型
    	
    	prefix="free";
    	var list = [1,14,27,4,5,6,7,8,9,10,11,12,13,2,15,16,17,18,19,20,21,22,23,24,25,26,3,28,29,30,31,32,33,34,35,36,37,38,39];
    	for (var j=0; j < 39; j++)
    	{
    		var i = list[j];
    		if (jsondata[prefix + i] != null && jsondata[prefix + i] != "")
    	   {
    	       if (i<=3)
    	       {
    	    	   writingPlanHtml += "<h4>" + jsondata[prefix + i] + "</h4>";
    	       } else if (i == 6 || i==10 || i==14 || i==15 || i==19 || i==23 || i == 28 || i ==32 || i == 36 ) {
    	    	   writingPlanHtml += "<h5>" + jsondata[prefix + i] + "</h5>";
    	       } else {
    	    	   writingPlanHtml += "<p>" + jsondata[prefix + i] + "</p>";
    	       }
    	   }
    	}
    }
    
    var p = document.createElement("div");
    p.innerHTML = writingPlanHtml;
    writingPlan.append(p);
}