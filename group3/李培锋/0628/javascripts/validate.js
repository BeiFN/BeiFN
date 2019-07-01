;!function(window){
    var strategyList = {
        "email" : {
            reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
      },
      "password" : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
      },
      "username" : { 
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
    }
}

//验证原有以用户自定义表单
function validate(selector , options){
    option?Object.assign( strategyList , options):"";
    //找到要验证的表单
    var parent = $(selector);
    //找到要验证的表单子元素,添加事件
    var inputList = parent.querySelectorAll("input[v-type]");
    for(var i = 0,input;input = inputList[i++];){
        input.addEventListener("blur",handlerBlur.bind(input,input.getAttribute("v-type")));   
    }
}
//验证函数(哪个表单子元素)
function handlerBlur(type){
    if(!strategyList[type]){
        return false;
    }
    //文本框取值
    var value = this.value;
    //判断文本框内的值是否符合格式要求
    validateText(type,value,this);
    type === "password"&&this.getAttribute("v-strength")?validateStrength(value,this):"";
    validatePurenumbers(value,this,this.getAttribute("v-purenumbers")==="true"? true:false);
}
//字符串是否符合规则

function validateText(type,value,ele){
    if(strategyList[type].reg.test(value)){
        addValidateState("succees",ele)
    }else{
        addValidateState("error",ele)
    }
}
//为合法或者不合法的字符添加可以反馈的类名
function addValidateState(type,ele){
    if(/success|error/.test(ele.className)){
        ele.className = ele.className.replace(/success|error/g,type);    
    }else{
        ele.className += " "+type
    }
}
//验证密码强度
function validateStrength(value,ele){
    var score = 0;
    if(/\d/.test(value)){
        score++;
    }
    if(/[a-z]i/.test(value)){
        score++;
    }
    if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
        score ++;
    }
    switch(score){
        case 0 : addStrengthState("low",ele);break;
        case 1 : addStrengthState("low",ele);break;
        case 2 : addStrengthState("middle",ele);break;
        case 3 : addStrengthState("high",ele);break;
        default: addStrengthState("low",ele);break;
    }
}
// 密码强度反馈
function addStrengthState(level,ele){
    if(/v-strength-(low|middle|high)/.test(ele.className)){
        ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
}else{
    ele.className += "v-strength-" +level;
}
}
function validatePurenumbers(value , ele , bool){
    if(bool){
          if(/^\d+$/.test(value)){
                console.log("成功")
          }else{
                console.log("失败")
          }
    }else{
          if(/^\d+$/.test(value)){
                console.log("失败")
          }else{
                console.log("成功")
          }
    }
}
function $(selector){
    var res = null;
    return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
} 

window.validate = validate;
}(window)