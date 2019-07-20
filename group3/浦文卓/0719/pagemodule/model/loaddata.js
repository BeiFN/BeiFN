export default {
    init : function(){
        let url = "http://localhost/zc";
        let data = {
            pageSize : 20,
            contentId : (""+new Date().getTime()).slice(6) ,
            day : new Date().toISOString().slice(0,10)
        }
        let res = $.ajax({
            url : url,
            data : data,
            datatype : "json"
        })
        return res;
        // this.cutPage(res);
    }
}