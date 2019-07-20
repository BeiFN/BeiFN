define([
    'jquery',
    "config"
], function ($, config) {
    'use strict';
    return function () {
        return $.ajax(config.ajaxUrl.goods);
    }

});