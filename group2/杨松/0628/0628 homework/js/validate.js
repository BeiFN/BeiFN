(function(window){
    // 策略列表;
    var strategyList = {
        "email" : {
            reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password" : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,20}$/i
        },
        // 可能是定制的;
        "username" : {
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
    };
    // 给用户一个高级选项;
    function validate(selector , options) {
        options ? Object.assign( strategyList , options) : "";
        // console.log(strategyList , options);
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        // console.log(inputList);
        for(var i = 0 , input ; input = inputList[i++] ; ){
            input.addEventListener("blur",handlerBlur.bind(input,input.getAttribute("v-type")))
        }
    }
    // tip : 耦合关系一定有一个函数进行统一的处理;
    function handlerBlur(type){
        // type === url
        if(!strategyList[type]){
            return false;
        }
        var value = this.value;
        validateText(type ,value,this);

        type === "password" && this.getAttribute("v-strength") ? validateStrength( value , this) : "";

        validatePurenumbers( value , this , this.getAttribute("v-purenumbers")=== "true" ? true : false);
    }
    function validateText(type, value , ele){
        var pass =$("#pass");
        if(strategyList[type].reg.test(value)){
            addValidateState("success",ele);
            ele.nextElementSibling.innerText = "验证通过";
            pass.value = "验证通过";
            pass.style.color ="yellowgreen";
        }else{
            addValidateState("error",ele);
            pass.value = "验证失败";
            pass.style.color ="red";
            ele.nextElementSibling.innerText = "验证失败";
        }
    }
    // 验证状态的添加;
    function addValidateState(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type);
        }else{
            ele.className += " "+type;
        }
    }
    function validateStrength( value , ele){
        var score = 0;
        if(/\d/.test(value)){
            score ++;
        }
        if(/[a-z]/i.test(value)){
            score ++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
            score ++;
        }
        switch(score){
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
        }
    }
    function addStrengthState(level , ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }else{
            ele.className += " v-strength-"+level;
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
    //局部变量validate 赋值给window，让validate变量全局可访问;
    window.validate = validate;
    })(window);


