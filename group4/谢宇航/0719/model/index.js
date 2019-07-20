import render from "./render.js";
import loaddata from "./loaddata.js";
import carts from "./carts.js";



export default function () {
    'use strict';
    // 业务实现
    // 获取元素
    var cache = null;
    var $goods_ele = $(".goods-list .row");  // 商品列表
    var btn_carts = $(".btn-carts");     // 购物车按钮
    var title = $(".content-title");  // 
    var btn_goodslist = $(".btn-goodslist");  // 商品列表按钮
    // 加载json
    var data = loaddata.init();
    data.then(function (res) {
        cache = res.goods_list;
        var html = render.init(res.goods_list, "goods_list");
        $goods_ele.html(html);
        // 页面渲染结束后,调用carts;
        carts.init();
    })

    // 为商品列表和购物车模块添加点击事件
    btn_goodslist.click(function () {
        // 渲染商品列表页面，1.渲染商品列表，商品列表标题标题
        $(this).addClass("active").siblings().removeClass("active");
        var html = render.init(cache, "goods_list");
        title.html("购物车");
        $goods_ele.html(html);
    })

    btn_carts.on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        renderCartList();
    })

    function renderCartList() {
        // 渲染购物车页面，1.渲染购物车列表，购物车标题
        var html = render.init(cache, "carts_list");
        title.html("购物车");
        $goods_ele.html(html);
    }
    carts.add(renderCartList, "changeNum");
}