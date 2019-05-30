
var element;
var layer;

var startTime = 0;
var $topReferenceObject;

var evaluation;
var evaluationScoreHistoryList;
var promotion;

$(function() {
	
	$('#category1DetailOpen').click(function() {
		$(this).hide();
		$('#category1DetailClose').show();
		$('.category1Detail').show();
	});
	
	$('#category1DetailClose').click(function() {
		$(this).hide();
		$('#category1DetailOpen').show();
		$('.category1Detail').hide();
	});
	
	$('#category2DetailOpen').click(function() {
		$(this).hide();
		$('#category2DetailClose').show();
		$('.category2Detail').show();
	});
	
	$('#category2DetailClose').click(function() {
		$(this).hide();
		$('#category2DetailOpen').show();
		$('.category2Detail').hide();
	});
	
	$('#category3DetailOpen').click(function() {
		$(this).hide();
		$('#category3DetailClose').show();
		$('.category3Detail').show();
	});
	
	$('#category3DetailClose').click(function() {
		$(this).hide();
		$('#category3DetailOpen').show();
		$('.category3Detail').hide();
	});
	
	var gradeId = getParentQueryString('gradeId');
	
	if (!gradeId) {
		gradeId = '3';
	}
	
	$('#gradeName').text(gradeMap[gradeId]);
	
	layui.use(['layer', 'element'], function(){
		element = layui.element;
		layer = layui.layer;
	});
	
	$('#indicatorContainer').radialIndicator({
		barColor: '#87CEEB',
		barWidth: 10,
		initValue: 0,
		roundCorner : true,
		percentage: true
	});
	
	$.get('/compositionActionv6_experienceLoadComposition', {}, function(response) {
		
		if (response.result == true) {
			$('#title').val(response.experience_title);
			$('#content').val(response.experience_content);
			$('#grade').val(response.experience_grade);
		}
		
		$(window.parent.document).find("#compositionTitle").text($('#title').val());
		
		var request = {
			title : $('#title').val(),
			content : $('#content').val(),
			gradeId : gradeId,
			editCount : 3
		};
		
		startTime = new Date().getTime();
		$topReferenceObject = $('.thumbnail_score');
		step1();
		
		$.post('/compositionActionv6_experience', request, function(response) {
			
			if (response.result == false) {
				alert(response.message);
				return;
			}
			
			evaluation = response.evaluation;
			evaluationScoreHistoryList = response.evaluationScoreHistoryList;
			promotion = response.promotion;
			
			var timeCost = new Date().getTime() - startTime;
			
			if (timeCost < 2000) {
				setTimeout("step9();", 2000 - timeCost);
			} else {
				step9();
			}
			
		});
		
	});
	
	$(document).on('click', '.pronounceMediaIcon', function() {
		
		var pronounceMedia = $(this).attr('pronounceMedia');
		
		var $pronounceMediaAudioTag = $('#pronounceMediaAudioTag');
		$pronounceMediaAudioTag.attr('src', pronounceMedia);
		
		$pronounceMediaAudioTag.get(0).play();
	});
	
	$(document).on('click', '.btnParagraphEdit', function() {
		
		var $paragraph = $(this).parents('.paragraph');
		
		$paragraph.find('.paragraphContent').hide();
		$paragraph.find('.paragraphContentEditor').show();
		$paragraph.find('.btnParagraphEdit').hide();
		$paragraph.find('.btnParagraphSave').show();
		
		setScreenHeight();
	});
	
	$(document).on('click', '.btnParagraphSave', function() {
		
		$topReferenceObject = $(this).parents('.paragraph');
		
		var title = $('#title').val();
		
		var content = '';
		
		$('.paragraphContentEditor').each(function() {
			
			var pContent = $(this).val();
			
			if (pContent.length != 0) {
				content += pContent + '\n';
			}
			
		});
		
		if (title == '') {
			alert('请输入作文标题');
			return;
		}
		
		if (content == '') {
			alert('请输入作文正文');
			return;
		}
		
		step1();
		startTime = new Date().getTime();
		
		var request = {
			title : title,
			content : content,
			gradeId : gradeId,
			editCount : 3
		};
		
		$.post('/compositionActionv6_experience', request, function(response) {
			
			if (response.result == false) {
				alert(response);
				return;
			}
			
			evaluation = response.evaluation;
			evaluationScoreHistoryList = response.evaluationScoreHistoryList;
			promotion = response.promotion;
			
			retsetCountArea();
			
			var timeCost = new Date().getTime() - startTime;
			
			if (timeCost < 2000) {
				setTimeout("step9();", 2000 - timeCost);
			} else {
				step9();
			}
			
		});
		
	});
	
	function retsetCountArea() {
		
		$('.advantageCount').addClass('active').css({background : '#20A0FF'});
		$('#table_anno .btnShowAdvantage').show();
		$('#table_anno .zn_advantage_mark').css({color : 'rgb(70, 136, 71)', 'border-bottom-width' : '0.883333px'});
		
		$('.paragraphRemarkCount').addClass('active').css({background : '#ff7a7a'});
		$('.zn_remark').show();
		
	}
	
	$('.advantageCount').click(function() {
		
		var $this = $(this);

		if ($this.hasClass('active')) {
			$this.removeClass('active').css({background : '#E5E9F2'});
			$('#table_anno_wapper .btnShowAdvantage').hide();
			$('#table_anno_wapper .zn_advantage_mark').css({color : 'black', 'border-bottom-width' : '0px'});
		} else {
			$this.addClass('active').css({background : '#20A0FF'});
			$('#table_anno_wapper .btnShowAdvantage').show();
			$('#table_anno_wapper .zn_advantage_mark').css({color : 'rgb(70, 136, 71)', 'border-bottom-width' : '0.883333px'});
		}
		
	});
	
	$('.paragraphRemarkCount').click(function() {
		
		var $this = $(this);

		if ($this.hasClass('active')) {
			$this.removeClass('active').css({background : '#E5E9F2'});
			$('.zn_remark').hide();
		} else {
			$this.addClass('active').css({background : '#ff7a7a'});
			$('.zn_remark').show();
		}
		
	});
	
	$(document).on('click', '.rotate', function() {
		
		var $this = $(this);
		$this.parents('.para-odd').find('.span12').toggle();
		
		if ($this.parents('.para-odd').find('.span12:visible').length == 0) {
			$this.attr('src', '/newportal/assets/review/img/minus.png');
		} else {
			$this.attr('src', '/newportal/assets/review/img/add.png');
		}
		
	});
	
	$(document).on('click', '.mark_check', function() {
		
		var $this = $(this);
		$this.parents('.paragraphMark').find('.markDetail').toggle();
		
		if ($this.parents('.paragraphMark').find('.markDetail:visible').length == 0) {
			$this.find('img').attr('src', '/newportal/assets/review/img/eye.svg');
			$this.find('span').text('显示');
		} else {
			$this.find('img').attr('src', '/newportal/assets/review/img/cc-eye.svg');
			$this.find('span').text('隐藏');
		}

		setScreenHeight();
		
	});
	
	$(document).on('mouseover', '.btnShowAdvantage', function() {

		// var d = $('#table_anno .zn_advantage_mark[markno=' + $(this).text() + ']');
		//
		// debugger

		var $markContentSpan = $('#table_anno .zn_advantage_mark[markno=' + $(this).text() + ']').addClass('highlight-tag-mac').css({'color' : '#FFFFFF'});
	});
	
	$(document).on('mouseover', '.btnShowDisadvantage', function() {
		var $markContentSpan = $('#paragraphMarkEntityList .zn_disadvantage_mark[markno=' + $(this).text() + ']').addClass('highlight-tag-mac').css({'color' : '#FFFFFF'});

	});
	
	$(document).on('mouseout', '.btnShowAdvantage', function() {
		var $markContentSpan = $('#table_anno .zn_advantage_mark[markno=' + $(this).text() + ']').removeClass('highlight-tag-mac').css({'color' : 'rgb(70, 136, 71)'});

	});
	
	$(document).on('mouseout', '.btnShowDisadvantage', function() {
		var $markContentSpan = $('#paragraphMarkEntityList .zn_disadvantage_mark[markno=' + $(this).text() + ']').removeClass('highlight-tag-mac').css({'color' : 'rgb(70, 136, 71)'});

	});


});

