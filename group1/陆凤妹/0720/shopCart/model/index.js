// 处理耦合的模块  =》业务逻辑模块
// 引入渲染功能模块；=》render依赖jQuery

// 1、在业务逻辑模块之中引入jQuery = 》这样的引入不可靠；可能导致依赖没有加载成功加载成功直接就执行了render代码，会导致报错
// 2、依赖前置；在每个模块定义前务必引入需要的依赖
//       引入jquery         $是jquery返回的              $:jquery  render:render  loaddata:loaddata   他们都返回一个对象
define(["jquery","./render.js","./loaddata.js"], function($,render,loaddata) {
          // 数组里的两个模块是同步执行，会报错，需要在render.js中处理加载顺序
          'use strict';
          // 发起请求
       var def = loaddata.init();
//        请求到数据，进行页面渲染
       def.then(function(res){
                
                     //       console.log(res)
                     render.init(res.goodslist,"goods-list");
             
       })
//         console.log(loaddata);
          
});