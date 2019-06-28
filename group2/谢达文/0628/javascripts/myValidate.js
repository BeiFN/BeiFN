;+function(window){
    function $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0]:ele;
    }
    // 验证策略（正则规则列表）
    var strategyList = {
        "email":{
            reg:/^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password":{
            reg:/^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i        
        },
        "username":{
          reg :  /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
    }


    // 选择元素并给它绑定事件
    function validate(selector,options){
        options ? Object.assign(strategyList,options):"";
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        for(var i = 0,input;input = inputList[i++];){
            input.addEventListener("blur",handlerBlur.bind(input,input.getAttribute("v-type")));
        }
    }
    // 辨别事件，通过传入的属性名
    function handlerBlur(type){
        if(!strategyList[type]){
            return false;
        }
        var value = this.value;
        validateText(type,value,this);

        // 判断密码强度
        // 当用户点击密码时候才需要验证密码强度
        // 验证属性应为true才需要验证
        type == "password" && this.getAttribute("v-strength") ? validateStrength(value,this):"";
        validatePurenumbers( value , this , this.getAttribute("v-purenumbers")=== "true" ? true : false);
    }

   function validatePurenumbers(value,ele,bool){
        

         
        bool ? (/^\d+$/.test(value) ? console.log("验证成功"):console.log("失败")):(/^\d+$/.test(value) ? console.log("验证失败"):console.log("成功"));
        //bool ? (/^\d+$/.test(value) ? creat_ele.innerHTML = "验证成功":creat_ele.innerHTML = "验证失败") : (/^\d+$/.test(value) ? creat_ele.innerHTML = "验证失败":creat_ele.innerHTML = "验证成功");
       
        // parent.insertBefore(this,creat_ele);
   }

   

    // 密码加强
    function validateStrength(value,ele){
        var scroe = 0;
        if(/\d/g.test(value)){
            scroe ++; 
        }
         if(/[a-z]/i.test(value)){
            scroe ++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
            scroe ++;
        }
       console.log(scroe);
        switch(scroe){
            case 0:
                
                validateStrengthState("low",ele);
                break;
            case 1:
                   
                validateStrengthState("low",ele);
                break;
            case 2:validateStrengthState("middle",ele);
           
                break;
            case 3:validateStrengthState("high",ele);
           
                break;
            default:
                validateStrengthState("low",ele);
        }
    }

    // 密码强度加属性名改变样式
    function validateStrengthState(level,ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }
        else{
            ele.className += " v-strength-"+level;
        }
    }


    function validateText(type,value,ele){
        if(strategyList[type].reg.test(value)){
            addValidateState("success",ele);
            var creat_ele = document.createElement("span");
            creat_ele.innerHTML = " 验证成功";
            creat_ele.style.backgroundColor = "yellow"
            console.log(ele.parentNode);
            console.log(ele);
           (ele.parentNode.parentNode).insertBefore(creat_ele,ele.parentNode);
           setTimeout(function (){
            creat_ele.style.display = "none";
           },3000);
        }
        else{
            addValidateState("error",ele);
            var creat_ele = document.createElement("span");
            creat_ele.innerHTML = " 验证失败";
            creat_ele.style.backgroundColor = "red";
            (ele.parentNode.parentNode).insertBefore(creat_ele,ele.parentNode);
            setTimeout(function (){
                creat_ele.style.display = "none";
               },3000);
            }

        
    }

    function addValidateState(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type);

        }
        else{
            ele.className +=" "+type;
        }
    }
window.validate = validate;
}(window)