define([
    'jquery',
    'config'
], function($, config) {
    'use strict';
     let res = $.ajax(config.ajaxUrl.url)
     return res
});