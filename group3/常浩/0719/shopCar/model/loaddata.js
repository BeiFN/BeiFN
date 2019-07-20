// define(["jquery","config"], function($,config) {
//     'use strict';
//     return{
        // init : function(){
        //     return $.ajax(config.ajaxUrl.goods,{
        //         dataType : "json"
        //     });
//         }
//     }
// });
import config from "../config/config.js";
export default {
    init : function(){
        return $.ajax(config.ajaxUrl.goods,{
            dataType : "json"
        });}
}