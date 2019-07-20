define(["jquery","./render","./loaddata","./carts"], function($,render,loaddata,carts) {
    'use strict';
    var good_ele = $(".goods-list .row");
    var content_title = $(".content-title");
    var btn_carts = $(".btn-carts");
    var btn_goodslist =$(".btn-goodslist");
    var add_cart = $(".add-cart");
    var cache = null;
    var def = loaddata.init();
    def.then(function(res){
        // console.log(res);
        cache = res.goods_list;
        var html = render.init(cache,"goods_list");
        // console.log(html);
        $(good_ele).html(html);

        carts.init();
        
        
    })
    //点击购物车切换页面
    btn_carts.on("click",function(){
        btn_carts.addClass("active")
        .siblings()
        .removeClass("active");  
        // content_title.html("购物车");  
        renderCartsList();    
    })
    function renderCartsList(){
        var html = render.init(cache,"carts_list");
        $(good_ele).html(html);
        $(content_title).html("购物车");
    }
    //点击商品列表切换页面
    btn_goodslist.on("click",function(){
        btn_goodslist.addClass("active")
        .siblings()
        .removeClass("active");        
        // $(content_title).html("商品列表");  
        renderGoodsList();    
    })
    function renderGoodsList(){
        var html = render.init(cache,"goods_list");
        $(good_ele).html(html);
        $(content_title).html("商品列表");
    }
    
    carts.add(renderCartsList,"changeNum");
});