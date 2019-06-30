//插件的基本结构
//要把插件放在匿名函数之中，这样可以确保插件的各个变量不受其他插件的影响
;+function(window){
    //策略列表
    var strategyList={
        "email":{
            reg:/^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password":{
            reg:/^[!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        },
        username:/[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
    }
    function validate(selector){
        //根据用户输入的选择器，来选相应的父级元素
        var parent=$(selector);
        //要根据父元素找到所有的input的输入框；
        var inputList=parent.querySelectorAll("input v-type");
        console.log("inputList");
        for(var i=0,input;input=inputList[i++];){
            input.addEventListener("blur",validateText.bind(input,input.getAttribute("v-type")));
        }
    }

    //验证函数；
function validateText(type){
    //要知道什么我们才能区分验证的不同；value也就是当前验证元素的值；
    var value=this.value;
    //接下来改验证了，但是怎么验证呢？这时就需要设计模式=>也就是策略模式，提前定制策略；在validate函数中设计策略列表
    if(strategyList[type].reg.test(value)){
        this.className+="success";
    }else{
        this.className+="error";
    }
}


function $(selector){
    var res = null;
    return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
} 
// 2. 局部变量validate 赋值给window，让validate变量全局可访问;
window.validate = validate;
}(window)


