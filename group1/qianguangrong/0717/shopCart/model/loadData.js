//加载数据

//在loadDatajs之中开发模块需要使用jquery,
// 这个时候我们需要在编程之前的依赖之中引入jquery;
define(["jquery" , "config"], function($ ,config) {
    'use strict';
    
    //加载数据是行为，而模块只负责定义行为，不负责行为
    //需要将  加载数据 => 加载数据的封装

    //业务型模块

    return {
        init : function(){
            // var url = "./data.json";//因为请求数据向index.html请求，所以当前路径在index.html
            // return $.ajax(url);

            return $.ajax("./Data.json");
        }
    }
});
