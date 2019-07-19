//在index.js这个模块中，主要是处理耦合模块  = > 业务逻辑模块
//引入渲染功能模块；=>render依赖jQuery；
//1.我们要在业务逻辑模块中引入jQuery =>这样的引入不可靠；可能会导致有些依赖没有加载成功直接执行了render代码，会导致报错
//2.依赖前置：在每个模块定义前务必要引入需要的依赖；
define((["jquery","./render","./loaddata","./carts"]), function($,render,loaddata,carts) {
    'use strict';
    //业务实现；
    //元素定义
    var $goods_ele=$(".goods-list .row");
    var btn_carts=$(".btn-carts");
    var title = $(".content-title");
    var btn_goodslist = $(".btn-goodslist");
    var cache=null;//缓存为空
    //加载数据，返回的是一个请求数据的接口
    var def=loaddata.init();
    def.then(function(res){
        //将返回的结果缓存
        cache = res.goods_list;
        //渲染页面；根据返回的结果中的 来渲染
        //接收的参数是数据，还有类型是商品列表还是购物车里面的
        var html = render.init(res.goods_list,"goods_list");
        //在页面上显示
        $goods_ele.html(html);
        //页面渲染结束后，调用carts；
        carts.init();
    })

    //选择元素
    //头部商品列表或者购物车
    btn_carts.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        renderCartList();
    })

    //渲染购物车列表
    function renderCartList(){
        var html = render.init(cache,"carts_list");
        $goods_ele.html(html);
        title.html("购物车");
    }

    //点击商品列表
    btn_goodslist.on("click",function(){
        $(this).addClass("active")
        .siblings()
        .removeClass("active");
        var html = render.init(cache,"goods_list");
        $goods_ele.html(html);
        title.html("商品列表");

    })
    // console.log(carts);
    carts.add(renderCartList,"changeNum");

    
});