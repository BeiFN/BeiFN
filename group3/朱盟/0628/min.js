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
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-\.]{6,}$/i,
            style: {

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
        notnum: {
            reg: /\D{1,}/ // 可以有数字 ，不是纯数字
        },
        nonum: {
            reg: /^\D+$/ //没有数字
        },
        phone: {
            reg: /^1[3-9]\d{9}$/
        }

    }
    var styleTable = {
        erro: "erro",
        succeed: "succeed"
    }
    var fnTable = {
        fn: function (element, isVail, ms, etype, value) {
            // console.log("元素：", element);
            console.log("值：" + value + " ; 验证类型: " + etype + ":状态 ：" + isVail + "; 信息 ：" + ms);
        }
    }
    /**
     * 功能函数
     * $选择器
     * attr 属性选择器
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
            // console.log(element.name, element.value);
            if (attrReg.test(element.name)) {
                // console.log(1);
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
        } else {

        }

    }

    function funHandler(eType) {
        if (typeof fnTable[eType] === "function") {
            return fnTable[eType];
        } else if (typeof fnTable["fn"] === "function") {
            return fnTable["fn"];
        } else {
            return function () {}
        };
        // console.log(typeof fnTable.fn);function
    }



    /**
     * 业务处理函数
     */


    // 总体业务处理 解析并分配验证 
    function vailDataHandler(eType) {

        var vailList = eType.split(",");
        vailList.forEach(element => {
            vailHandler.call(this, element, vailList.length);
        });
        // console.log(this,element);
        // console.log(vailList);
        // console.log(eType, "pass", this);
        // console.log(eType, "erro", this);
        // console.log(this.val(), eType, this.className);
        // console.log(this, eType);
    }
    // 分业务处理  处理验证事务
    function vailHandler(eType, count) {
        // 验证是否符合规则
        if (!(strategyTable[eType] && strategyTable[eType].reg && strategyTable[eType].reg instanceof RegExp)) {
            console.error("您定制类型为：" + eType + "的规则有误！或 验证类型:" + eType + "的规则不存在！");
            return false;
        }
        var isVail = 0;
        //funHandler param: element,isVail,ms,etype,value
        if (strategyTable[eType].reg.test(this.val())) {
            funHandler(eType)(this, true, "pass", eType, this.val());
            isVail++;
        }else {
            funHandler(eType)(this, false, "erro", eType, this.val());
        }
        StyleHandler(this, isVail === count, eType);
    }

    // function vailType() {

    // }


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
        for (var i = 0, vailElement; vailElement = vailElements[i++];) {
            vailElement.attrs("^e-").forEach(eleAttr => {
        console.log(eleAttr.name)
                    switch (eleAttr.name) {
                        case "e-type":
                            vailElement.addEventListener(evenName, vailDataHandler.bind(vailElement,eleAttr.value));
                            break;
                        case "e-strength":
                                vailElement.addEventListener(evenName, vailDataHandler.bind(vailElement,eleAttr.value));
                        break;


                    }

                // vailElement.addEventListener()
            });
        }

        // console.log(vailForm.attrs("^e-", "2"));
        // console.log(vailElement,vailElement.attr());
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