define([
    'jquery',
    'config',
    './loaddata',
    './render',
    './carts'
], function ($, config, loaddata, render, carts) {
    'use strict';
    //将所有的关系在这里进行耦合
    var row = $(".goods-list .row")
    var goodListBtn = $(".btn-goodslist")
    var cartListBtn = $(".btn-carts")
    // var navBar = $(".navbar-nav")
    var contentTitle = $(".content-title")

    //用全局变量存储加载的数据
    var cache = null;
    //加载好了数据
    let res = loaddata;
    res.then(function (res) {
        // console.log(res) //请求到了数据之后渲染页面
        res = JSON.parse(res)
        var html = (render.init(res.goods_list, "goods_list"))
        cache = res.goods_list;
        row.html(html)
        //加载完数据之后加入购物车的功能 因为购物车的按钮是在页面渲染中出来的
        carts.init();
    })
    //1、点击购物车按钮和商品列表实现不同的页面渲染
    goodListBtn.on("click", function () {
        //使用实例调用他的方法addClass
        $(this).addClass("active").siblings().removeClass("active");
        var html = (render.init(cache, "goods_list"))
        row.html(html)
        contentTitle.html("商品列表")
    })

    //2、点击购物车按钮
    cartListBtn.on("click", function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active")
        renderCartList()
    })
    //购物车渲染
    function renderCartList() {
        var html = (render.init(cache, "cart_list"))
        row.html(html)
        contentTitle.html("购物车")
    }

    //2、点击加入购物车的实现  放到cartjs中实现 
    carts.add(renderCartList, "changeNum");

});