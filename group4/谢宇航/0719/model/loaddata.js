import config from "../config/config.js";

export default {
        init: function () {
            return $.ajax(config.ajaxurl.goods,{dataType:"json"});
        }
    }