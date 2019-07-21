define(["jquery","config"], function($, config) {
    'use strict';
     return {
         init:function(){
            return  $.ajax(config.ajaxUrl.goods);
         }
     }
});