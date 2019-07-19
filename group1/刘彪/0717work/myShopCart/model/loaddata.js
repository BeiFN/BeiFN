define([
    'jquery',
    'config'
], function($, config) {
    'use strict';
    //加载数据 =>加载数据的封装;
    //1.复用型模块;
    // 2.业务行模块;
    //模块不负责执行行为,只负责定义行为;
    return{
        init : function(){
            var res = $.ajax(config.ajaxUrl.goods);
            return res;
        }
    }
    
});