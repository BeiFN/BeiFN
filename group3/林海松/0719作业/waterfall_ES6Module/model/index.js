//业务逻辑处理模块
import loaddata from "./loaddata.js";
import render from "./render.js";
import splice from "./splice.js";
import onChangeWindowSize from "./onChangeWindowSize.js";
export default function(){
    var wrapper   = $(".wrapper")[0];
    var container = $(".container")[0];
    var timer     = null ;
    var count     = onChangeWindowSize(container);
    loaddata()
    .done(function(res){
        var html = render().init(res.data.object_list);
        wrapper.innerHTML = html ;
        splice().init(wrapper , container , count)
    })
    
    $(window).on("resize",function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            var count = onChangeWindowSize(container);
            splice().init(wrapper , container , count);
        },300)
    })
}