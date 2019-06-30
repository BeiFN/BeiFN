//把重复的封装起来
;+function(window){
    var strategyList = {
        email: {
            reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        password : {
            reg : /[\!\@\#\$\%\^\&\*\(\)\-\+0-9A-Z]/i
        },
        username : {
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/i
        }

    }
        
//遍历form找到合适的input绑定事件
    function validate(selector){
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        // console.log(inputList);
        for(var i = 0,input;input = inputList[i++];){
            input.addEventListener("blur" , handlerBlur.bind(input,input.getAttribute("v-type")));
            // input.addEventListener("blur" , validateInput.bind(input,input.getAttribute("v-strength")));
        
        }       
    }



    //用户名密码失焦事件


    function handlerBlur(type){
        var typeValue = this.value;
        if(!strategyList[type]){
            return false;
        }else{
            validateInput(type,typeValue,this);
        }
        type === "password" && this.getAttribute("v-strength") ?  validateStrength(typeValue,this) : "";
        validatePurenumbers( typeValue , this , this.getAttribute("v-purenumbers")=== "true" ? true : false);
    }


    //验证input是否合法

    function validateInput(type,value,ele){
        // console.log(1);
        
        //这里为甚要这么取？？？？？？？？？？？？？？
        if((strategyList[type]["reg"]).test(value)){
            addEffectClassname("success" , ele);
        }else{
            addEffectClassname("error" , ele);
        }

    }

    //添加input是否合法的效果和类名

    function addEffectClassname(type , ele){
        var name = ele.className;
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/,type);
        }else{
            ele.className +=" " + type;
        }   
    }

    //验证密码强度
    function validateStrength(value , ele){
        var score = 0;
        if(/\d+/.test(value)){
            score ++;
        }
        if(/[a-z]/i.test(value)){
            score ++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)\-\+]/.test(value)){
            score ++;
        }

        console.log(score);
        var i = $("i");
        i.innerHTML = score;

        switch(score){
            case 0 : addStrength("low" , ele);
            break;
            case 1 : addStrength("low" , ele);
            break;
            case 2 : addStrength("middle" , ele);
            break;
            case 3 : addStrength("high" , ele);
            break;
        }
    }

    //密码强度添加效果类名

    function addStrength(level , ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/(low|middle|high)/,level)
        }else{
            ele.className += " v-strength-" + level;
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
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }
    window.validate = validate;
}(window)

validate("#form");