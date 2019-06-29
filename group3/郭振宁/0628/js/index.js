/*
*
*
*
*
*/
+function(window) {
    var rules = {
        username : {
            reg : /^[\u4e00-\u9fa5a0-9a-z_\-]{4,20}$/
        },
        emailadress : {
            reg : /^[0-9a-z]\w{5,19}@[0-9a-z]{2,10}\.(com|cn|net)$/i
        },
        pass : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        }
    }

    function $(selector) {
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    function verify(selector , options) {
        options ? Object.assign(rules , options) : "";
        var parent = $(selector);
        var iptlist = parent.querySelectorAll("input");
        // console.log(iptlist);

        for(var i=0, ipt; ipt = iptlist[i++]; ) {
            ipt.addEventListener("blur" , judge.bind(ipt , ipt.getAttribute("v-type")));
        }
    }

    function judge(type) {
        if(!rules[type]) return false;
        var value = this.value;
        
        //判断用哪种方式判断
        validateText(type , value , this);
        //判断是不是密码输入框，存不存在strength属性
        type === "pass" && this.getAttribute("v-strength") ? validateStrength(value , this) : "";
        //输入框是否允许输入纯数字
        validatePurenumber(value , this , this.getAttribute("purenumber") === "true" ? true : false);
    }
    //是否允许是纯数字
    function validatePurenumber(value , ele , bool) {
        if(bool) {
            if(/^\d+$/.test(value)) {
                console.log("成功");
            }else {
                console.log("失败");
            }
        }else {
            if(/^\d+$/.test(value)) {
                console.log("不能为纯数字");
            }else {
                console.log("成功");
            }
        }
    }
    //密码强度
    function validateStrength(value , ele) {
        var score = 0;
        if(/\d/.test(value)) {
            score++;
        }
        if(/[a-z]/.test(value)){
            score++;
        }
        if(/[\!\@\#\$\%\^_\-]/.test(value)) {
            score++;
        }
        switch(score) {
            case 0 : passwordstrength(ele , "low");break;
            case 1 : passwordstrength(ele , "low");break;
            case 2 : passwordstrength(ele , "middle");break;
            case 3 : passwordstrength(ele , "high");break;
        }
    }

    //根据密码强度变换input背景颜色
    function passwordstrength(ele , type) {
        if(/v-strength-(low|middle|high)/.test(ele.className)) {
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/ , "v-strength-" + type);
        }else {
            ele.className += " v-strength-" + type;
        }
    }

    function validateText(type , value , ele) {
        if(rules[type].reg.test(value)) {
            changeClass("success" , ele);
        }else {
            changeClass("error" , ele);
        }
    }

    function changeClass(type , ele) {
        if(/success|error/.test(ele.className)) {
            // console.log(type);
            ele.className = ele.className.replace(/success|error/ , type);
        }else {
            ele.className += " " + type;
        }
    }
    window.verify = verify;
}(window);