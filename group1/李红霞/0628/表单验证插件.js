;+function(window){
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ===1?ele[0]:ele;
}
/**
 * 变量区
 */
var regList = {
    "email":{
        "reg":/^[a-zA-z0-9]{6,18}@(((qq|163|126)\.com)|yeah\.net)$/,
        "tip":null,
    },
    "username":{
        "reg":/^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/,
        "tip":null,
    },
    "password":{
        "reg":/^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/,
        "tip":null,
    },
}

//插件的入口应该是一个函数，用户可以在js中直接执行相应的函数，传入对应的参数
//参数为传入的要执行的表单的区域
function  valaidData(selector, options){
    options ? Object.assign( regList , options) : "";
    //函数的功能为验证表单，首先应该获得要验证的元素，选出表单域中的所有的元素进行遍历筛选
    //对于满足条件的元素进行事件函数的绑定
    var inputList = $(selector);
    for(var i = 0, inputItem; inputItem = inputList[i++];){
        //如果该元素有v-valid属性，getAttribite得到的是该属性值，没有得到的是null
        if(inputItem.getAttribute("v-valid")== "ipt"){
            //循环添加点击事件
            inputItem.addEventListener("blur", handlerValid);
        }
    }
}
//因为不同功能的输入框有不同的验证规则，所以应该将数组添加到一个json对象中，从对象中获取
function handlerValid(evt){
    var e = evt||window.event;
    var target = e.target||e.srcElement;
    //验证输入是否正确
    validText(target);
    //验证密码强度
    validStrength(target);
    //判断是否可以为纯数字
    if(target.getAttribute("pureNumber")?target.getAttribute("pureNumber") == "false":true){
        /^\d+$/.test(target.value)?console.log("error"):"";
    }
}
//验证密码强度
function validStrength(target){
    if(target.getAttribute("v-strength")?target.getAttribute("v-strength") !== "true":false){
        return false;
    }
    var value = target.value;
    var count = 0
    if(/\d/g.test(value)){
        count++;
    }
    if(/[a-z]/g.test(value)){
        count++
    }
    if(/[^0-9a-zA-Z]/g.test(value)){
        count++;
    }
    switch(count){
        case 2:
            addStrengthStyle(target, "middle");
            break;
        case 3:
            addStrengthStyle(target, "high")
        case 0:
        case 1:
        default:
            addStrengthStyle(target, "low");
    }
}
//验证输入是否正确
function validText(target){
    if(target.getAttribute("id") == null){
        return false;
        console.log(1)
    }
    var type = target.getAttribute("id");
    //获取用户输入内容
    var value = target.value;
    //正则表达式
    //当用户的输入正确时，输入框边框颜色变绿，否则变红，利用类进行控制
    if(regList[type].reg.test(value)){
        //利用正则表达式是否已经添加了success属性
        addstyle(target, "success");
        createTipElement("success", target,type);  
    }else{
        addstyle(target, "fail");
        createTipElement("fail", target,type);        
    }
}

function createTipElement(state, target, type){
    if(regList[type].tip == null){
        var sp = document.createElement("span");
        sp.innerHTML = "input ." + state +"!";
        regList[type].tip = sp
        target.parentNode.insertBefore(sp, target.nextSibling);
    }else{
        if(state == "success"){
            regList[type].tip.innerHTML = "input ." + state +"!";
            console.log(regList[type])
        }else{
            regList[type].tip.innerHTML = "input ." + state +"!"
            regList[type].tip.style.display = "inline-block";
        }

    }
}

function addStrengthStyle(target, state){
    if(/low|middle|high/g.test(target.className)){
        // target.className.replace(/success|fail/g, state) //改变变量后赋值给原来的变量
        target.className = target.className.replace(/low|middle|high/g,state);
    }else{
        target.className += " "+state;
    }

}
function addstyle(target, state){
    if(/success|fail/g.test(target.className)){
        // target.className.replace(/success|fail/g, state) //改变变量后赋值给原来的变量
        target.className = target.className.replace(/success|fail/g,state)
    }else{
        target.className += " "+state;
    }

}
//封装插件时应该放在一个立即执行函数中，避免和有函数名或变量名和用户的冲突
//可以传入window对象，将立即执行函数中的入口方法赋值给window对象
window.valaidData = valaidData;
}(window);
//在外部调用插件的入口函数
