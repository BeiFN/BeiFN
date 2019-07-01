//将插件放到匿名函数中，确保插件的各个变量不受其他变量的影响
; +function (window) {
    function $(selector) {
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele
    }

    //策略表
    var validateList = {
        "email": {
            reg: /[0-9a-z]\w{5,19}@[0-9a-z]{2,10}\.(com|cn|net)/i
        },
        "username": {
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/i,
            must:true
        },
        "password": {
            reg: /^[\~\!\@\#\$\%\^\&\*\(\)\-\_0-9a-z]{6,20}$/i,
            must:true
        },
    }
    //必填元素列表
    var mustEleList = []

    function validate(selector, addValidate) {
        //首先将用户自定义的加入到策略表中 validateList
        Object.assign(validateList, addValidate);
        var parent = $(selector);
        var eleList = parent.querySelectorAll("input[v-type]")
        for (var i = 0, ele; ele = eleList[i++];) {
            ele.addEventListener("blur", checkText.bind(ele, ele.getAttribute("v-type")))
        }
        for (var i = 0, ele; ele = eleList[i++];) {
            ele.addEventListener("focus", focusNoTip.bind(ele))
        }
        //给必填元素标红
        checkBiaoJi();
        //点击提交事件的触发
        var submitBtn = parent.querySelector("input[v-submit]")
        submitBtn.addEventListener("click",checkMustEle)
    }   

    //验证必填项的内容
    function checkMustEle(){
        for(var i = 0,mustEle;mustEle = mustEleList[i++];){
            if((mustEle.value).trim()==""){
                // console.log(mustEle.value=="");
                mustEle.parentNode.childNodes[3] .placeholder ="该项为必填项,请务必填写"
            }
            // console.log(mustEle)
        }
        //如果都成功了再调用提交的函数
    }


    function focusNoTip() {
        var tipNode = this.parentNode.querySelector(".tip")
        // console.log(tipNode)
        if (tipNode == null) return false;
        tipNode.remove();
    }

    function checkText(type) {
        //     if(!validateList[type]){
        //         return false;
        //   }
        var value = this.value
        //获取到了元素的类型 
        if (validateList[type].reg.test(value)) {
            //匹配正确就成功的参数
            changeStyle("success", this)
            //输入正确时也调用该方法
            focusNoTip.bind(this)
        } else {
            changeStyle("shibai", this)
        }
        //三目运算式完成判断
        type === "password" && this.getAttribute("v-strength") ? checkStrength(value, this) : ""
        this.getAttribute("onlyNum") == "false" ? checkNum(value, this) : ""
    }
    //密码强度判定
    function checkStrength(value, ele) {
        // var value  = ele.value;
        var score = 0;
        if (/\d+/.test(value)) {
            score++
            // console.log(score)
        }
        if (/[a-z]/i.test(value)) {
            score++
            // console.log(score)
        }
        if (/[\~\!\@\#\$\%\^\&\*\(\)\-\_]/.test(value)) {
            score++
            // console.log(score)
        }
        switch (score) {
            // case 0 : changeLevel("low",ele);break;
            case 1: changeLevel("low", ele); break;
            case 2: changeLevel("middle", ele); break;
            case 3: changeLevel("high", ele); break;
        }
    }
    function changeLevel(level, ele) {
        if (/v-strength-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/g, "v-strength-" + level)
        } else {
            ele.className += " v-strength-" + level;
        }
    }
    function changeStyle(type, ele) {
        if (/success|shibai/.test(ele.className)) {
            //如果匹配到里面的内容中有success或者shibai 那么替换
            ele.className = ele.className.replace(/success|shibai/g, type)
        } else {
            ele.className += " " + type
        }
        createTip(type, ele);
    }
    //失败之后创建提示
    function createTip(type, ele) {
        //如果里面tip才创建  如果有 就不创建
        if (ele.parentNode.querySelector(".tip") == null) {
            if (type == "shibai") {
                var spanTip = document.createElement("span")
                spanTip.className = "tip"
                var txt = ele.getAttribute("v-type") + "的格式不正确";
                spanTip.innerHTML = txt;
                ele.parentNode.insertBefore(spanTip, ele.parentNode.childNodes[0])
            }
        }
    }
    function checkNum(value, ele) {
        // console.log(value, ele)
        ///\d/是判断有数字  /^\d$/是纯数字  是纯数字就失败
        if (/^\d+$/.test(value)) {
            changeStyle("shibai", ele)
        }
    }

    //为每一个具有必填项标记的框框加上红星
    function checkBiaoJi (){
        for(var attr  in validateList){
            if(validateList[attr].must){
                //根据具有must的属性名  获取到元素
                var ele = document.querySelector("input[v-type="+attr+"]")
                mustEleList.push(ele)
                addRed(ele)
            }
        }
    }
    function addRed(ele){
        var sp = document.createElement("span");
        sp.innerHTML="*"
        sp.className="hong"
        ele.parentNode.appendChild(sp)
    }
  
    window.validate = validate
}(window)