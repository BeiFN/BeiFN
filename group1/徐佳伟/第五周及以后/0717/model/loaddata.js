define(["jquery","config"], function($,config) {
    'use strict';
    // function loaddata(){}
    // $.extend(this.loaddata,{
    //     init : function(){

    //     }

    // })

    //只负责数据的加载 
    //因为模块不负责执行行为，只负责定义行为
    return {
        init : function(){
            // console.log(config);
            return  $.ajax(config.ajaxUrl.goods)
            
            // return s;
        }
    }
});