/*
 * 
 * 
 */

 function getParams(){
 	var href = window.location.href;
	var str_params = href.split("?")[1];
	if(!str_params) return {};
	var params = {};
	var strs_param = str_params.split("&");
	for(i=0;i<strs_param.length;i++){
		params[strs_param[i].split("=")[0]] = strs_param[i].split("=")[1];
	}
	return params;
}