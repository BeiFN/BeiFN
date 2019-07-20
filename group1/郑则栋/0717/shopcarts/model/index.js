
//总控制

define([
    'jquery',
    './loaddate',
    './render',
    './carts'
], function ($, loaddate, render, carts) {
    'use strict';
    var list = loaddate.init();
    list.then(function (res) {
        var html = render.init(JSON.parse(res).goods_list, 'goods_list');
        $('.row').html(html);
        carts.init();
        carts.changeCart();
                // carts.init();
        $('.btn-goodslist').on('click',function(){
            $(this).addClass('active').
            siblings().
            removeClass('active');
            $('.row').html(html);
            $('.content-title').html("商品列表");

        });
        $('.btn-carts').on('click',function(){
            $(this).addClass('active').
            siblings().
            removeClass('active');
            // changeH();
            renderCarts();
        });
        function renderCarts(){
            var cart = render.init(JSON.parse(res).goods_list, 'carts_list');
            
            $('.row').html(cart);
            // $('.content-title').html("购物车");
        }
        carts.add(renderCarts);

    });

    // function a(){
    //     console.log(1);
    // }
    // function getCarts(){
    //     var carts=JSON.parse(localStorage.getItem('carts'));

    // }

});