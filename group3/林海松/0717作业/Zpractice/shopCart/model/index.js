//处理耦合关系模块 => 业务逻辑模块    操控各个功能模块
define(["jquery","./render","./loadMsg","./carts"], function($,render,loadMsg,carts) {  //提前引入前置对象
    'use strict';
    //业务实现
    var $good_ele = $(".goods-list .row");
    var btn_carts = $(".btn-carts");//购物车渲染按钮
    var btn_goodsList = $(".btn-goodslist");//商品渲染按钮
    var content_title = $(".content-title")//标题
    var cache     = null;
    var def = loadMsg.init();
    def.done(function(res){
        cache = res;
        var html  = render.init(JSON.parse(res).goods_list, "goods_list");
        //页面渲染结束之后，才能点击按钮
        $good_ele.html(html);
        carts.init();
    })
    //点击不同的按钮，页面重新渲染  两个html不同,数据的交互是通过localStorage
    //购物车
    btn_carts.on("click",function(){
        $(this).addClass("active")
        .siblings() //筛选同辈元素
        .removeClass("active"); // 除去class名  也就是背景颜色
        renderCartsList();
    })
    function renderCartsList(){
        var html = render.init( JSON.parse(cache).goods_list , "carts_list");
        $good_ele.html(html);
        content_title.html("购物车");
    }
    //商品
    btn_goodsList.on("click",function(){
        $(this).addClass("active")
        .siblings() //筛选同辈元素
        .removeClass("active"); //除去class名  也就是背景颜色
        var html  = render.init( JSON.parse(cache).goods_list , "goods_list");
        $good_ele.html(html);
        content_title.html("商品列表");
    })
    carts.add(renderCartsList,"changeNum");
});