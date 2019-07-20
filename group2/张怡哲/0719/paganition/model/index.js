import loaddata from "./loaddata.js";
import render  from "./render.js";
import renderBtn from "./renderBtn.js";

export default function({
    list = "",
    page = "",
    getData = {
            url  : "",
            data : {}
    },
    template = "",
    pageNo = 1,
    showNo = 5    
}={}){
    // 'use strict';
    var list_wrapper = $(list);
    var page_wrapper = $(page);
    var pageNo       = pageNo;
    var showNo       = showNo;
    var url          = getData.url;
    var data         = getData.data;
    var template     = template;
    var def = loaddata.init(url , data);
    def.done(function(res){
        // console.log(res);
        var data = res.data.contents;
        var html = render.init(data , pageNo , showNo );
        list_wrapper.html(html);
        var btns = renderBtn.init(data , showNo , page_wrapper , pageNo);
        // console.log(btns);
        page_wrapper.html(btns);
    })

    $(page_wrapper).on("click" , "span" , function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;
        // console.log(target);

        $(target).addClass("active")
        .siblings()
        .removeClass("active");
        pageNo = $(target).index();
        var html = render.init(data , pageNo , showNo);
        list_wrapper.html(html);
    })


}