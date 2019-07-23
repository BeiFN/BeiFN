// 处理耦合的模块;  => 业务逻辑模块;
// 引入渲染功能模块; => render依赖jQuery ; 
// 1. 在业务逻辑模块之中引入jQuery => 这样的引入不可靠;  可能导致依赖没有加载成功直接就执行了render代码，会导致报错;
// 2. 依赖前置; 在每个模块定义前务必引入需要的依赖; 
define(["jquery" , "./render","./loaddata","./carts"], function($,render,loaddata,carts) {
      var $goods_ele    = $(".goods-list .row");
      var def = loaddata.init();
      def.then(function(res){
            //console.log(res.goods_list)
            var html = render.init(res.goods_list,"goods_list");
            //console.log(html)
            $goods_ele.html(html)
            carts.init();
      })
});
