define([
    "jquery",
    "config"
], function($, config) {
    'use strict';
    return {
        init:function(){
            return $.ajax(config.url.pdd,{dataType:"json"});
        }
    };
    // return $.ajax(config.url.pdd,{dataType:"json"});
});