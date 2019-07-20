define(["jquery", "config"], function ($, config) {
    return {
        init: function () {
            return $.ajax(config.ajaxurl.goods)
        }
    }
})