//插件的基本结构，为了保证声明的插件变量不与其他变量产生冲突，声明在匿名函数内
(function(window){

    // 策略列表
    var strategyList = {
        "email" : {
            reg:/^[0-9a-z]{6,12}\@[0-9a-z]{2,6}\.(com|cn|net)$/i
        },
        "password" : {
            reg:/^[\!\@\#\$\%\^\&\*\(\)0-9a-z]{6,18}$/i
        },
        // "username" : {
        //     reg:/^[0-9a-z\u4e00-\u9fa5\-\_]{6,15}$/i
        // }
    };

    //声明一个主体函数validate
    function validate(selector,options){
        //判断使用者是否传入自己定义的用户验证 reg
        options ? Object.assign(strategyList,options) : "";
        //获取当前传入的selector
        var parent      = $(selector);
        //获取selector里的子元素input
        var inputList   = parent.querySelectorAll("input[v-type]");
        for(var i=0;i<inputList.length;i++){
            //给每一个inputList[i]添加获得焦点事件，并且获取当前的属性值
            inputList[i].addEventListener("focus",function(){
                console.log(this.getAttribute("v-type"));


        });
        }
        //循环遍历input
        for(var i=0;i<inputList.length;i++){
            //给每一个inputList[i]添加失去焦点事件，并且获取当前的属性值
            inputList[i].addEventListener("blur",validateText.bind(inputList[i],inputList[i].getAttribute("v-type")));
        }      
    }

    // 验证函数
    function validateText(type){
        // 获取当前用户输入的value值
        var value = this.value;
        // if(value === ""){alert("输入内容不能为空,请重新输入");return false}
        //通过策略列表中的哪个属性，获取reg，进行比较
        if(strategyList[type].reg.test(value)){
            //成功 
            addValidate("success",this);
            console.log("正确");
        }else{
            //失败
            addValidate("error",this);
            console.log("失败");
        }
        // 验证密码强度 => 判断密码强度内一个属性v-strength 是否存在
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value,this) : "";
        // 验证是否不能以全数字命名(可以出现在任意位置的属性)
        validateAllNumber( value , this , this.getAttribute("v-allnumber") === "true" ? true : false );
    }

    // 验证是否可以全数字
    function validateAllNumber(value,ele,bool){
        //先判断使用者是否有v-allnumber属性
        if(bool){
            // 如果是纯数字
            addValidate("success",ele);           //true
        }else{
            // 如果不是纯数字
            if(/^\d+$/.test(value)){
                addValidate("error",ele);             //false
            }else{
                addValidate("success",ele);           //true
            }
        }
    }

    // 验证密码强度
    function validateStrength(value,ele){
        var temp = 0;
        if(/\d+/.test(value)){          //如果密码为纯数字 
            temp++;
        }
        if(/[a-z]/.test(value)){        //如果密码有字母  
            temp++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)\-\_]/.test(value)){       //如果密码中有特殊符号
            temp++;
        }
        switch(temp){
            case 0:
                addStrength("low",ele);
                break;
            case 1:
                addStrength("low",ele);
                break;
            case 2:
                addStrength("middle",ele);
                break;
            case 3:
                addStrength("high",ele);
                break;
        }
    }

    // 给密码强度分别添加颜色
    function addStrength(level,ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level)
        }else{
            ele.className += " v-strength-"+level;
        }
    }
    
    //添加验证状态 
    function addValidate(type,ele){
        // 判断当前的className中是否含有success|error
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/,type)
        }else{
            ele.className += " "+type;
        }
    }

    //封装一个$函数
    function $(selector){
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }

   //把匿名函数内部的validate赋值给window，为了能够在外部访问
   window.validate = validate;
})(window);
