// ES6实现购物车功能
// define(["jquery" , "./render","./loaddata","./carts"], function( $ , render , loaddata ,carts) {
//       'use strict';
import render from "./render.js";
import loaddata from "./loaddata.js";
import carts from "./carts.js";

export default function(){
      // 业务实现;
      var $goods_ele    = $(".goods-list .row");
      var btn_carts     = $(".btn-carts");
      var title         = $(".content-title")
      var btn_goodslist = $(".btn-goodslist");
      var cache = null;
      var def = loaddata.init();
      def.then(function(res){
            cache = res.goods_list;
            var html = render.init(res.goods_list,"goods_list");
            $goods_ele.html(html);
            // 页面渲染结束后,调用carts;
            carts.init();
      })
      // 选择元素;


      btn_carts.on("click" , function(){
            $(this).addClass("active")
            .siblings()
            .removeClass("active");
            renderCartList()
      })

      function renderCartList(){
            var html = render.init(cache,"carts_list");
            $goods_ele.html(html);
            title.html("购物车");
      }

      btn_goodslist.on("click" , function(){
            $(this).addClass("active")
            .siblings()
            .removeClass("active");
            var html = render.init(cache,"goods_list");
            $goods_ele.html(html);
            title.html("商品列表");
      })
      console.log(carts);

      carts.add(renderCartList,"changeNum");

}