 ;+function( window ){
    var strategyList = {
        "email" : {
              reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password" : {
              reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        },
        // 可能是定制的;
        "username" : { 
              reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
  }

    //开始添加高级功能
    function validate(selector,options){
        // console.log("插件执行");
        // console.log($);
        options ? Object.assign(strategyList , options) : "";
        var parent = $(selector);
        var childList = parent.querySelectorAll("input:not([type = checkbox])");
        // console.log(childList);

        for(var i = 0 , input; input = childList[i++];){
            input.addEventListener("blur" , validateText.bind(input , input.getAttribute("id")));
        }
    }

    //正常版本
    // function validate(selector){
    //     // console.log("插件执行");
    //     // console.log($);
    //     var parent = $(selector);
    //     var childList = parent.querySelectorAll("input:not([type = checkbox])");
    //     // console.log(childList);

    //     for(var i = 0 , input; input = childList[i++];){
    //         input.addEventListener("blur" , validateText.bind(input , input.getAttribute("id")));
    //     }
    // }
    function validateText(id){
        if(!strategyList[id]){
            return false;
        }

        var value = this.value;

        if(strategyList[id].reg.test(value)){          
            addValidateState("success",this);
        }else{
            addValidateState("error",this);
        }

        id === "password" && this.getAttribute("v-strength") ? validateStrength(value,this) : "";
        //是否允许全数字
        validatePurenumbers(value , this , this.getAttribute("v-strength") === "true" ? true : false);

    }
    function validatePurenumbers(value ,ele, bool){
        //如果bool为true 那么没有判断的必要
        //如果bool为false 在进行下一步判断

        if(!bool){     
            ele.style.borderColor = "yellowgreen";  
            if(/^\d+$/.test(value)){
                console.log("error");
                ele.style.borderColor = "red";
            }
            // else{
            //     console.log("success");
            // }

        }
    }
    function validateStrength(value ,ele){
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
            case 0 :
                    addStrengthState("low",ele);
                break;
            case 1 :
                    addStrengthState("low",ele);
                break;
            case 2 :
                    addStrengthState("middle",ele);
                break;
            case 3 :
                    addStrengthState("high",ele);
                break;
            default:
                    addStrengthState("low",ele);
                break;
        }
    }
    function addStrengthState(level,ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }else{
            ele.className += "v-strength-"+level;
        }
    }

    function addValidateState(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g , type);
        }
        else{
            ele.className += " "+type;
        }
    }

    function $(selector){
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
    }
    window.validate = validate ;
}(window)