function findSuggestionById(id, suggestionList) {
	
	for (var i = 0; i < suggestionList.length; i++) {

		if (id == suggestionList[i].id) {
			return suggestionList[i];
		}
	}
	
	return null;
	
}

function showData(evaluation, evaluationScoreHistoryList, promotion) {
	
	// index value
	$('#evaluationCountIndex').text(evaluationScoreHistoryList.length);
	$('#evaluationCountIndexLabel').show();
	
	$('#surpassIndex').text(evaluation.surpass + '%');
	$('#surpassIndexLabel').show();
	
	if (promotion == '--.-') {
		$('#promotionIndexDiv').hide();
	} else {
		$('#promotionIndexDiv').show();
	}
	
	$('#promotionIndex').text(promotion);
	$('#promotionIndexLabel').show();
	
	// Tab1 data
	
	$('#writingarea_curtextcount').text(evaluation.summaryReportEvaluationResult.characterCount);
	
	// $('#score').text(evaluation.score);
	numCanvas(evaluation.score);
	
	$('#category1_score').css({width : evaluation.category1Score +'%'});
	$('#category2_score').css({width : evaluation.category2Score +'%'});
	$('#category3_score').css({width : evaluation.category3Score +'%'});
	
	$('#category1_item1').css({width : evaluation.category1ItemList[0] +'%'});
	$('#category1_item2').css({width : evaluation.category1ItemList[1] +'%'});
	$('#category1_item3').css({width : evaluation.category1ItemList[2] +'%'});
	$('#category1_item4').css({width : evaluation.category1ItemList[3] +'%'});
	$('#category1_item5').css({width : evaluation.category1ItemList[4] +'%'});
	
	$('#category2_item1').css({width : evaluation.category2ItemList[0] +'%'});
	$('#category2_item2').css({width : evaluation.category2ItemList[1] +'%'});
	$('#category2_item3').css({width : evaluation.category2ItemList[2] +'%'});
	$('#category2_item4').css({width : evaluation.category2ItemList[3] +'%'});

	$('#category3_item1').css({width : evaluation.category3ItemList[0] +'%'});
	$('#category3_item2').css({width : evaluation.category3ItemList[1] +'%'});
	$('#category3_item3').css({width : evaluation.category3ItemList[2] +'%'});
	$('#category3_item4').css({width : evaluation.category3ItemList[3] +'%'});
	
	$('#remark').html(evaluation.remark);
	
    var interactiveViewRenderContent = '';
    
    $.each(evaluation.paragraphMarkEntityList, function() {
    	
    	interactiveViewRenderContent +=  this.markContent;
    	
    	var pNo = this.pNo;
    	
    	 $.each(evaluation.paragraphRemarkEntityList, function() {
    		 
    		 if (pNo == this.pNo) {
    			 interactiveViewRenderContent +=  '<p class="zn_remark">　　段评：' + this.remark + '</p>';
    		 }
    		 
    	 });
    	
    });
    
    $('#table_anno').html(interactiveViewRenderContent);
	
	$('#table_anno .btnShowDisadvantage').hide();
	$('#table_anno .zn_advantage_mark').addClass('green_line_mark');
	
	var advantageCount = 0;
	
	$('#table_anno').find('.btnShowAdvantage').each(function() {
		var no = parseInt($(this).text());
		if (advantageCount < no) {
			advantageCount = no;
		}
		$(this).append("<font>"+$(this).context.title+"</font>")
	});
	
	$('.advantageCount').text(advantageCount);
	$('.paragraphRemarkCount').text($('#table_anno').find('.zn_remark').length);
	
	// Tab2 data
	
	var $paragraphMarkEntityList = $('#paragraphMarkEntityList');
	var $paragraphTemplate = $('.paragraphTemplate');
	var $paragraphMarkTemplate = $('.paragraphMarkTemplate');
	var $articleParagraphSuggestion = $('#articleParagraphSuggestion');
	
	$articleParagraphSuggestion.find('.paragraphMarkList').empty();
	$articleParagraphSuggestion.hide();
	
	var articleSuggestionNo = 1;
	
	$.each(evaluation.suggestions, function(idx, v) {
		
		if (this.scope != 'article') {
			return;
		}
			
		var $paragraphMarkTemplateDiv = $paragraphMarkTemplate.clone().removeClass('paragraphMarkTemplate').addClass('paragraphMark');
		
		$paragraphMarkTemplateDiv.find('.markNo').text(articleSuggestionNo++);
		$paragraphMarkTemplateDiv.find('.markRefNo').hide();
		$paragraphMarkTemplateDiv.find('.markTips').text(this.tips);
		$paragraphMarkTemplateDiv.find('.markDetail').html(this.detail);
		$articleParagraphSuggestion.find('.paragraphMarkList').append($paragraphMarkTemplateDiv);
		
		$paragraphMarkTemplateDiv.show();
		
		$articleParagraphSuggestion.show();
	});
	
	$('.paragraph').remove();
	
	$.each(evaluation.paragraphMarkEntityList, function(idx, v) {
		
		var $paragraphTemplateDiv = $paragraphTemplate.clone().removeClass('paragraphTemplate').addClass('paragraph');
		$paragraphTemplateDiv.find('.paragraphNo').text((idx + 1));
		$paragraphTemplateDiv.find('.paragraphContent').html(this.markContent);
		$paragraphTemplateDiv.find('.paragraphContentEditor').text(this.content);
		$paragraphMarkEntityList.append($paragraphTemplateDiv);
		$paragraphTemplateDiv.show();
		
		$('#paragraphMarkEntityList .btnShowAdvantage').hide();
		$('#paragraphMarkEntityList .zn_disadvantage_mark').addClass('green_line_mark');
		
		$.each(this.suggestionIdList, function(idx2, v2) {
			
			var suggestion = findSuggestionById(this, evaluation.suggestions);
			
			if (!suggestion) {
				return;
			}
			
			var $paragraphMarkTemplateDiv = $paragraphMarkTemplate.clone().removeClass('paragraphMarkTemplate').addClass('paragraphMark');
			
			$paragraphMarkTemplateDiv.find('.markNo').text(idx2 + 1);
			if (suggestion.markNo) {
				$paragraphMarkTemplateDiv.find('.markRefNo').html(suggestion.markNo);
			} else {
				$paragraphMarkTemplateDiv.find('.markRefNo').hide();
			}
			$paragraphMarkTemplateDiv.find('.markTips').text(suggestion.tips);
			$paragraphMarkTemplateDiv.find('.markDetail').html(suggestion.detail);
			$paragraphTemplateDiv.find('.paragraphMarkList').append($paragraphMarkTemplateDiv);
			$paragraphMarkTemplateDiv.show();
			
		});
		
	});
	
	// Tab3 data
	
	var $enhanceTemplate = $('.enhanceTemplate');
	
	var $enhanceDiv = $('#section3');
	$('.enhanceDiv').remove();
	
	$.each(evaluation.enhances, function() {
		var $enhanceTemplateDiv = $enhanceTemplate.clone().removeClass('enhanceTemplate').addClass('enhanceDiv');
		$enhanceTemplateDiv.find('.enhance').html('<span>' + this.tips + '</span>');
		
		var $zn_tips = $('<div class="zn_tips">' + this.detail + '</div>');
		
		$zn_tips.find('.pronounceMediaIcon').html('<img src="/pv1/image/alert.svg" alt="" title="" width="32" height="32" />');
		
		$enhanceTemplateDiv.find('.reference').html($zn_tips);
		$enhanceDiv.append($enhanceTemplateDiv);
		$enhanceTemplateDiv.show();
	});

	//添加提升建议Tip
	if(evaluation.score <= 60){
		$("#adviceTip").text("根据系统全面诊断，作文在很多方面还需多加斟酌，我们给出下面的指导建议，希望你的文章更能打动读者的心。");
	}else if(evaluation.score > 60 && evaluation.score <= 70){
		$("#adviceTip").text("根据系统智能评测，你的文章可试着参照下面的写作技巧进行修改提升，让读者印象更深刻。");
	}else if(evaluation.score > 70 && evaluation.score <= 85){
		$("#adviceTip").text("根据系统智能分析，愿下面的写作指导能给你一些启示，助你的作文“更上一层楼。");
	}else if(evaluation.score > 85){
		$("#adviceTip").text("根据系统综合评价，你的文章已然精彩！下面的写作技巧谨供参考，愿你智慧的光芒更加夺目。");
	}

	// history
	var $historyScoreTemplate = $('.historyScoreTemplate');
	
	var $historyScoreList = $('#crList1');
	$('.historyScoreDiv').remove();
	
	$.each(evaluationScoreHistoryList, function() {
		var $historyScoreTemplateDiv = $historyScoreTemplate.clone().removeClass('historyScoreTemplate').addClass('historyScoreDiv');
		$historyScoreTemplateDiv.find('.historyNo').text(this.no);
		$historyScoreTemplateDiv.find('.historyScore').text(this.score);
		$historyScoreTemplateDiv.find('.historyTime').text(this.time);
		$historyScoreList.append($historyScoreTemplateDiv);
		$historyScoreTemplateDiv.show();
	});
	
	// set last history score circle to colorful
	$('.historyScoreDiv:first').find('.historyNo').css({
		background: 'rgb(74, 176, 254)'
	});
	
	var $ideationCard = $('#ideationCard');
	
	if (evaluation.ideation) {
		$ideationCard.find('.question').html('<font class="left"></font><font class="right"></font>' + evaluation.ideation.question);
		$ideationCard.find('.answer').html(evaluation.ideation.answer);
		$ideationCard.show();
	} else {
		$ideationCard.hide();
	}
	
	setScreenHeight();
	showPrompt();

}


