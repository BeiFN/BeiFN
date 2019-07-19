define(["jquery","config"], function($,config) {
    'use strict';
    return {
        init : function(){
            var url = config.ajaxUrl;
            return $.ajax(url);
        }
    }
});