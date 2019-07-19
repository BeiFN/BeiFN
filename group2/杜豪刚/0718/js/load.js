// load.js 加载数据
define(["jquery"],function(){
    // 需要用到jquery
    return {
        init:function(){
            var url = "../../0717/data/data.json" ;
            return $.ajax(url);
        }
    }
});
