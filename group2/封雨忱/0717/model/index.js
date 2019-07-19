define([
    'jquery',
    './loaddata',
    './render',
    './carts'
], function($, loaddata,render,carts) {
    'use strict';
    var $goods_ele = $(".goods-list .row");
    var der=loaddata.init();      
    der.then(function(res){
        var cache=res.goods_list;
        var html=render.init(cache,"goods_list");
        $goods_ele.html(html);
    })
});