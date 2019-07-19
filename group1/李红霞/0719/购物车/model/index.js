// 在index.js处理各个模块之间的耦合关系
// 面向对象实现购物车  1.加载数据 2.页面渲染
// jquire处理的异步调用之间顺序
// define第一个参数为地址的数组，第二个参数为回调函数，当加载完各个模块之后进行调用
// 第一个地址数组中填写之后就相当于直接加载了
define(['jquery',"./loaddata", "./render","./cart"], function($,loaddata,render,cart) {
      'use strict';
      // 数据获取后放在全局变量中，以便于渲染
      var datares = null
      // 在index.js处理耦合的js模块中，首先渲染首页，将从后端后去到的界面渲染到首页
      loaddata.init()
      .then(function(res){
            datares = res;
            var html = render.init(res,"goods");
            $(".row").html(html);
            cart.init();
      })
      $(".btn-goodslist").click(function(){
            $(".btn-carts").removeClass("active");
            $(this).addClass("active")
            var html = render.init(datares,"goods");
            $(".row").html(html);
      })
      $(".btn-carts").click(function(){
            $(".btn-goodslist").removeClass("active");
            $(this).addClass("active")
            var html = render.init(datares,"cart");
            $(".row").html(html);
      })
      $(".cart-num").html(cart.cartCount());

});
