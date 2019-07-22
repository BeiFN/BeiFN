define(["jquery","./render","./loaddata","./carts"], function($, render,loaddata,carts) {
    'use strict';
    // console.log($);
    //首先要实现数据的加载
    //路径是根据index.html进行设置的
    // var data = $.ajax("../.././0717/shopCart/data/data.json")
    // data.then(function(res){
    //     console.log(res);
    // })  
    var $stores_list = $(".goods-list .row");


    var def = loaddata.init();
    def.then(function(data){
        data = JSON.parse(data).goods_list;
        console.log(data);
        //已经成功获取到了数据对象 开始渲染页面
        var html = render.init(data , "goods_list");
        $stores_list.html(html);
        
        carts.init();
    })


});