//处理耦合模块 => 业务逻辑模块

define(["jquery" , "./render" , "./loadData"], function($ , render , loadData) {
    'use strict';
    
    // console.log(loadData);  //{init: ƒ}
    
    var data = loadData.init();
    // data.then(function(res){
    //     console.log(res);
    // })
    

});