define([
    'jquery',               
    './render',
    './loaddata',
    './carts'
], function($, render , loaddata , carts) {
    'use strict';
    //选择元素;
    var $goods_ele    = $(".goods-list .row");
    var btn_carts     = $(".btn-carts");
    var title         = $(".content-title");
    var btn_goodslist = $(".btn-goodslist");

    //cache:电脑高速缓冲器;   缓冲数据;
    var cache = null;
    //获取数据
    var def   = loaddata.init();
    
    def.done(function(res){
        //取出数据;
        cache  = res.goods_list;
        var html = render.init(cache , "goods_list");
        $goods_ele.html(html);
        carts.init();
        // console.log(localStorage);
        // console.log(render.init(cache , "carts_list"));
    })

    btn_carts.on("click" , function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList();
    })

    function renderCartList(){
        var html = render.init(cache , "carts_list");
        // console.log(render.init(cache , "carts_list"));
        $goods_ele.html(html);
        title.html("购物车");
    }

    btn_goodslist.on("click" , function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList();
        var html = render.init(cache , "goods_list");
        $goods_ele.html(html);
        title.html("商品列表");
    })

    //添加一个发布者;
    carts.add(renderCartList , "changeNum");
});