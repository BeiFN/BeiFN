define(["jquery","./loadData","./render","./carts"], function($,loadData,render,carts) {
    'use strict';
    var $goods_ele    = $(".goods-list .row");
    var btn_carts     = $(".btn-carts");
    var title         = $(".content-title")
    var btn_goodslist = $(".btn-goodslist");
    var cace;
    var def=loadData.init();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    def.then(function(res){
        res=JSON.parse(res);
        cace=res.goods_list;
        var html=render.init(res.goods_list,"good-list");
        $goods_ele.html(html);
        carts.init();
    });
    btn_carts.on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
        title.html("购物车详情");
        renderCar();
    });
    btn_goodslist.on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
        title.html("商品列表");
        var html=render.init(cace,"good-list");
        $goods_ele.html(html);
    });
    function renderCar(){
        var html=render.init(cace,"cart-list");
        $goods_ele.html(html);
    }
    carts.add("changenum",renderCar);
});