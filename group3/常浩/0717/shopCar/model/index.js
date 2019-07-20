// 处理耦合
define(["jquery","./loaddata" ,"./render","./carts"], function($ , loaddata,render,carts) {
    'use strict';
    // 1、 引入依赖 jquery
    // 2、 先获取数据  引入loaddata
    // 3、 渲染页面
    var $goods_ele = $(".goods-list .row");
    var btn_carts = $(".btn-carts");
    var title    = $(".content-title")
    var btn_goodslist = $(".btn-goodslist");
    var def = loaddata.init();
    var cache = null;
    def.then(function(res){
        cache = res.goods_list;
        var html = render.init(res.goods_list, "goods_list");
        //放入页面
        console.log($goods_ele);
        $goods_ele.html(html);
        // 点击加入购物车
        carts.init();
    })

    //当点击购物车的时候 我们需要重新渲染一下页面  渲染购物车页面；
    // 选定元素
    // 当点击 购物车三个字的时候 我们需要先切换器样式
    btn_carts.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList()
    })
    // 当点击商品列表的时候  我们需要切换样式并重新渲染页面
    btn_goodslist.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        var html = render.init(cache,"goods_list");
        $goods_ele.html(html);
        title.html("商品列表");
    })
    function renderCartList(){
        var html = render.init(cache , "carts_list");
        $goods_ele.html(html);
        title.html("购物车");
    }

    // 观察者模式 监视数据的变化
    carts.add( renderCartList,"changeNum" );
});