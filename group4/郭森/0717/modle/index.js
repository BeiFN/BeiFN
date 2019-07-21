define([
    'jquery',
    "./loaddata"
], function($,loaddata) {
    'use strict';
    var dre=loaddata.init();
    dre.then(function(res){
        var arr=res.goods_list;
    })
    
    
});
