// var obj={ a:1}

// var obj2 ={b:2};

// var obj3 ={c:3};

// obj2.a=3;
// obj2.c=2;
// console.log(Object.assign(obj,obj2,obj3),obj,obj2,obj3);


// 手机号码
// var reg=/^1[3-9]\d{9}$/

// console.log("1",reg.test("15515365219"));
// console.log("2",reg.test("1551536521"));
// console.log("3",reg.test("15515365219i"));
// console.log("4",reg.test("1551536521915515365219"));

// 邮箱

// var regEmial=/^[0-9a-z_]{6,20}\@\.(com|cn|net)$/i;
// var regUserName=/^[\!\@\#\$\%\^\&\(\)a-z0-9\u4e00-\u9fa5]{4,20}$/i;
// var regPassWord=/^$/;



// 验证插件
!! function (window) {
    // strategyTable
    var strategyTable = {
        mail: {
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net|org|edu)$/i,
        },
        pw: {
            reg: /^[\!\@\#\$\%\^\&\*0-9a-z_\-\.]{6,}$/i,
            style: {
                succeed: "pwok",
                erro: "pwno",
            }
        },
        id: {
            reg: /^[a-z0-9_]{4,16}$/i
        },
        name: {
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/i
        },
        num: {
            reg: /^\d+$/ //纯数字
        },
        hasnum: {
            reg: /\d{1,}/ //有数字
        },
        notnum: {
            reg: /\D{1,}/ // 可以有| 也可以没 数字 ，不是纯数字
        },
        nonum: {
            reg: /^\D+$/ //没有数字
        },
        phone: {
            reg: /^1[3-9]\d{9}$/
        },
        A: {
            reg: /[A-Z]{1,}/
        },
        a: {
            reg: /[a-z]{1,}/
        },
        SPECIAL: {
            reg: /[\!\@\#\$\%\^\&\*\(\)_\-\.]{1,}/
        },
        require: {
            reg: /.{1,}/
        }
    }
    var styleTable = {
        erro: "erro",
        succeed: "succeed"
    }
    var fnTable = {
        // 四个参数  isVail验证是否通过 ,etype 验证类型  ,ms 验证消息 ,value 元素的值
        fn: function (etype, isVail, ms, value) {
            fnTable.ms(etype, this, isVail, ms);
            console.log("值：" + value + " ; 验证类型: " + etype + ":状态 ：" + isVail + "; 信息 ：" + ms);
        },
        ms: function (eType, ele, isVail, ms) {
            var i = document.createElement("i");
            var parent = ele.parentNode.children;
            for (const e in parent) {
                if (parent[e].tagName === "I") {
                    parent[e].remove();
                }
            }
            if (!isVail) {
                i.innerText = "* 验证:" + eType + " Tip:" + ms;
                i.style.color = "#ddd";
                ele.parentNode.insertBefore(i, ele.nextSibling);
            }
        },
        require: function (t, isV) {
            fnTable.ms("必填项", this, isV, "!");
            // isV?parent[e]
            // console.log(this.parentNode.children);

            // if( this.parentNode.children)
            // this.parentNode.insertBefore(span, this.nextSibling);
        },
        strength: function (powerVal, detail) {
            console.log("密码强度：" + powerVal, "验证情况：", detail);
        }
    }
    var RES = {}
    /**
     * 功能函数
     * $选择器
     * attr 属性选择器
     * 
     */
    function $(selector) {
        var e = null;
        return (e = document.querySelectorAll(selector)).length === 1 ? e[0] : e;
    }
    Node.prototype.$ = function (selector) {
        var e = null;
        return (e = this.querySelectorAll(selector)).length === 1 ? e[0] : e;
    }
    Node.prototype.attr = function attr(key, val) {
        if (arguments.length > 1) //如果值为2个 则为设置
        {
            return this.setAttribute(key, val);
        } else {
            return this.getAttribute(key);
        } //如果值为1个 则为获取
    }
    Node.prototype.attrs = function (key, val) {
        key ? (key = key) : (key = ".");
        var attrReg = new RegExp(key, "i");
        var attrs = [];
        var isSet = arguments.length <= 1 ? false : true;
        [].slice.call(this.attributes).forEach(element => {
            if (attrReg.test(element.name)) {
                attrs.push(element);
                isSet ? this.attr(element.name, val) : "";
            }
        });
        return attrs;
    }

    Node.prototype.val = function (val) {
        if (!arguments[0]) return this.value;
        this.value = val;
    }
    Node.prototype.classAdd = function (className, notJudge) {
        var hasClassReg = new RegExp(className, "i")
        var isNotJudge = false;
        notJudge ? isNotJudge = notJudge : "";
        if (isNotJudge) {
            this.className += (" " + className);
        } else {
            hasClassReg.test(this.className) ? this.className = this.className.replace(hasClassReg, className) : this.className += (" " + className);
        }
    }
    Node.prototype.classRemove = function (className) {
        var hasClassReg = new RegExp(className, "g")
        hasClassReg.test(this.className) ? this.className = this.className.replace(hasClassReg, "") : "";
    }



    /***
     * 业务功能函数
     */
    function clearStyle(element) {
        for (const key in styleTable) {
            element.classRemove(styleTable[key]);
        }
    }


    function StyleHandler(element, isVail, eType) {
        var hasETypeStyle, hasOk, hasNo;
        hasETypeStyle = strategyTable[eType].style;
        hasETypeStyle ? hasOk = strategyTable[eType].style.succeed : hasOk = null;
        hasETypeStyle ? hasNo = strategyTable[eType].style.erro : hasOk = null;
        if (!(eType && hasETypeStyle && hasOk && hasNo)) {
            clearStyle(element);
            isVail ? element.classAdd("succeed") : element.classAdd("erro");
        } else {}
    }


    function funHandler(eType, element) {
        if (typeof fnTable[eType] === "function") {
            return fnTable[eType].bind(element, eType);
        } else if (typeof fnTable["fn"] === "function") {
            return fnTable["fn"].bind(element, eType);
        } else {
            return function () {}.bind(element, eType);
        };
    }



    /**
     * 业务处理函数
     */


    // 总体业务处理 解析并分配验证 
    function vailDataHandler(vailAttrList) {
        // console.log(vailAttrList);
        //检索元素中标记属性 ，并分步骤处理验证  
        vailAttrList.forEach(eleAttr => {
            var vailType = eleAttr.name; //验证 属性标识
            var vailVal = eleAttr.value; //验证 值标识
            switch (vailType) {
                case "e-type":
                    var vailList = vailVal.split(",");
                    vailList.forEach(eType => {
                        vailHandler.call(this, eType, vailList.length);
                    });
                    break;
                case "e-strength":
                    // vailType = vailType.replace("e-", "");
                    //  isVail验证是否通过 ,etype 验证类型  ,ms 验证消息 ,value 元素的值
                    vailStrengthHandler.call(this, this.val());
                    // fnTable.strength();
                    break;
            }

            // vailElement.addEventListener()
        });
    }

    // 分业务处理  处理验证基础事务
    function vailHandler(eType, count) {
        // 验证是否符合规则
        if (!(strategyTable[eType] && strategyTable[eType].reg && strategyTable[eType].reg instanceof RegExp)) {
            console.error("您定制类型为：" + eType + "的规则有误！或 验证类型:" + eType + "的规则不存在！");
            return false;
        }
        var isVail = 0;
        //funHandler param: isVail,ms,value
        if (strategyTable[eType].reg.test(this.val())) {
            // isVail验证是否通过 ,etype 验证类型  ,ms 验证消息 ,value 元素的值
            // console.log();
            isVail++;
            funHandler(eType, this)(true, "pass", this.val());
            RES[eType] = true;
        } else {
            funHandler(eType, this)(false, "erro", this.val());
            RES[eType] = false;
        }
        StyleHandler(this, isVail === count, eType);
    }

    // 密码强度验证
    function vailStrengthHandler(val) {
        var A = strategyTable.A.reg.test(val);
        var a = strategyTable.a.reg.test(val);
        var number = strategyTable.hasnum.reg.test(val);
        var special = strategyTable.SPECIAL.reg.test(val);
        var power = 0;
        var res = {
            low: a,
            up: A,
            number: number,
            special: special
        }
        for (const re in res) {
            res[re] ? power++ : "";
        }
        funHandler("strength", this)(A && a && number && special, );
        return fnTable.strength.call(this, power, res);
    }




    /**插件入口  ！！！
     * 初始化
     * 1.获取验证表单、元素
     * vailDate Form
     */
    function vailData(selector, vailRegObj) {
        vailRegObj ? Object.assign(strategyTable, vailRegObj) : "";
        var vailForm = $(selector);
        var vailElements = vailForm.$("input[e-type]");
        var evenName = "input";
        // onpropertychange 
        // oninput 
        // blur
        // 完成事件的绑定 ，并检索e-* 属性 识别并分析要验证的元素的所需规则
        for (var i = 0, vailElement; vailElement = vailElements[i++];) {
            var vailAttrList = vailElement.attrs("^e-");
            if (vailAttrList.length > 0) {
                vailElement.addEventListener(evenName, vailDataHandler.bind(vailElement, vailAttrList));
            }
        }
        vailForm.attr("action", "javascript:void(0);");
        return RES;
        console.log("vailData-已加载!");
    }
    //定制化功能
    function vailSetter(setKey, setVal) {
        switch (setKey) {
            case "":
                break;
            case "":
                break;
        }
        console.log("vailSetter -设置");
    }


    window.vailSetter = vailSetter;
    window.vailData = vailData;
}(window);