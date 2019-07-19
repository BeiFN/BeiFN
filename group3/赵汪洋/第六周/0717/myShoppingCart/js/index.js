define([
    'jquery',
    './render',
    './loaddata.js',
    './carts'
], function ($, render, loaddata, carts) {
    'use strict';
    var $goods_ele = $(".goods-list .row");
    var def = loaddata();
    def.done(function (res) {
        // console.log(res, JSON.parse(res), typeof res);
        var html = render.init(JSON.parse(res).goods_list, "goods_list");
        // console.log(html);
        $goods_ele.html(html);
        // console.dir($goods_ele);
        carts.init();
    })
});