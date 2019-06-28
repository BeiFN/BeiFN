+ function(window) {
    var strategyList = {
        "email": {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password": {
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        },
        "username": {
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
    }

    function validate(selector, option) {
        option ? Object.assign(strategyList, option) : "";
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        for (var i = 0, input; input = inputList[i]; i++) {
            input.addEventListener("blur", handlerBlur.bind(input, input.getAttribute("v-type")));
        }
    }

    function handlerBlur(type) {
        if (!strategyList[type]) return false;
        var value = this.value;
        validateText(type, value, this);

        type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";

        validatePurenumbers(value, this, this.getAttribute("v-purenumbers") ? (this.getAttribute("v-purenumbers") === "true" ? true : false) : "null");
    }

    function validateText(type, value, ele) {
        if (strategyList[type].reg.test(value)) {
            addStrengthState("high", ele);
            ele.nextElementSibling.innerText = "输入正确";
        } else {
            addStrengthState("low", ele);
            ele.nextElementSibling.innerText = "输入错误";
        }
    }

    function validateStrength(value, ele) {
        var score = 0;
        if (/\d/.test(value)) score++;
        if (/[a-z]/i.test(value)) score++;
        if (/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)) score++;

        if (!score || score === 1) addStrengthState("low", ele);
        else if (score === 2) addStrengthState("middle", ele);
        else if (score === 3) addStrengthState("high", ele);

    }

    function addStrengthState(level, ele) {
        if (/v-strength-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/, " v-strength-" + level);
        } else ele.className += " v-strength-" + level;
    }

    function validatePurenumbers(value, ele, bool) {
        console.log(ele.nextElementSibling);
        if (bool === "null") return;
        if (bool ? true : (!/^\d+$/.test(value))) {
            ele.nextElementSibling.innerText = "输入正确";
        } else {
            addStrengthState("low", ele);
            ele.nextElementSibling.innerText = "输入错误";
        }
    }

    function $(selector) {
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    window.validate = validate;
}(window)