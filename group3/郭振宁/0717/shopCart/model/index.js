define([
    'jquery',
    './render',
    './loadData',
    './carts'
], function($ , render , loadData , carts) {
    'use strict';
    //业务实现
    var $good_ele = $(".goods-list .row")
    var cache = null;
    var def = loadData.init();
    var btn_carts = $(".btn-carts");
    var btn_goodslist = $(".btn-goodslist");
    def.then(function(res) {
        res = JSON.parse(res);
        cache = res.goods_list;
        var html = render.init(res.goods_list , "goods_list");
        $good_ele.html(html);

        carts.init();
    })

    btn_carts.on("click" , function() {
        // console.log(1);
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList();   
    })

    function renderCartList() {
        var html = render.init(cache , "carts_list");
        $good_ele.html(html);
        $(".content-title").html("购物车");
    }

    btn_goodslist.on("click" , function() {
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        var html = render.init(cache , "goods_list");
        $good_ele.html(html);
        $(".content-title").html("商品列表");
    })

    carts.add(renderCartList , "changenum");
});