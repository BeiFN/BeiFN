(function(window){
    function $(selector){
        var res = null;
    return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }

    function validate(selector){
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        //option ? Object.assgin(regList,option):"";
        for(var i = 0 ,ele ; ele = inputList[i++] ; ){
            ele.addEventListener("blur",handlerBlur.bind(ele,ele.getAttribute("v-type")));
        }
    }

    function handlerBlur(type){
        if(!regList[type]) return false;
        var value = this.value;
        if(regList[type].reg.test(value)){
            addClassName("success",this);
            span.style.backgroundColor = "green";
            span.innerHTML = "符合规则";
            this.parentNode.appendChild(span);
        }else{
            addClassName("error",this);
            this.parentNode.appendChild(span);
        }
        type === "password" && this.getAttribute("v-strength") ? passStrength(value,this) : "";
    }

    function passStrength(value,_this){
        var count = 0;
        if(/\d/.test(value)) count++;
        if(/[a-z]/i.test(value)) count++;
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)) count++;
        switch(count){
            case 0:
                checkPassStrength(_this,"low");
                break;
            case 1:
                checkPassStrength(_this, "low");
                break;
            case 2:
                checkPassStrength( _this, "middle");
                break;
            case 3:
                checkPassStrength( _this, "high");
                break;
            default:
                checkPassStrength(_this, "low");
                break;
        }
    }
    function checkPassStrength(_this,level){
        if(/v-strength-(low|middle|high)/.test(_this.className)){
            _this.className = _this.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }else{
            _this.className += " v-strength-" + level;
        }
    }


    function addClassName(successOrError,_this){
        if(/success|error/.test(_this.className)){
            _this.className = _this.className.replace(/success|error/g,successOrError);
        }else{
            _this.className += " "+successOrError;
        }
    }
    var regList = {
        "email":{
            reg : /^[0-9a-z]\w{5,19}@[0-9a-z]{2,8}\.(com|net|cn)$/i,
        },
        "password":{
            reg :/^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,20}$/i,
        },
        "username":{
            reg : /^[0-9a-z\u4e00-\u9fa5_\-]{4,20}$/i,
        }
    };
    var span = createElement({
        type:"span",
        attr:{
            class:"createspan",
        },
        html:"输入不符合规则",
    });

    window.validate = validate;
})(window);

//在明确的 成功|失败 之后; 创建一个元素 span 并且放在当前元素上面;