
define(["jquery","./render","./loaddata","./carts"], function($ ,render,loaddata,carts) {
    'use strict';
    //成功接入了jquery
    // console.log($);
    // render();
    // console.log(loaddata.init());
    var $goods_ele = $(".goods-list .row");
    var btn_carts = $(".btn-carts");
    var btn_goodslist = $(".btn-goodslist");
    var content_title = $(".content-title");
    //购物车的功能都在carts里边
    // var btn_reduce = $(".btn-reduce");
    var cache = null;
    var def = loaddata.init();
    def.then(function(res){
        //不知道怎么回事，我这里返回的数据是个字符串需要进行对象序列化
       cache = res = JSON.parse(res).goods_list ;
        //直到此时成功加载了数据
        //开始进行页面的渲染
        
        var html = render.init(res, "goods_list");       
        $goods_ele.html(html);
        //
        carts.init();
    })
    //初步渲染完成
    //下面渲染购物车carts

    btn_carts.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList();
    })

    function renderCartList(){
        var html = render.init(cache,"carts_list");
        $goods_ele.html(html);
        content_title.html("购物车");
    }

    btn_goodslist.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        var html = render.init(cache,"goods_list");
        $goods_ele.html(html);
        content_title.html("商品列表");
    })

    carts.add(renderCartList,"changeNum");


});