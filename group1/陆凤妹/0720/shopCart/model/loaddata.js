define([
          'jquery',
          'config'
         
], function($, config) {
          'use strict';

          // 加载数据  =》加载数据的封装
          // 1、复用型模块；
          // 2、业务型模块
          // 模块不负责执行行为，只负责定义行为
          

          return{
                    init : function(){
                              // 路径在哪？
                              // var url = "./data/data.json";
                              // return $.ajax(url);

                              return $.ajax(config.ajaxUrl.goods,{dataType:JSON});
                    }
          }
});