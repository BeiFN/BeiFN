define([
    'jquery',
    './loadData',
    './render'
], function($,loadData,render) {
    'use strict';
    var cache=null;
    var pageNum=1;
    var showNum=5;
    var imgList=$(".img-list");
    var pagination=$(".pagination");
    var def=loadData.init();
    def.then(function(res){
        cache=res.data.contents;
        rerender();
    });
    $(pagination).on("click","span",function(evt){
        var e=evt||window.event;
        var target=e.target;
        var index=$(target).index()+1;
        pageNum=index;
        rerender();
    });
    function rerender(){
        var imgHtml=render.init(cache,pageNum,showNum,"img");
        var btnHtml=render.init(cache,pageNum,showNum,"btn");
        $(imgList).html(imgHtml);
        btnHtml?$(pagination).html(btnHtml):"";
    }
});
