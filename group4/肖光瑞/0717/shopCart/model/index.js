//处理耦合
//引入渲染功能模块
//
define([
    "jquery",
    "./render",
    "./loaddata",
    "./carts"
], function ($, render, loaddata, carts) {
    'use strict';

    var $goods_ele = $(".goods-list .row");
    var btn_carts = $(".btn-carts");
    var btn_goodslist = $(".btn-goodslist");
    var cache = null;
    var title = $(".content-title")

    var def = loaddata.init();
    def.then(function (res) {
        cache = res.goods_list;
        var html = render.init(res.goods_list, "goods_list");
        $goods_ele.html(html);
        carts.init();
    })

    btn_carts.on("click", function () {
        $(this).addClass("active")
            .siblings()
            .removeClass("active")
        renderCartlist()
    })

    function renderCartlist() {
        var html = render.init(cache, "carts_list");
        $goods_ele.html(html);
        title.html("购物车")

    }
    btn_goodslist.on("click", function () {
        $(this).addClass("active")
            .siblings()
            .removeClass("active")
        var html = render.init(cache, "goods_list");
        $goods_ele.html(html);
        title.html("商品列表")
    })

    carts.add(renderCartlist, "changeNum");
});