import config from "./path.js";



export default {
        init : function(){
            // console.log(config);
            return  $.ajax(config.ajaxUrl.goods,{dataType:"json"})
            
            // return s;
        }
    }