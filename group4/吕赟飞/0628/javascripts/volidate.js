// 把插件放在匿名函数中，确保各个变量不会影响其他插件
; + function (window) {

    var tip = $("#tip");

    // 策略列表
    var strategyList = {
        "email": {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password": {
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        }
    }
    // ====================================================
    // 给用户一个高级选项
    function validate(selector, options) {
        options ? Object.assign(strategyList, options) : "";
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        // console.log(inputList)
        for (var i = 0, input; input = inputList[i++];) {
            input.addEventListener("blur", blurHandler.bind(input, input.getAttribute("v-type")));
        }
    }
    // 失去焦点判断
    function blurHandler(type) {
        if (!strategyList[type]) return;
        var value = this.value;
        validateText(type, value, this);

        type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";

        type === "username" && this.getAttribute("v-purenumbers") ? validatePureNum(value, this, this.getAttribute("v-purenumbers") === "true" ? true : false) : "";

        // 在明确的 成功|失败 之后; 创建一个元素 span 并且放在当前元素上面;

    }
    // ====================================================

    // 验证字符串是否符合规则
    function validateText(type, value, ele) {
        if (strategyList[type].reg.test(value)) {
            addValidateState("success", ele);
            if (type === "email") {
                tip.innerHTML = "邮箱正确";
                tip.style.visibility = "visible";
            }
            if (type === "password") {
                tip.innerHTML = "密码正确";
                tip.style.visibility = "visible";
            }
            if (type === "username") {
                tip.innerHTML = "用户名正确";
                tip.style.visibility = "visible";
            }
            // createP("success", ele);
        } else {
            addValidateState("error", ele);
            if (type === "email") {
                tip.innerHTML = "邮箱错误";
                tip.style.visibility = "visible";
            }
            if (type === "password") {
                tip.innerHTML = "密码错误";
                tip.style.visibility = "visible";
            }
            if (type === "username") {
                tip.innerHTML = "用户名错误";
                tip.style.visibility = "visible";
            }
            // createP("error", ele);
        }
    }

    // 判断之后的状态添加
    function addValidateState(type, ele) {
        if (/success|error/.test(ele.className)) {
            ele.className = ele.className.replace(/success|error/g, type);
        } else {
            ele.className += " " + type;
        }
    }

    // 创建提示信息
    // function createP(type, ele) {
    //     var p = document.createElement("p");
    //     if (type == "error") {
    //         p.innerHTML = "格式错误，请重新输入！";
    //     } else if(type == "success") {
    //         p.innerHTML = "格式正确";
    //     }
    //     ele.parentElement.insertBefore(p, ele.parentElement.children[0]);
    //     setTimeout(function(){
    //         p.style.display = "none"
    //     },1000)
    // }
    // ====================================================

    // 密码强度判断
    function validateStrength(value, ele) {
        var score = 0;
        if (/\d/.test(value)) score++;
        if (/[a-z]/i.test(value)) score++;
        if (/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)) score++;

        switch (score) {
            case 1:
                addStrengthState("low", ele);
                tip.innerHTML = "密码强度低！";
                tip.style.visibility = "visible";
                break;
            case 2:
                addStrengthState("middle", ele);
                tip.innerHTML = "密码强度中等";
                tip.style.visibility = "visible";
                break;
            case 3:
                addStrengthState("high", ele);
                tip.innerHTML = "密码强度高！";
                tip.style.visibility = "visible";
                break;
            default:
                addStrengthState("low", ele);
                tip.innerHTML = "密码强度低！";
                tip.style.visibility = "visible";
                break;
        }
    }
    // 密码强度状态的添加
    function addStrengthState(type, ele) {
        if (/v-strength-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/, "v-strength-" + type);
        } else {
            ele.className += " v-strength-" + type;
        }
    }
    // ====================================================

    // 判断是否为纯数字
    function validatePureNum(value, ele, bool) {
        if (value != "") {
            if (bool) {
                if (/^\d+$/.test(value)) {
                    addValidateState("success", ele);
                } else {
                    addValidateState("error", ele);
                    tip.innerHTML = "不能为纯数字";
                    tip.style.visibility = "visible";
                }
            } else {
                if (/^\d+$/.test(value)) {
                    addValidateState("error", ele);
                    tip.innerHTML = "不能为纯数字";
                    tip.style.visibility = "visible";
                } else {
                    addValidateState("success", ele);
                }
            }
        }

    }

    // ====================================================
    function $(selector) {
        var res;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }
    // 局部变量validate赋值给window，让validate变量全局可访问
    window.validate = validate;
}(window)