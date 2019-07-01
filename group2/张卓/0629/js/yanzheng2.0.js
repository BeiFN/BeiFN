; (function (wind) {
    function $(selector) {
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele
    }
    //策略表
    var strategyList = {
        "email": {
            //email开头不能是下划线，
            reg: /^[0-9a-z]\w{5,17}@[0-9a-z]{2,10}\.(com|cn|net)$/i
        },
        "username": {
            //
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/i
        },
        "password": {
            reg: /^[\~\!\@\#\$\%\^\&\*\(\)\-\_0-9a-z]{6,20}$/i
        }
    }

    function validate(selector) {
        var parent = $(selector)
        // console.log(parent)
        //选择parent中input标签中有v-type属性的
        var eleList = parent.querySelectorAll("input[v-type]")
        for (var i = 0, ele; ele = eleList[i++];) {
            //获取到每一元素之后给每一个元素添加事件  改变this指向 传递参数 
            ele.addEventListener("blur", validateText.bind(ele, ele.getAttribute("v-type")))
        }
    }
    //验证内容  不同的标签验证不同的内容 
    function validateText(type) {
        console.log(type)
        var value = this.value;
        if (strategyList[type].reg.test(value)) {
            //验证成功 改变样式 
            changeStyle("success", this)
        } else {
            //正则验证失败 改成失败样式
            changeStyle("shibai", this)
        }
    }
    //样式改变
    function changeStyle(type, ele) {

        // low版本
        // if (ele.getAttribute("class") == null) {
        //     ele.className = type;
        //     return false;
        // }
        // if (type == "success") {
        //     ele.className = ele.className.replace(/success|shibai/g, type)
        // } else {
        //     ele.className = ele.className.replace(/success|shibai/g, type)
        // }

        //优雅版本
        if(/success|shibai/.test(ele.className)){
            //替换的内容就是通过正则的方式找到并替换
            ele.className = ele.className.replace(/success|shibai/g,type)
        }else{
            ele.className +=" "+type
        }
    }

    wind.validate = validate;
}(window))