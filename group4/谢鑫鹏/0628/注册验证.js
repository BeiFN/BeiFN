// 需求 : 用户名 =>  中文，英文 ， 数字，- , _ 组成的4~20位字符; 
//        tip : 不能是纯数字;
//        邮箱  =>   正常邮箱;
//        密码  =>  允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上 ,密码强度;

// 1. 把插件放在匿名函数之中,确保插件的各个变量不受其他插件影响;
;+function(window){
    // 2. 局部变量validate 赋值给window，让validate变量全局可访问;
    window.validate = validate;
    // 策略列表
    var strategyList = {
        "email" : {
            reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i,
            title : "标准邮箱格式：12345@qq.com"
        },
        "username" : {
            reg : /^[\u4e00-\u9f5aa-z0-9]{4,20}$/,
            title : "中文，英文 ， 数字，- , _ 组成的4~20位字符"
        },
        "password" : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i,
            title : "允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上"
        },
    }

    /**
     * 选择器
     */
    function $(selector){
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }
    /**
     * 绑定验证函数
     */
    function validate(selector,options){
        // 如果用户自己添加了规则，加入策略列表
        options ? Object.assign(strategyList, options) : "";
        // 1.根据用户输入选择器，选择相应的父级元素
        var parent = $(selector);
        // 2.在父级元素下找到所有的input输入框
        var inputList = parent.querySelectorAll("input[id]");
        for(var i = 0, input; input = inputList[i++]; ){
            input.addEventListener("blur",validateText.bind(input,input.getAttribute("id")));
        }
    }
    /**
     * 具体验证函数
     */
    function validateText(id){
        if(!strategyList[id]){
            return false;
        }
        var value = this.value;
        // 验证格式是否正确
        validateStr(id, value, this);
        // 强度验证
        id === "password" && strategyList[id].reg.test(value) && this.getAttribute("v-strength") ? validateStrength(value ,this) : "";
        // 验证是否是纯数字
        if(strategyList[id].reg.test(value) && this.getAttribute("v-pureNumber")){
            validatePureNumber(value, this, this.getAttribute("v-pureNumber") === "true" ? true : false);
        }
    }
    /**
     * 验证字符串是否符合规则
     */
    function validateStr(id, value, ele){
        if(strategyList[id].reg.test(value)){
            addValidateState("success", ele, id);
        }else{
            addValidateState("error", ele, id);
        }
    }
    /**
     * 提示语
     */
    // function remind(state,ele){
    //     if(ele.parentNode.children[0].className !== "hint"){
    //         var newEle = document.createElement("span");
    //         newEle.className = "hint";
    //         ele.parentNode.insertBefore(newEle,ele.parentNode.children[0]);
    //     }else{
    //         var newEle = ele.parentNode.children[0];
    //     }
    //     if(state === "success"){
    //         newEle.innerHTML = "成功";
    //     }else{
    //         newEle.innerHTML = "输入不符合规则";
    //     }
    // }
    /**
     * 添加验证之后的状态
     */
    function addValidateState(state, ele, id){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g, state);
        }else{
            ele.className += " " + state;
        }
        // 添加提示
        if(ele.parentNode.children[0].className !== "hint"){
            var newEle = document.createElement("span");
            newEle.className = "hint";
            ele.parentNode.insertBefore(newEle,ele.parentNode.children[0]);
        }else{
            var newEle = ele.parentNode.children[0];
        }
        if(state === "success"){
            newEle.innerHTML = "成功";
        }else{
            newEle.innerHTML = strategyList[id].title;
        }
    }
    /**
     * 验证密码强度
     */
    function validateStrength(value,ele){
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
                addValidateState("error", ele, id);
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
    /**
     * 增加强度状态
     */
    function addStrengthState(level, ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-" + level);
        }else{
            ele.className += " v-strength-" + level;
        }
    }
    /**
     * 验证是否为纯数字函数
     */
    function validatePureNumber(value, ele, bool){
        if(bool){
            if(/^\d+$/.test(value)){
                addValidateState("success", ele);
            }else{
                addValidateState("error", ele);
            }
        }else{
            if(/^\d+$/.test(value)){
                addValidateState("error", ele);
            }else{
                addValidateState("success", ele);
            }
        }
    }
}(window)

