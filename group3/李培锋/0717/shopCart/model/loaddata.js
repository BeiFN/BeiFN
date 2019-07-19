define([
    "jquery",
    "config"
 ], function($,config) {
       'use strict';
       // 加载数据! 
       return {
             init : function(){
                   return $.ajax(config.ajaxUrl.goods);
             }
       }
 });