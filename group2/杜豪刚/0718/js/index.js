// index.js 处理耦合关系
define(["jquery","./load","./render","./carts"],function($,load,render,carts){
    // 获取元素
    var goods_list    = $(".goods-list .row");
    var btn_carts     = $(".btn-carts");
    var title         = $(".content-title")
    var btn_goodslist = $(".btn-goodslist");
    var sum           = $(".sum");
    // console.log($);
    // console.log(load.init().then(function(res){console.log(res)}));
    var res = load.init();
    res.then(function(res){
        // console.log(res);
        temp = JSON.parse(res).goods_list; 
        var html  = render.init(JSON.parse(res).goods_list,"goods_list");
        // console.log(html)
        goods_list.html(html);
        // render.init(res,"carts_list")
        carts.init();
    });

    // 选择改变到购物车列表
    btn_carts.on("click",function(){
        $(this).addClass("active")
            .siblings()
            .removeClass("active");
            renderPage();
       
    });

    // 渲染购物车列表
    function renderPage(){
        var html = render.init(temp,"carts_list");
        // console.log(html);
        goods_list.html(html);
        title.html("购物车列表");
    }
    
    // 选择改变到商品列表
    btn_goodslist.on("click",function(){
        $(this).addClass("active")
            .siblings()
            .removeClass("active");
            var html = render.init(temp,"goods_list");
            goods_list.html(html);
            title.html("商品列表")
            // console.log(html);
    });

    // 观察者模式，调用carts的add接口，渲染页面
    carts.add(renderPage,"temp");

})