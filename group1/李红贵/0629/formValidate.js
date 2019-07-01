//插件基本结构
// +function(){
//     console.log(this);
// }();

// +function(){
//     console.log(window);
// }();


//把插件放在匿名函数中，保证确保插件的各个变量不受其他插件影响
;+function(window){
    console.log(arguments);
    //策略定义
    var strategyList = {
        "email" : {reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i },
        "password" : {reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i},
        "usename" : {reg : /^[\u4e00-\u9fa50-9a-z]{4,20}$/},
    }
    var _span = document.createElement("span");
    var _pele = document.createElement("p");
    var buttonput = document.getElementById("btn");

    var isUnValEmail = true;
    var isUnValUser = true;
    var isUnValPass = true;
    var isUnValUrl = true;
    

    var customAttrReg= null;
    // 添加定制属性纯数字判断
    function validate(seletor,options, customReg){
        console.log(customReg);
        if(customReg){
            customAttrReg = customReg;
        }


        buttonput.onclick = function(){
            //方法一，繁琐，每条判断添加标志位
            // if(isUnValEmail){
            //     alert("请填写符合规则邮箱后再提交！");
            //     return false;
            // }
            // if(isUnValUser){
            //     alert("请填写符合规则用户名后再提交！");
            //     return false;
            // }
            // if(isUnValPass){
            //     alert("请填写符合规则密码后再提交！");
            //     return false;
            // }
            // if(isUnValUrl){
            //     alert("请填写符合规则网址链接后再提交！");
            //     return false;
            // }
    
            var parent = $(seletor);
            var inputList = parent.querySelectorAll("input[v-type]");
            console.log(inputList);
    
            for(var i=0,input; input = inputList[i++];){
                console.log(input, input.value);
                if(!input.value){

                    console.log(111);
                    alert("存在输入内容不符合规定，请修改后再提交！");
                    return false;
                }
                if(/error|v-strength-low/.test(input.className)){
                    alert("存在输入内容不符合规定，请修改后再提交！");
                    return false;
                }
            }
    
            alert("提交成功");
    
        }

        // 添加定制验证某条属性 
        options? Object.assign(strategyList,options):"";

        // 1.根据用户输入选择器，选择相应的父级元素
        var parent = $(seletor);
        var inputList = parent.querySelectorAll("input[v-type]");
        console.log(inputList);

        for(var i=0,input; input = inputList[i++];){
            //将属性值传给验证函数
            console.log(input.getAttribute("v-type"));
            input.addEventListener("blur",validateText.bind(input,input.getAttribute("v-type")));

        }
    }

    function removeInfo(){
        _pele.remove();
        _span.remove();
    }
    
        //验证函数
        function validateText(type){
            console.log(type,this);
            //取值
            var value = this.value;
            console.log(value);
            // var reg = 

            // 设计模式  策略模式  提前定制策略
            //s

            if(strategyList[type].reg.test(value)){
            
                // 验证通过
                //下方法只能用一次
                // this.className += "success";
                // if(this.)
                // this.className = this.className.replace(/success | error/g);

                addValidateState("success",this);
                if(type === "email"){
                    isUnValEmail = false;
                }else if(type === "password"){
                    isUnValPass = false;
                }else if(type === "usename"){
                    isUnValUser = false;
                }else if(type === "url"){
                    isUnValUrl = false;
                }
                
                
            // 密码强度验证
            type === "password" && this.getAttribute("v-strength") ? validateStrength(value,this) : "";

            // 自定义纯数字属性判断
            if(customAttrReg){
                console.log(customAttrReg);
                var attr = Object.keys(customAttrReg)[0];
                console.log(attr);
                this.getAttribute(attr) ?
                validatePureNumber(value,this, customAttrReg[attr],this.getAttribute(attr)==="true"? true:false) 
                : "";
            }
            }else{
                  // 验证不通过;
                  // this.className += "error";
                  addValidateState("error",this)
                  if(type === "email"){
                    isUnValEmail = true;
                }else if(type === "password"){
                    isUnValPass =true;
                }else if(type === "usename"){
                    isUnValUser = true;
                }else if(type === "url"){
                    isUnValUrl = true;
                }
                  
            }

        }
    // 验证自定义纯数字属性
    function validatePureNumber(value, ele, reg,bool){
        console.log(value,ele,reg,bool);
        var type1 = "error";
        if(bool === reg.test(value)){
            _span.innerText = "成功";
            type1 = "success"
           ele.parentNode.insertBefore(_span,ele);
        

            //    var warr = ele.parentNode.children();
            isUnValUser = false;
            console.log("成功");
        }else{
            console.log("失败");
            
            _span.innerText = "失败";
            isUnValUser = true;
            ele.parentNode.insertBefore(_span,ele);
        }

        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type1)
            
        }else{
                ele.className += " "+type1;
        }
     

    }


        function validateStrength(value,ele){
            var score = 0;
            if(/\d/.test(value)){
                console.log("shuzi");
                score ++;
            }
            if(/[a-z]/i.test(value)){
                console.log("zimu");

                score ++;
            }
            if(/[\!\@\#\$\%\^\&\*\(\)\-_]/.test(value)){
                console.log("teshuzif");

                score ++;
            }
            console.log(score);
            switch(score){
                case 0:
                    addResValidateStrength("low",ele);
                    isUnValPass = true;
                    break;
                case 1:
                    addResValidateStrength("low",ele);
                    isUnValPass = true;
                    break;
                case 2:
                    addResValidateStrength("middle",ele);
                    isUnValPass = false;
                    break;
                case 3:
                    addResValidateStrength("high",ele);
                    isUnValPass = false;
                    break;
                default:
                    addResValidateStrength("low",ele);
                    isUnValPass = true;
                    break;
            }
        }

        function addResValidateStrength(strengt,ele){
            if(/v-strength-(low|middle|high)/.test(ele.className)){
                ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+strengt);
            }else{
                ele.className += " v-strength-"+strengt;
            }
            _span.innerText = strengt;
            ele.parentNode.insertBefore(_span,ele);
        }

      // 验证状态的添加;
      function addValidateState(type,ele){
          console.log(ele.className);
            if(/success|error/.test(ele.className)){
                  ele.className = ele.className.replace(/success|error/g,type)
                  
            }else{
                  ele.className += " "+type
            }
            _span.innerText = type;
            ele.parentNode.insertBefore(_span,ele);
          console.log(ele.className);

      }
    

    function $(seletor){
        var res = null;
        return (res = document.querySelectorAll(seletor)).length===1? res[0] :res;
    }
    // 局部变量validate赋值给window 让validate全局可访问
    window.validate = validate;
}(window);

//必填项



