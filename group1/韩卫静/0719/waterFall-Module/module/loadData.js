export default {
	init : function(url,data){
		return $.ajax(url , {
			data : data,
			dataType : "json"
		});
	}
}