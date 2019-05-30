var conpare_input_into_right = false
var compare_right_data=''
var compare_left_data=''
var compare_contentLeft=''
var compare_contentRight=''
var compare_versionLeft=null
var compare_versionRight=null
var compare_title_left = ''
var compare_title_right = ''
/**
 *
 * @param {*} type cr tr
 * @param {*} index 数据列表顺序
 * @param {*} errorType teacher machine
 * @param {*} reversion 机评版本号版本号
 * @param {*} number 页面显示序号
 *
 */
function compareData(e, type, index, errorType, reversion, number){
    if(!e.style.background){
        if($('a[style="background: rgb(126, 211, 33);"]').length<2){
            e.style.background='#7ED321'
        }else{
            $('.jp4-reset').css('background','');
            e.style.background='#7ED321'
            conpare_input_into_right = false
            compare_right_data=''
            compare_left_data=''
            compare_contentLeft=''
            compare_contentRight=''
            compare_versionLeft=null
            compare_versionRight=null
            compare_title_left = ''
            compare_title_right = ''
        }
    }else{
        $('.jp4-reset').css('background','');
        conpare_input_into_right = false
        compare_right_data=''
        compare_left_data=''
        compare_contentLeft=''
        compare_contentRight=''
        compare_versionLeft=null
        compare_versionRight=null
        compare_title_left = ''
        compare_title_right = ''
        return
    }

    var data = null;
    if(type=='cr'){
        data = pageInitData.crList[index]
    }else{
        data = pageInitData.trList[index]
    }
    if(conpare_input_into_right){
        compare_right_data = data
        compare_versionRight = number
        if(type=='cr'){
            compare_title_right = "机评历史"
        }else{
            compare_title_right = '师评历史'
        }
        conpare_input_into_right = false
    }else{
        compare_left_data = data
        compare_versionLeft = number
        if(type=='cr'){
            compare_title_left = "机评历史"
        }else{
            compare_title_left = '师评历史'
        }
        conpare_input_into_right = true
    }
    console.log(compare_right_data)
    console.log(compare_left_data)
    if(compare_right_data!=''&&compare_left_data!=''){
        compareDiff();
    }else{

    }
    $('#compare_LeftSpan').text(compare_title_left+compare_versionLeft);
    $('#compare_LeftSpan').attr('title',compare_title_left);
    $('#compare_LeftContent').html(compare_contentLeft);
    $('#compare_RightSpan').text(compare_title_right+compare_versionRight);
    $('#compare_RightSpan').attr('title',compare_title_right);
    $('#compare_RightContent').html(compare_contentRight);
    $("#compare-ModalLabel").html("历史对比")
    if(compare_right_data!=''&&compare_left_data!=''){
        $('#compare-Modal').modal('show')
    }

}

var dmp = new diff_match_patch();

function compareDiff() {
      var timeout=0;
      var editcost=4;

      dmp.Diff_Timeout = timeout;
      dmp.Diff_EditCost = editcost;

      var d = dmp.diff_main(compare_right_data.content, compare_left_data.content);

      var ds = dmp.diff_prettyHtml(d);

      ds = "<div style='height:10px'></div>"+ds;
      compare_contentLeft = ds ;

      var d2 = dmp.diff_main(compare_right_data.content, compare_right_data.content);

      var ds2 = dmp.diff_prettyHtml(d2);

      ds2 = "<div style='height:10px'></div>"+ds2;

      // compare_contentRight = ds2 ;
      compare_contentRight = ds2 ;
}