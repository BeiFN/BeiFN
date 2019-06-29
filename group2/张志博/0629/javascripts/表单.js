;+(function(window){
    
    var strategyList = {
        "username" : {
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{6,20}$/i
        },
        "password" :{
            reg : /^[\!\@\#\$\%\^\&\*\(\)\.0-9a-z]{6,}$/i
        },
        "email" : {
            reg : /[0-9a-z]\w{5,20}@[0-9a-z]{2,10}\.(com|cn|net)/
        }
    }

    function validate(selector , options){
        options ? Object.assign(strategyList , options) : "";
        var parent = $(selector);
        console.log(strategyList , options)
        var inputList = parent.querySelectorAll("input[v-type]");
        console.log(inputList);
        
        for(var i=0 , input;input=inputList[i++];){
            input.addEventListener("blur" , validateText.bind(input,input.getAttribute("v-type")))
        } 
    }

    //type值？this指向；
    function validateText(type){
        if(!strategyList[type]){
            return false;
        }

        var value = this.value;
        
        if(strategyList[type].reg.test(value)){
            addValidateState("success" , this);
        }else{
            addValidateState("error" , this);
        }
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value,this) : "";
    }

    function validateStrength(value , ele){
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
            // v-strength-low
            // v-strength-middle
            // v-strength-high
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

    

    function addValidateState(type , ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type)

        }else{
            ele.className += " "+type;
        }
    }

    function addStrengthState(level , ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
      }else{
            ele.className += " v-strength-"+level
      }
}

    function $(selector){
        var res = null;
        return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
  } 
  window.validate = validate;
})(window)