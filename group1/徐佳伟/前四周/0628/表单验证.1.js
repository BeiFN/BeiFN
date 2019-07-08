// 需求 : 用户名 =>  中文，英文 ， 数字，- , _ 组成的4~20位字符; 
//        tip : 不能是纯数字;
//        邮箱  =>   正常邮箱;
//        密码  =>  允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上 ,密码强度;

;+function(window){
    var strengthList = {
        "email" : {
            reg : /^[0-9a-z]\w{5,19}@[0-9a-z]{2,10}\.(com|net|cn)$/i
        },
        "username":{
            reg :/^[0-9a-z\u4e00-\u9fa5_\-]{4,20}$/i
        },
        "password":{
            reg :/^[\!\@\#\$\%\^\&\*\(\)0-9a-z]{6,}$/i
        }
    }
    function validate(seletor,options){
        options ? Object.assign(strengthList , options) : "";
        var parent = $(seletor);
        var childList = parent.querySelectorAll("input:not([type = checkbox])");
        for(var i = 0 ,child; child = childList[i++];){
            child.addEventListener("blur",validateText.bind(child,child.getAttribute("id")));
        }
    }
    function validateText(id){
        var value = this.value;
        var bool = this.getAttribute("v-strength")
        if(strengthList[id].reg.test(value)){
            validateType("success",this);
        }else{
            validateType("error",this);
        } 
        id === "password" ? validatePwdStrong(this,value) : "";
        //如果bool为true 那么代表不允许为纯数字
        //bool为false，可以为纯数字就不用再加判断了
        id === "password" && bool ? validateNumber(this,value,bool) : "";
    }
    function validateNumber(ele,value,bool){
        if(bool){
            if(/^\d+$/.test(value)){
                console.log("不允许为纯数字");
            }else{
                console.log("可以是纯数字")
            }
        }
    }
    function validatePwdStrong(ele,value){
        var count = 0 ;
        if(/\d/.test(value)){
            count ++;
        }
        if(/a-z/i.test(value)){
            count ++;
        }
        if(/\!\@\#\$\%\^\&\*\(\)\_\-/.test(value)){
            count ++;
        }
        switch(count){
            case 0:
                validatePwdLevel("low",ele);
                break;
            case 1:
                validatePwdLevel("low",ele);
                break;
            case 2:
                validatePwdLevel("middle",ele);
                break;
            case 3:
                validatePwdLevel("high",ele);
                break;
            default :
                validatePwdLevel("low",ele);
                break;
        }
    }
    function validatePwdLevel(level,ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }
        else{
            ele.className += "v-strength-" +level;
        }
    }
    function validateType(type,ele){
        console.log(ele,type);
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type);
        }else{
            ele.className += " "+type;
        }
    }
    function $(seletor){
        var res = null;
        return (res = document.querySelectorAll(seletor)).length === 1 ? res[0] : res;
    }   
    window.validate = validate;
}(window)