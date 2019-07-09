// 需求 : 用户名 =>  中文，英文 ， 数字，- , _ 组成的4~20位字符; 
//        tip : 不能是纯数字;
//        邮箱  =>   正常邮箱;
//        密码  =>  允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上 ,密码强度;
;+function(window){
    var strategyList = {
        "email":{
            reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|net|cn)$/i
        },
        "username":{
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        },
        "password":{
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        }
    }
    // 在明确的 成功|失败 之后; 创建一个元素 span 并且放在当前元素上面;
    function validate(seletor,options){
        options ? Object.assign(strategyList , options) : "";
        var parent = $(seletor);
        var childList = parent.querySelectorAll("input:not([type = checkbox])");
        // console.log(childList);
        for( var i = 0 , input; input = childList[i++];){
            input.addEventListener("blur" , validateText.bind(input , input.getAttribute("id")));
        }
    }
    function validateText(id){
        if(!strategyList[id]){
            return false;
        }
        var value = this.value;
      
        if(strategyList[id].reg.test(value)){
            // this.className = "success";
            validateClassName("success",this);
            vaildatecreateSpan(true,this);
        }else{
            // this.className = "error";
            validateClassName("error",this);
            vaildatecreateSpan(false,this);
        }
        id === "password" ? validatePasswordStrong(this,value) : "";
        validatePasswordNumber(this,value,id === "password" && this.getAttribute("v-strength") === "true" ? true : false);
    }
    function vaildatecreateSpan(flag,ele){
        var span = document.createElement("span");
        if(flag){
            span.className = "successSpan"
        }else{
            span.className = "errorSpan"
        }
        ele.parentNode.insertBefore(span,ele.parentNode.children[0]);
    }
    function validatePasswordStrong(ele,value){
        var count = 0 ;
        if(/\d+/.test(value)){
            count ++;
        }
        if(/a-z/i.test(value)){
            count ++;
        }
        if(/\!\@\#\$\%\^\&\*\(\)\+_\-/.test(value)){
            count ++;
        }
        switch(count){
            case 0:
                    passwordLevel("low",ele);
                    break;
            case 1:
                    passwordLevel("low",ele);
                    break;
            case 2:
                    passwordLevel("middle",ele);
                    break;
            case 3:
                    passwordLevel("high",ele);
                    break;
            default :
                    passwordLevel("low",ele);
                    break;
        }
    }
    
    function passwordLevel(level,ele){
        if(/v-strength-(low|middle|high)/g.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/g,"v-strength-"+level);
        }else{
            ele.className = "v-strength-"+level;
        }
    }
    function validatePasswordNumber(ele,value,bool){
        if(bool){
            console.log("success");
        }else{
            if(/^\d+$/.test(value)){
                console.log("error");
            }else{
                console.log("success");
            }    
        }
    }
    function validateClassName(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type);
        }else{
            ele.className += " "+type;
        }
    }
    function $(seletor){
        var res = null;
        return (res = document.querySelectorAll(seletor)).length === 1 ? res[0] : res ;
    }
    window.validate = validate;
}(window)