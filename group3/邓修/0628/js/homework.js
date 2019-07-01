; +function (window) {
    // 策略列表;
    var strategyList = {
        "email": {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password": {
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        },
        // 可能是定制的;
        "username": {
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
    };
    function $(selector) {
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }
    function validate(selector, options) {
        options ? Object.assign(strategyList, options) : "";
        var form = $(selector);
        var inputList = form.querySelectorAll("input[v-type]");
        for (var i = 0, input; input = inputList[i++];) {
            input.addEventListener("blur", handlerBlur.bind(input, input.getAttribute("v-type")));
        }
    }
    function handlerBlur(type) {
        if (!strategyList[type])
            return false;
        var value = this.value;
        if (value === ""){
            return false;
        }
        validateText(type, value, this);
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";
    }
    //验证字符串是否符合规则
    function validateText(type, value, ele) {
        if (strategyList[type].reg.test(value)) {
            addValidateState("success", ele);
            validatePurenumbers(value, ele, ele.getAttribute("v-purenumbers") === "true" ? true : false);
        }
        else {
            addValidateState("fail", ele);
        }
    }
    //验证状态的添加
    function addValidateState(state, ele) {
        if (/success|fail/.test(ele.className)) {
            ele.className = ele.className.replace(/success|fail/g, state);
        }
        else {
            ele.className += " " + state;
        }
    }
    //验证密码强度
    function validateStrength(value, ele) {
        var score = 0;
        if (/\d/.test(value)) {
            score++;
        }
        if (/[a-z]/i.test(value)) {
            score++;
        }
        if (/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)) {
            score++;
        }
        switch (score) {
            case 0:
                addStrengthState("low", ele);
                break;
            case 1:
                addStrengthState("low", ele);
                break;
            case 2:
                addStrengthState("middle", ele);
                break;
            case 3:
                addStrengthState("high", ele);
                break;
            default:
                addStrengthState("low", ele);
        }
    }
    //密码强度的添加
    function addStrengthState(level,ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className=ele.className.replace(/v-strength-(low|middle|high)/,"v-strength"+level);
        }
        else{
            ele.className+=" v-strength-"+level;
        }
    }
    //是否是允许纯数字
    function validatePurenumbers(value,ele,bool){
        if(bool){
            addValidateState("success",ele);
        }
        else{
            if(/^\d+$/.test(value)){
                addValidateState("fail",ele);
            }
            else{
                addValidateState("success",ele);
            }
        }
    }
    window.validate = validate;
}(window)