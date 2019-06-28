//----------------- 插件基本结构 ------------------
//1.将插件放在匿名函数之中，确保插件的各个变量不受其他插件的影响
;+function(window){
    function validate(){
        console.log("这是一个插件");
        console.log($);
    }
    function $(selector){
        var ele=null;
        return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
    }
    //2.局部变量 validate 赋值给 window ，让 validate 变量全局可访问
    window.validate=validate;
}(window)