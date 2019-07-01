; + function (window) { // 放个匿名函数有用么？有用。只把一个接口给了window，其他变量和函数均无法获取或修改。
    var strategyList = { // 这名字什么水平？策略列表。啧啧啧。。。
        "email": {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password": {
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z\_\-]{6,}$/i
        },
        "username": {
            reg: /^[\u4e00-\u9fa5a-z0-9\_\-]{4,20}$/
        }
    }

    function validate(selector, options) {
        options ? Object.assign(strategyList, options) : ""; // 如果传进来一个数组或函数就不太好办了
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        for (var i = 0, input; input = inputList[i++];) {
            input.addEventListener("blur", handlerBlur.bind(input, input.getAttribute("v-type")));
            input.addEventListener("blur", friendlyReminder);
        }
    }

    function $(selector) {
        var res = document.querySelectorAll(selector);
        return res.length === 1 ? res[0] : res;
    }

    function handlerBlur(type) { // 一句三目运算符就能搞定的事也配封装个函数吗？
        if (!strategyList[type]) {
            return false;
        }
        var value = this.value;
        validateText(type, value, this);
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";
        validatePurenumbers(value, this.getAttribute("v-purenumbers") === "true" ? true : false);
    }

    function validateText(type, value, ele) {
        if (strategyList[type].reg.test(value)) {
            addValidateState("success", ele);
        } else {
            addValidateState("error", ele);
        }
    }

    function addValidateState(type, ele) {
        if (/success|error/.test(ele.className)) {
            ele.className = ele.className.replace(/success|error/g, type);
        } else {
            ele.className += " " + type; // 会有小bug：原本没有class值，添加进去第一个是空格，但是照样可以显示出来样式，有时间想办法写个判断语句试试
        }
    }

    function validateStrength(value, ele) {
        var score = 0;
        if (/\d/.test(value)) {
            score++;
        }
        if (/[a-z]/i.test(value)) {
            score++;
        }
        if (/[\!\@\#\$\%\^\&\*\(\)\_\-]/.test(value)) {
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
                break;
        }
    }

    function addStrengthState(level, ele) {
        if (/v-strength-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/, "v-strength-" + level);
        } else {
            ele.className += " v-strength-" + level;
        }
    }

    function validatePurenumbers(value, bool) {
        if (bool ? /^\d+$/.test(value) : !/^\d+$/.test(value)) {
            console.log("success");
        } else {
            console.log("error");
        }
    }

    function friendlyReminder() {
        if (this.parentNode.children[1].nodeName === "INPUT") {
            var _span = document.createElement("span");
            var _br = document.createElement("br");
            if (/success/.test(this.className)) {
                _span.innerHTML = "MISSION SUCCESS";
            } else {
                _span.innerHTML = "MISSION FAILED";
            }
            this.parentNode.insertBefore(_br, this.parentNode.children[0]);
            this.parentNode.insertBefore(_span, this.parentNode.children[0]);
        } else {
            if (/success/.test(this.className)) {
                this.parentNode.children[0].innerHTML = "MISSION SUCCESS";
            } else {
                this.parentNode.children[0].innerHTML = "MISSION FAILED";
            }
        }
    }

    window.validate = validate;
}(window)