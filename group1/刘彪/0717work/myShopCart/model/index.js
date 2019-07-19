//处理耦合的模块,业务逻辑模块;
//引入渲染功能的模块 => render依赖jQuery;
//1.在业务逻辑模块之中引入jQuery =>不可靠
//2.依赖前置;在每个模块定义前务必引入需要的依赖;
define([ 'jquery', './render','./loaddata','./carts'], function($,render,loaddata,carts) {
    'use strict';
    //业务实现;
    var $good_ele = $(".goods-list .row");
    var btn_carts = $(".btn-carts");
    var title = $(".content-title");
    var btn_goodslist = $(".btn-goodslist");
    var cache = null;
    var def = loaddata.init();
    def.then(function(res){
        res = JSON.parse(res);
        // console.log(res);
        cache = res.goods_list;
        var html = render.init(res.goods_list,"good_list");
        // console.log(html);
        $good_ele.html(html);
        carts.init();
    })

    btn_carts.on("click",function(){
       
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList();
    })
    function renderCartList(){
        var html = render.init(cache,"carts_list");
        $good_ele.html(html);
        title.html("购物车");
    }
    btn_goodslist.on("click",function(){
     
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        var html = render.init(cache,"good_list");
        $good_ele.html(html);
        title.html("商品列表");
    })

    carts.add(renderCartList,"changeNum");

    
});