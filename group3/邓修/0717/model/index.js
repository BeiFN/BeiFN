define([
    "jquery",
    "./load-data.js",
    "./render.js",
    "./cart.js"
], function ($, loadData, render, cart) {
    'use strict';
    //元素选择及变量定义
    var goods_ele = $(".goods-list .row");
    var btn_goodslist = $(".btn-goodslist");
    var btn_cart = $(".btn-carts");
    var title = $(".content-title");
    var cache = null;
    loadData.init().then(function (res) {
        // console.log(res);
        cache = res.goods_list;//缓存加载的商品数据
        // console.log(cache);
        var html = render.init(cache, "goods_list");//获取渲染页面所需的字符串
        // console.log(html);
        goods_ele.html(html);//渲染页面
        cart.init();//购物车功能实现
    });
    btn_cart.on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        renderCartList();
    });
    btn_goodslist.on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
        var html=render.init(cache,"goods_list");
        goods_ele.html(html);
        title.html("商品列表");
    });
    cart.addOutterFunction(renderCartList,"againRenderCart");//添加订阅,当购物车需要渲染时调用
    function renderCartList() {//渲染购物车列表
        var html = render.init(cache, "cart_list");
        goods_ele.html(html);
        title.html("购物车");
    }
});