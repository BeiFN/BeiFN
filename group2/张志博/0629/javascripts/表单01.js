;+function(window){

    var strategyList = {
        "email" : {
            reg : /^[0-9a-z]\w{5,19}@[0-9a-z]{2-10}\.(com|cn|net)$/i
        },
        "password" : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)\.0-9a-z]{6,}$/i
        },
        "username" : {
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
    }

    function validate(selector){
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        console.log(inputList);
        for(var i = 0 , input ; input = inputList[i++] ;){
            input.addEventListener("blur" , validateText.bind(input,input.getAttribute("v-type")))
        }
        
    }
   
    function validateText(type){
        var value = this.value;
        if(strategy[type].reg.test(value)){
            addValidateState("success" , this);
        }else{
            addValidateState("error" , this)
        }
    }


    function addValidateState(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type)
        }else{
            ele.className += " "+type;
        }
    }

    function $(selector){
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] :res;
    }

    window.validate = validate;
}(window)