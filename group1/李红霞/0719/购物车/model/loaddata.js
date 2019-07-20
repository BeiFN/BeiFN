// 访问服务器获取数据的模块
define(["jquery","config"], function($,config) {
      'use strict';
      // 在各个功能模块中返回的应该是一个对象，对象中包括具有各种功能的函数对象，通过key值对函数进行访问
      return {
            init:function(){
                  return $.ajax({
                        url:config.jsonUrl.goods,
                        dataType:"json"
                  });
            }
      }
});