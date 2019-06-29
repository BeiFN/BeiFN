;+function(window){
    function $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }
    var res = null;
    var strategyList = {
        email : {
            reg : /^[0-9a-z]{5,19}@[0-9a-z]{2,10}\.(com|net|cn)$/i
        },
        password : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        }
    }

    function validate(selector,options){
        var form = $(selector);
        //获取input列表
        var inputList = form.querySelectorAll("input[v-type]");
        for(var i=0,input;input = inputList[i++];){
            //通过v-type属性获取每个input
            input.addEventListener("blur" , handlerValidate.bind(input,input.getAttribute("v-type")));
        }
        //用户可自定义添加相应内容；
        options ? Object.assign(strategyList , options) : "";

        
    }

    //事件处理函数；
    function handlerValidate(type){
        var value = this.value;
        validateText(type,this,value);

        //判断密码强度:检测条件，1、type类型为密码类型；2、password_power属性为true；
        type === "password" && this.getAttribute("password_power")==="true" ? validatePower(type,value,this) : "" ;
    }

    //密码强度判断函数
    function validatePower(type,value , ele){
        // alert(1);
        //密码强度参量
        var scores =0;
        if(/\d/.test(value))
            scores++;
        if(/[a-z]/i.test(value))
            scores++;
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value))
            scores++;
        //首先判断密码格式是否正确；
        if(res==="success"){
            switch(scores){
                case 0:
                    changePowerStyle("low" , ele);
                    errorTips(ele);
                    break;
                case 1:
                    changePowerStyle("low" , ele);
                    errorTips(ele);
                    break;
                case 2:
                    changePowerStyle("middle" , ele);
                    tipsRemove(ele);
                    break;
                case 3:
                    changePowerStyle("high" ,ele);
                    tipsRemove(ele);
                    break;
            }
        }
    }

    //根据密码强度改变相应的样式
    function changePowerStyle(level,ele){
        var str = "level-"+level;
        if(/level-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/level-(low|middle|high)/,level);
        }else{
            ele.className += " level-"+level;
        }
    }

    //内容验证函数
    function validateText(type,ele,value){
        //判断输入是否满足相应的规则；
        if(strategyList[type].reg.test(value)){
            res = "success";
            changeTextStyle(ele , res);
            
            tipsRemove(ele);
        }else{
            res = "error"
            changeTextStyle(ele , res);
            errorTips(ele);
        }
    }

    //验证结果处理
    function changeTextStyle(ele,res){
        //判断classname中是否存在success或error，若存在则替换掉；
        // 若不存在则添加相应属性；
        if(/success|error/.test(ele.className)){
           ele.className = ele.className.replace(/success|error/g , res);
        }else{
            ele.className += " "+res;
        }
    }

    //当输入出现问题时，进行提示说明;
    function errorTips(ele){
        var tips = document.createElement("span");
        tips.setAttribute("class" , "tips");
        var str = "*"+ele.getAttribute("v-type")+"的输入有误，请重新输入!";
        tips.innerHTML = str;
        ele.parentNode.insertBefore(tips , ele);
    }

        // var tips = document.createElement("span");
        // tips.setAttribute("class" , "tips");
        // var str = "*"+ele.getAttribute("v-type")+"的输入有误，请重新输入!";
        // tips.innerHTML = str;
        // ele.parentNode.insertBefore(tips , ele);


    function tipsRemove(ele){
        for(var i=0,rec;rec = ele.parentNode.children[i++];){
            if(/tips/g.test(rec.className)){
                rec.remove();
            }    
        }
    }

    window.validate = validate;
}(window)