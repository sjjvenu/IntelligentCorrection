var str_mb = {
	turn_comple:'切换到复杂批改模式',
	turn_simple:'切换到简单批改模式',
	mark_model:'标为范文',
	un_mark_model:'取消标为范文',
	no_type_change:'编辑模式，不支持错误标注类型的修改！',
	select_type_first:'请选择一个错误标记类型再填写批语！',
	edit_anno_cus:'批语编辑，直接选用｜从列表选择（后修改）｜自定义',
	select_type_:'请选择一个错误标类型后再操作！',
	input_anno_first:'请先输入批语后再操作！',
	input_sub:'请填写替换内容',
	input_ins_b:'请填写要前插的内容',
	input_ins_a:'请填写要后插的内容',
	input_sub_first:'请输入要替换的内容后再操作',
	input_ins_fisrt:'请输入要插入的内容后再操作',
	success_add_anno_comple:'成功添加一个复杂批语',
	post_to_db:'\t\t\t\t将如下数据POST给数据库\n',
	no_select_region:'无选区（可编辑区）选中，操作无效！-- 请拖选文字或批注前后的标记后再操作',
	success_add_anno_err:'成功添加一个新的错误批注！',
	success_add_anno_sub:'成功添加一个替换标注！',
	success_add_anno_del:'成功添加一个删除标注！',
	success_add_anno_ins_b:'成功前插数据！',
	success_add_anno_ins_a:'成功后插数据！',
	success_add_anno_eval:'成功添加一个句评！',
	success_update_anno:'成功更新所选标注的批语',
	success_transfer_anno:'成功转换一个机评批注为师评错误批注！',
	success_del_anno:'成功删除选中的标注！',
	success_del_anno_mac:'成功删除选中的机器标注！',
	success_del_anno_:'成功删除选中的',
	anno:'标注！',
	good:'优',
	bad:'差',
	question:'疑',
	good_:'写得很好',
	bad_:'写得很差',
	question_:'需要思考',
	endlink:'',
	ins_mark:'▼'
}
//	endlink:'¶',
var demoHtml = '960x720 <span class="tip" style="display:block;width:2px;padding:2px;color:#0022de;font-weight:bold;" data-toggle="tooltip" data-placement="top" title="插入的内容">▼</span>教师批改器页面最好弹出一个浮动div出来，占满全屏幕，并提供一个返回按钮style="min-height:300px;" 不用添加 ∨▼♥♠♣☎☺☻�';

function T(idx){
	return str_mb[idx];
}