; + function (window) {
    var parentForm = document.getElementById("form");
    // 起始正则列表
    var regList = {
        "email": {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "username": {
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        },
        "password": {
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        },
    }
    var newSpan = null;



    // 函数起始点
    function formValidate(option) {
        var iptList = parentForm.querySelectorAll("input[v-type]");
        // 判断是否有用户自己输入的正则，如果有，添加进去或者覆盖原来的
        if (option) {
            for (var attr in option) {
                regList[attr] = option[attr];
            }
            console.log(regList);
        }

        // 给每个input添加一个事件并让每个input的this指向指向自己，并把每个input的v-type里的属性值以参数的形式传递给下个函数
        for (var i = 0, ipt; ipt = iptList[i++];) {
            ipt.addEventListener("blur", inputValidate.bind(ipt, ipt.getAttribute("v-type")))
        }
    }

    // 对每个ipnut执行函数，type为v-type的属性值，因为要拿该属性值和reg列表进行比对，所以需要
    function inputValidate(type) {
        // 判断当前input输入框的reg是否存在
        if (!regList[type]) {
            return false;
        }
        // 用value记录每个输入框的值
        var value = this.value;
        // 调用匹配函数，并把this指向，value值和type值传递
        regTest(this, value, type);


        // 如果用户对密码强度有需求，进入密码强度验证函数
        if (type === "password" && (this.getAttribute("strength") === "true")) {
            passwordStrength(this, value);
        }


        // 如果用户对是否是纯数字有需求，进入纯数字验证函数
        if (this.getAttribute("purenumber") === "false") {
            purenumValidate(this, value);
        }
    }


    // 匹配函数，
    function regTest(ele, value, type) {
        // 如果reg规则和输入的值匹配，则调用给当前input设置class函数，并且传递一个成功或者失败的标志
        if (regList[type].reg.test(value)) {
            changeState("success", ele);
        } else {
            changeState("error", ele);
        }
    }

    // 密码强度验证函数
    function passwordStrength(ele, value) {
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

        // 根据score的值，调用给密码强度设置class函数
        switch (score) {
            case 0:
                pwdStrengthClass(ele, "low", 0);
                break;
            case 1:
                pwdStrengthClass(ele, "low", 1);
                break;
            case 2:
                pwdStrengthClass(ele, "middle", 2);
                break;
            case 3:
                pwdStrengthClass(ele, "high", 3);
                break;
            default:
                pwdStrengthClass(ele, "low", 0);
                break;
        }
    }



    // 是否为纯数字函数，如果是则传递一个error的标志，调用给input设置class的函数
    function purenumValidate(ele, value) {
        if (/^[0-9]{6,}$/.test(value)) {
            changeState("error", ele)
        }
    }


    // 根据密码强度设置class
    function pwdStrengthClass(ele, flag, res) {
        if (/v\-strength\-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v\-strength\-(low|middle|high)/, "v-strength-" + flag);
        } else {
            ele.className += " " + "v-strength-" + flag;
        }

        // 如果完全失败，调用失败提示函数
        if (res === 0) {
            errTip(ele);
        } 
        // 如果成功，调用成功提示函数
        else {
            successTip(ele);
        }
    }


    // 给input设置class的函数
    function changeState(flag, ele) {
        if (/success|error/.test(ele.className)) {
            ele.className = ele.className.replace(/success|error/g, flag);
        } else {
            ele.className += "" + flag;
        }


        // 如果className里有标志位error，调用失败提示函数
        if (/error/.test(ele.className)) {
            errTip(ele);
        }
        // 如果className里有标志位success，调用成功提示函数
        if (/success/.test(ele.className)) {
            successTip(ele);
        }
    }


    // 失败提示函数
    function errTip(ele) {
        newSpan?newSpan.remove():"";
        newSpan = document.createElement("span");
        newSpan.innerHTML = "输入格式错误,请重新输入！";
        ele.parentNode.appendChild(newSpan);
    }
    // 成功提示函数
    function successTip(ele) {
        newSpan ?newSpan.remove():"";
        newSpan  = document.createElement("span");
        newSpan.innerHTML = "恭喜！输入成功";
        ele.parentNode.appendChild(newSpan);
    }



    window.formValidate = formValidate;
}(window)