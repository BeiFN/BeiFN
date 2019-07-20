define([
    'jquery',
    './loaddata',
    './render',
    './carts'
], function($, loaddata,render,carts) {
    'use strict';
    var $goods_ele = $(".goods-list .row");
    var btn_carts  = $(".btn-carts");
    var btn_goodslist = $(".btn-goodslist");
    var title         = $(".content-title");
    var der=loaddata.init();
    var cache=null;      
    der.then(function(res){
        cache=res.goods_list;
        var html=render.init(cache,"goods_list");
        $goods_ele.html(html);
        carts.init();
    });
    btn_carts.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList();
    })
    function renderCartList(){
        var html=render.init(cache,"carts_list");
        $goods_ele.html(html);
        title.html("购物车")
    };
    btn_goodslist.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        var html=render.init(cache,"goods_list");
        $goods_ele.html(html);
        title.html("商品列表")
    })
    carts.add(renderCartList,"changeNum")
});