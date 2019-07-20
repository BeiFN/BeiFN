define(["jquery", "./render", "./loaddata", "./cart"], function($, render, loaddata, cart){
    'use strict';
    //商品列表外包围
    var $productList = $(".item-list");
    //所有商品
    
    
    var def = loaddata.init();
    var cache = null;
    def.then(function(res){
        //得到页面中所有商品
        cache = res.data.esProducts;
        // console.log(cache);
        //渲染页面
        var html = render.init(cache);
        // console.log(html);
        $productList.html(html);
        var $product_item = $(".item");
        // console.log($product_item);
        $product_item.on("mouseenter", $.proxy(function(){
        // console.log($(this));
        // console.log(111);
        //加入购物车按钮
        var $addCart = $(this).children(".item-cart");
        // console.log($addCart);
        $addCart.css({
            display : "block"
        })

        
    }))

        //鼠标移出，按钮消失
        $product_item.on("mouseleave", $.proxy(function(){
            // console.log($(this));
            // console.log(111);
            //加入购物车按钮
            var $addCart = $(this).children(".item-cart");
            // console.log($addCart);
            $addCart.css({
                display : "none"
            })
        }))


        //渲染接受后加入购物车
        cart.init();
    });
    
})