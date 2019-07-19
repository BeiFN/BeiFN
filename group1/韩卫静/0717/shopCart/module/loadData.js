define(["jquery"],function($){
	
	return {
		init : function(){
			return $.ajax("./data/data.json");
		}
	}
})
