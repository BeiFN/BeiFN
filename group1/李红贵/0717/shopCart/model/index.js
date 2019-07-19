// 依赖前置，用参数返回代表 每个前置模块对应的实例对象
define(["jquery" , "./render","./loaddata","./carts"], function( $ , render , loaddata ,carts) {
      'use strict';
      // 业务实现;

      // 获取元素
      var $goods_ele    = $(".goods-list .row");
      var btn_carts     = $(".btn-carts");
      var title         = $(".content-title")
      var btn_goodslist = $(".btn-goodslist");
      var cache = null;
      var def = loaddata.init();
      def.then(function(res){
            console.log(res);
            console.log(typeof res);
            res = JSON.parse(res);
            cache = res.goods_list;
            console.log(cache,res.goods_list);

            // 请求到的数据传入渲染方法
            var html = render.init(res.goods_list,"goods_list");
            $goods_ele.html(html);
            // 页面渲染结束后,调用购物车;
            carts.init();
      })
      
      // 点击选择购物车，切换商品列表显示
      btn_carts.on("click" , function(){
            console.log(1);
            $(this).addClass("active")
            .siblings()//所有兄弟移出active属性
            .removeClass("active");
            renderCartList();//渲染购物传
      })

      function renderCartList(){
            // 渲染购物车
            var html = render.init(cache,"carts_list");
            $goods_ele.html(html);
            
            title.html("购物车");
      }

      // 点击返回商品列表
      btn_goodslist.on("click" , function(){
            $(this).addClass("active")
            .siblings()
            .removeClass("active");
            var html = render.init(cache,"goods_list");
            $goods_ele.html(html);
            title.html("商品列表");
      })
      console.log(carts);

      // 添加监听，传入需要添加给实例对象的回调方法
      carts.add(renderCartList,"changeNum");

});