function showPrompt(){
	setTimeout(function(){
		$("#table_anno span.mark_mac font").fadeOut().remove();
	},5000);//提示5秒后自动消失
}

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
}

// progress dialog

function step1() {

	var $overComment = $('#overComment');

	$('#indicatorContainer').data('radialIndicator').value(0);

	$('#progressDlg').show();
	
	var clientWidth = document.documentElement.clientWidth;
    var clientHeight = $topReferenceObject.offset().top;
    var objWidth = 500;
    var objHeight = 140;
    var x = ( clientWidth - objWidth ) / 2;
    var y = clientHeight;
	
	layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		area: ['500px', '140px'],
		shade: 0.2,
		moveType: 1,
		offset: [ y + 'px', x + 'px'],
		content: $('#progressDlg')
	});
	

	$('#progressMessage').text('作文预处理完成');
	$('#indicatorContainer').data('radialIndicator').animate(13);
	setTimeout("step2()", 200);
}

function step2() {
	$('#progressMessage').text('作文分词完成');
	$('#indicatorContainer').data('radialIndicator').animate(20);
	setTimeout("step3()", 200);
}

function step3() {
	$('#progressMessage').text('作文关键词提取完成');
	$('#indicatorContainer').data('radialIndicator').animate(31);
	setTimeout("step4()", 200);
}

function step4() {
	$('#progressMessage').text('汉字复杂度评定完成');
	$('#indicatorContainer').data('radialIndicator').animate(43);
	setTimeout("step5()", 200);
}

function step5() {
	$('#progressMessage').text('词语复杂度评定完成');
	$('#indicatorContainer').data('radialIndicator').animate(51);
	setTimeout("step6()", 200);
}

function step6() {
	$('#progressMessage').text('篇章难易度评定完成');
	$('#indicatorContainer').data('radialIndicator').animate(72);
	setTimeout("step7()", 200);
}

function step7() {
	$('#progressMessage').text('结构流利度评定完成');
	$('#indicatorContainer').data('radialIndicator').animate(84);
	setTimeout("step8()", 200);
}

function step8() {
	$('#progressMessage').text('文题符合度评定完成');
	$('#indicatorContainer').data('radialIndicator').animate(90);
}

function step9() {
	$('#indicatorContainer').data('radialIndicator').animate(100);
	$('#progressMessage').text('总体评语完成');

	layer.closeAll();

	$('#progressDlg').hide();
	
	setTimeout("$('#progressDlg').hide();", 500);
	
	showData(evaluation, evaluationScoreHistoryList, promotion);

}
