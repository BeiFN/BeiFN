; +function (window) {
    /**
     * 
     * @param {*} selector 
     */
    function $(selector) {
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }

    //策略列表
    var strategyList = {
        "email": {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i,
            warns: "请输入正确的邮箱！！",
            // success:""
        },
        "password": {
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i,
            warns: "建议使用数字，字母两种以上的组合的6~20位字符"
        },
    }
    var parent;
    function validate(selector, options) {
        options ? Object.assign(strategyList, options) : "";
        //parent是用户输入的父级元素
        parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        for (var i = 0, input; input = inputList[i++];) {
            input.addEventListener("blur", handlerBlur.bind(input, input.getAttribute("v-type")))
        }
        var btn = $("#btn");
        btn.addEventListener("click", submitData.bind(null, inputList))
    }


    //提交验证
    function submitData(inputList) {
        // console.log(inputList)
        for (var i = 0, ele; ele = inputList[i++];) {
            if (ele.className.split(" ").indexOf("success") === -1) {
                ele.focus();
                return;
            }
        }
        alert("注册成功!!");
    }

    function handlerBlur(type) {
        if (!strategyList[type]) {
            return false
        }
        var value = this.value;
        if (strategyList[type].reg.test(value)) {
            addValidateState("success", this)
        } else {
            addValidateState("error", this)
        }
        warning(type, this, value)
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";

        if (strategyList[type].reg.test(value) && this.getAttribute("v-purenumbers")) {
            validatePurenumbers(value, this, this.getAttribute("v-purenumbers") === "true" ? true : false)
        }
    }

    //验证状态的添加
    function addValidateState(type, ele) {
        if (/success|error/.test(ele.className)) {
            ele.className = ele.className.replace(/success|error/g, type)
        } else {
            ele.className += " " + type;
        }
    }

    //强度验证
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
        warning("password", ele, value, score)
    }
    function addStrengthState(level, ele) {
        if (/v-strength-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/, "v-strength-" + level);
        } else {
            ele.className += " v-strength-" + level
        }
    }

    //判断是否为纯数字
    function validatePurenumbers(value, ele, bool) {
        if (value !== "") {
            if (bool) {
                if (/^\d+$/.test(value)) {
                    addValidateState("success", ele)
                }
            } else {
                if (/^\d+$/.test(value)) {
                    addValidateState("error", ele)
                    createWarningSpan(ele, strategyList[ele.getAttribute("v-type")].noPurenum)
                } else {
                    addValidateState("success", ele)
                }
            }
        }
    }
    //警告
    function warning(type, ele, value, score) {
        if (strategyList[type].reg.test(value)) {
            if (ele.parentNode.children[0].className === "warnT") {
                if (type === "password" && score == 3) {
                    ele.parentNode.children[0].remove();
                }
                if (type != "password") {
                    ele.parentNode.children[0].remove();
                }
            }
            return false;
        }
        createWarningSpan(ele, strategyList[type].warns)
    }

    function createWarningSpan(ele, str) {
        if (!(/warnT/.test(ele.parentNode.children[0].className))) {
            var span = document.createElement("span");
            span.innerHTML = str;
            span.className = "warnT";
            ele.parentNode.insertBefore(span, ele.parentNode.children[0])
        }
    }
    window.validate = validate;
}(window)








