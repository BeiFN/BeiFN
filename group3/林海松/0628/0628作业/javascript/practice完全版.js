// ----------------插件基本结构; --------------------
// 1. 把插件放在匿名函数之中,确保插件的各个变量不受其他插件影响;
// var $ = 10;
;+function(window){
    var regList = {
        "email" :{
            reg : /^[0-9a-z]\w{5,19}@[0-9a-z]{2,10}\.(com|cn|net)$/i
        },
        username :{
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/i
        },
        "password" :{
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        }
    };
    function $(selector){
          var res = null;
          return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    } 
    function validate(selector){
        var parent = $(selector);//根据用户传来的信息，获取元素
        var inputList = parent.querySelectorAll("input[v-type]");
        //console.log(inputList);
        for(var i = 0 , input; input = inputList[i++] ;){
            input.addEventListener("blur", validateText.bind(input,input.getAttribute("v-type")));
        }
    }
    //对输入框的值进行正则判断
    function validateText(type){
        if(!regList[type]){
            return false;
        }
        var value = this.value;
        if(regList[type].reg.test(value)){
            tipSapn1(this);
            addValidateState("success",this);
        }
        else{
            //console.log(1);
            tipSapn2(this);
            addValidateState("error",this);
        }
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value,this) : "" ;
    }
    function tipSapn1(ele){
        var span = document.createElement("span");
        span.innerHTML = "正确";
        ele.parentNode.appendChild(span);
        if(ele.parentNode.children[3]){
            ele.parentNode.children[2].remove();
        }
    }
    function tipSapn2(ele){      
        var span = document.createElement("span");
        span.innerHTML = "不正确";
        ele.parentNode.appendChild(span);
        if(ele.parentNode.children[3]){
            ele.parentNode.children[2].remove();
        }
        //  ele.parentNode.children[2].remove();
    }
    //判断输入的数据包含了集中类型，根据类型判断密码强度
    function validateStrength(value , ele){
        var count = 0;
        if(/\d+/.test(value)){
            count++;
        }
        if(/[a-z]+/i.test(value)){
            count++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
            count++;
        }
        //console.log(count);
        switch(count){
            case 0 :
                addStrengthState("low" , ele);
                break;
            case 1 : 
                addStrengthState("low" , ele);
                break;
            case 2 : 
                addStrengthState("middle" , ele);
                break;
            case 3 : 
                addStrengthState("high" , ele);
                break;
            default :
                addStrengthState("low" , ele);
                break;
        }
    }
    //对判断给出反馈
    function addValidateState(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type);
        }
        else{
            ele.className += " "+type;
        }
    }
    //密码强度
    function addStrengthState(level , ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }
        else{
            ele.className += " v-strength-"+level;
        }
    }
    // 2. 局部变量validate 赋值给window，让validate变量全局可访问;
    window.validate = validate;
}(window)
