//加载数据   加载数据并非对数据进行处理
define(["jquery","config"], function($,config) {
    // 'use strict';
    return {
        init : function(){
            return $.ajax(config.ajaxUrl.goods);
        }
    }
});