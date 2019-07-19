define([
   "jquery",
   "config"
], function($,config) {
      'use strict';
      // 返回可加载数据的方法，让外部可调用获取数据
      return {
            init : function(){
                  return $.ajax(config.ajaxUrl.goods);
            }
      }
});