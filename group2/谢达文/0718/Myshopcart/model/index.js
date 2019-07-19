// 业务逻辑控制模块

define([
    'jquery',
    './loaddata',
    './render',
    './cars'
], function($,loaddata,render,cars) {
    'use strict';
    // console.log(render);
    // console.log($);
   var  goods_ele  = $(".goods-list .row");
   var  btns_goodslist  = $(".btn-goodslist");
   var  title         = $(".content-title")
   var  btns_carts = $(".btn-carts"); 
   var cache       = null;
   var def = loaddata.init();
   def.then(function(res){
    cache = res.goods_list;
    var html = render.init(res.goods_list,"goods_list");
    goods_ele.html(html);
    cars.init();
   })

   btns_carts.on("click",function(){
       $(this).addClass("active")
       .siblings()
       .removeClass("active");
       var html = render.init(cache,"carts_list");
    //    console.log(html);
       goods_ele.html(html);
       title.html("购物车");
   })
   
   btns_goodslist.on("click",function(){
       $(this).addClass("active")
       .siblings()
       .removeClass("active");
       title.html("商品列表");
       var html = render.init(cache,"goods_list");
       goods_ele.html(html);
   })
});