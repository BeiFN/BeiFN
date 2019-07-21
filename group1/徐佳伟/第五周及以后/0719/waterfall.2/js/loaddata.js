function Load(){}
$.extend(Load.prototype , {
    init : function(start){
        let url = "http://localhost/dt";
        let data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "手工DIY",
            start : start
        };
        return $.ajax(url,{data : data , dataType : "json"});     
    }
    
})

export default new Load();