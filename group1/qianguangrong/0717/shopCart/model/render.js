//渲染页面
// console.log($); //Uncaught ReferenceError: $ is not defined


//在renderjs之中开发模块需要使用jquery,
// 这个时候我们需要在编程之前的依赖之中引入jquery; 
define(["jquery"], function(require, factory) {//依赖前置;模块定义前 引入依赖
    'use strict';
    // console.log($); //可以了
    
});