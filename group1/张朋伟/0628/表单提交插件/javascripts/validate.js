; + function (window) {
    var strategyList = {
        "email": {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "username": {
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
        // "password": {
        //     reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        // },
    }


    function validate(selector, option) {
        //自定义高级选项
        option ? Object.assign(strategyList, option) : "";
        // console.log("插件开始执行")
        var parent = $(selector);
        console.log(parent);
        var inputList = parent.querySelectorAll("input[v-type]");
        // console.log(inputList);
        for (var i = 0, input; input = inputList[i++];) {
            input.addEventListener("blur", validateText.bind(input, input.getAttribute("v-type")))
        }


    }

    function validateText(type) {
        var value = this.value;
        if (strategyList[type].reg.test(value)) {
            addValidateState("success", this);
            // return true;


        } else {
            addValidateState("error", this);
            // return true;
        }

        // console.log(1111111111);
        //验证密码强度
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";
        // console.log(222222222);

        //验证纯数字
        validatePureNumber(value, this, this.getAttribute("pureNumber"))

        console.log(this.parentNode);
        var a = document.createElement("span");
        console.log(a);

        a.innerHTML = "验证成功";
        //  a = "<i>"+"验证成功"+"</i>";
        if (!!a) {
            a.remove();
        }
        this.parentNode.appendChild(a);
        // this.parentNode.insertBefore(a,this);


    }

    function validatePureNumber(value, ele, bool) {
        if (bool) {
            if (/\d+/.test(value)) {
                console.log("success")
            } else {
                console.log("error")

            }

        } else {
            if (/\d+/.test(value)) {
                console.log("error")
            } else {
                console.log("success")

            }

        }
    }

    function validateStrength(value, ele) {
        var score = 0;
        if (/\d+/.test(value)) {
            score++;
        }
        if (/[a-z]/i.test(value)) {
            score++;
        }
        if (/[!\@\#\$\%\&\*\(\)]/.test(value)) {
            score++;
        }
        // console.log(score);
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

    function addStrengthState(level, ele) {
        if (/v-strength-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/, " v-strength-" + level);
        } else {
            ele.className += " v-strength-" + level
        }

    }

    function addValidateState(login_status, ele) {
        if (/success|error/.test(ele.className)) {
            ele.className = ele.className.replace(/success|error/g, login_status)
            console.log(ele.className)
        } else {
            ele.className += " " + login_status;
        }

    }

    function $(selector) {
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }
    window.validate = validate;

}(window)