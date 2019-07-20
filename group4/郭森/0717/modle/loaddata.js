define([
    'jquery',
], function ($) {
    'use strict';
    return {
        init: function () {
            var url = "http://localhost/pxx",
                data = {
                    subject_id: 5581,
                    page: 1,
                    size: 60
                }
            return $.ajax(url, {data:data});
        }
    }
});