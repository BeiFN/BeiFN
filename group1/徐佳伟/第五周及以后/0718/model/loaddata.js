define(["jquery","config"], function($,config) {
    'use strict';
    //通过函数封装一下
    return {
        init : function(){
            return $.ajax(config.ajaxUrl.goods)
        }
    }
});