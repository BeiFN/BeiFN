define(["jquery" , "./render" , "./loaddata" , "./carts"]
                ,function($ , render , loaddata , carts){
                'use strict';

                //实现业务
                var $goods_ele    = $(".goods-list .row");
                var btn_carts     = $(".btn-carts");
                var title         = $(".content-title");
                var btn_goodslist = $(".btn-goodslist");
                var cache = null;
                var def = loaddata.init();
                def.then(function(res){
                    // console.log(res)
                    JSON.parse(res);
                    cache = res.goods_list;
                    var html = render.init(res.goods_list, "goods_list");
                    $goods_ele.html(html);
                    carts.init();
                })

                //选择元素
                btn_carts.on("click" , function(){
                    $(this).addClass("active")
                    .siblings()
                    .removeClass("active");
                    renderCartList()
                })
                //渲染购物车
                function renderCartList(){
                    var html = render.init(cache , "carts_list");
                    $goods_ele.html(html);
                    title.html("商品列表");
                }
                //
                btn_goodslist.on("click" , function(){
                    $(this).addClass("active")
                    .siblings()
                    .removeClass("active");
                    var html = render.init(cache , "good_list");
                    $goods_ele.html(html);
                    title.html("商品列表");
                })

                console.log(carts);

                carts.add(renderCartList , "changeNum");
});