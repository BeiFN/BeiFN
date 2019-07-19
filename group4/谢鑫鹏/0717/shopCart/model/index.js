// 处理耦合的模块 => 业务逻辑模块
// 引入渲染功能模块 => render依赖jQuery
// 1. 在业务模块之中引入jQuery => 这样的引入不可靠；可能导致以来没有加载成功直接就执行了render代码，会导致报错；
// 2. 依赖前置；在每个模块定义前务必引入需要的依赖；
define([
  "jquery",
  "./render",
  "./loaddata",
  "./cart"
], function($, render, loaddata, cart) {
  'use strict';
  // console.log(loaddata);
  // 获取元素
  var goods_ele = $(".goods-list .row");
  var btn_goodslist = $(".btn-goodslist");
  var btn_carts = $(".btn-carts");
  var title = $(".content-title");
  var cache = null;
  var def = loaddata.init();
  def.then(function(res){
    // console.log(res);
    // console.log(render);
    // 将商品列表加入缓存
    cache = res.goods_list;
    // 渲染商品列表页
    var html = render.init(res.goods_list, "goods_list");
    // console.log(html);
    goods_ele.html(html);
    // 页面渲染结束之后，调用cart
    cart.init();
  })
  // 点击购物车按钮
  btn_carts.on("click", function(){
    $(this).addClass("active")
    .siblings().removeClass("active");
    renderCartList();
  })
  // 点击商品列表按钮
  btn_goodslist.on("click", function(){
    $(this).addClass("active")
    .siblings().removeClass("active");
    var html = render.init(cache, "goods_list");
    goods_ele.html(html);
    title.html("商品列表");
  })
  // 渲染购物车页
  function renderCartList(){
    var html = render.init(cache, "carts_list");
    goods_ele.html(html);
    title.html("购物车");
  }
  cart.add(renderCartList, "changeNum");
  // console.log(cart.add);
});