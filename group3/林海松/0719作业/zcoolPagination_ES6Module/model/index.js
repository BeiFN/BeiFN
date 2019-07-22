import render from "./render.js";
import loaddata from "./loaddata.js";
import cutting from "./cutting.js";
import toIndex from "./toIndex.js";
import renderBtn from "./renderBtn.js";

export default function(){
    //业务逻辑处理
    //1、图片渲染  2、按钮渲染  3、数据分组  4、数据加载
    'use strict';
    var Pagination = $(".pagination");
    var img_list   = $(".img-list");
    var pageNo     = 1;
    var showNo     = 5;
    var cache      = null;
    var total      = null;
    loaddata()
    .done(function(res){
        cache    = res.data.contents; 
        total    = cache.length;
        var r    = cutting().init( showNo , pageNo , res.data.contents);
        var html = render().init(r);
        img_list.html(html);
        var html_1 = renderBtn().init(total , showNo , pageNo);
        Pagination.html(html_1);
    });
    $(Pagination).on("click","span", $.proxy(function(evt){
        var e = evt || window.event ;
        var target = e.target || e.srcElement ;
        pageNo = toIndex($(target).index());
        var r  = cutting().init( showNo , pageNo , cache);
        img_list.html(render().init(r));
        var html = renderBtn().init(total , showNo , pageNo);
        Pagination.html(html);

    },this))
}